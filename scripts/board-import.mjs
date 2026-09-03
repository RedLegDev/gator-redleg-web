#!/usr/bin/env node
/**
 * Import Basecamp project 30371149 into gator-board D1.
 *
 * Usage:
 *   node scripts/board-import.mjs --export   # fetch JSON via basecamp CLI
 *   node scripts/board-import.mjs --dry-run  # print SQL stats
 *   node scripts/board-import.mjs --commit     # apply via wrangler d1 execute
 *
 * Requires: basecamp CLI, wrangler, jq-friendly JSON in scripts/basecamp-export/
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = "30371149";
const EXPORT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "basecamp-export"
);

const LIST_MAP = {
  9795689964: "list_stbarb_2026",
  5579801298: "list_inbox",
  8975809082: "list_inbox",
  8975560377: "list_exec",
  8635786338: "list_exec",
  6836297995: "list_treasurer",
  8463806317: "list_website",
  6855078450: "list_inbox",
  7530266918: "list_inbox",
  5749436725: "list_inbox",
  5579855004: "list_inbox",
  5579854727: "list_inbox",
};

function run(cmd) {
  return execSync(cmd, { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
}

function sqlEscape(s) {
  return String(s ?? "").replace(/'/g, "''");
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    export: args.includes("--export"),
    dryRun: args.includes("--dry-run"),
    commit: args.includes("--commit"),
    remote: args.includes("--remote"),
  };
}

function exportBasecamp() {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
  run(
    `basecamp messages list --in ${PROJECT} --all --json > "${path.join(EXPORT_DIR, "messages.json")}"`
  );
  run(
    `basecamp todolists list --in ${PROJECT} --json > "${path.join(EXPORT_DIR, "todolists.json")}"`
  );
  for (const listId of Object.keys(LIST_MAP)) {
    run(
      `basecamp todos list --list ${listId} --in ${PROJECT} --all --json > "${path.join(EXPORT_DIR, `todos-${listId}.json`)}"`
    );
  }
  console.log(`Exported to ${EXPORT_DIR}`);
}

function loadJson(file) {
  const raw = fs.readFileSync(path.join(EXPORT_DIR, file), "utf8");
  const parsed = JSON.parse(raw);
  return parsed.data ?? parsed;
}

function buildImportSql() {
  const statements = [];
  const memberIds = new Map();

  function memberIdFor(email, name) {
    const key = (email || name || "unknown").toLowerCase();
    if (!memberIds.has(key)) {
      const id = `import_${memberIds.size + 1}`;
      memberIds.set(key, id);
      const safeEmail = email || `${id}@import.local`;
      statements.push(
        `INSERT OR IGNORE INTO members (id, email, name, role, created_at) VALUES ('${id}', '${sqlEscape(safeEmail)}', '${sqlEscape(name || "Unknown")}', 'member', strftime('%s','now'));`
      );
    }
    return memberIds.get(key);
  }

  const messages = loadJson("messages.json");
  for (const m of messages) {
    const authorId = memberIdFor(
      m.creator?.email_address,
      m.creator?.name
    );
    const created = Math.floor(new Date(m.created_at).getTime() / 1000);
    const updated = Math.floor(new Date(m.updated_at).getTime() / 1000);
    statements.push(
      `INSERT OR IGNORE INTO messages (id, subject, body_md, author_id, pinned, status, created_at, updated_at) VALUES ('bc_msg_${m.id}', '${sqlEscape(m.subject)}', '${sqlEscape(stripHtml(m.content || ""))}', '${authorId}', 0, 'active', ${created}, ${updated});`
    );
    try {
      const comments = JSON.parse(
        run(`basecamp comments list ${m.id} --in ${PROJECT} --json`)
      ).data;
      for (const c of comments ?? []) {
        const cid = memberIdFor(c.creator?.email_address, c.creator?.name);
        const cAt = Math.floor(new Date(c.created_at).getTime() / 1000);
        statements.push(
          `INSERT OR IGNORE INTO comments (id, parent_type, parent_id, author_id, body_md, created_at, updated_at) VALUES ('bc_cmt_${c.id}', 'message', 'bc_msg_${m.id}', '${cid}', '${sqlEscape(stripHtml(c.content || ""))}', ${cAt}, ${cAt});`
        );
      }
    } catch {
      // comments optional per message
    }
  }

  for (const [bcListId, listId] of Object.entries(LIST_MAP)) {
    const file = `todos-${bcListId}.json`;
    if (!fs.existsSync(path.join(EXPORT_DIR, file))) continue;
    const todos = loadJson(file);
    for (const t of todos) {
      const assignee = t.assignees?.[0];
      const assigneeId = assignee
        ? memberIdFor(assignee.email_address, assignee.name)
        : null;
      const created = Math.floor(new Date(t.created_at).getTime() / 1000);
      const updated = Math.floor(new Date(t.updated_at).getTime() / 1000);
      const completed = t.completed
        ? Math.floor(new Date(t.updated_at).getTime() / 1000)
        : null;
      statements.push(
        `INSERT OR IGNORE INTO tasks (id, list_id, title, description_md, assignee_id, due_date, completed_at, completed_by, position, created_at, updated_at) VALUES ('bc_todo_${t.id}', '${listId}', '${sqlEscape(t.title)}', '${sqlEscape(stripHtml(t.description || ""))}', ${assigneeId ? `'${assigneeId}'` : "NULL"}, ${t.due_on ? `'${t.due_on}'` : "NULL"}, ${completed ?? "NULL"}, NULL, ${t.position ?? 0}, ${created}, ${updated});`
      );
    }
  }

  return statements;
}

function stripHtml(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

const { export: doExport, dryRun, commit, remote } = parseArgs();

if (doExport) exportBasecamp();

if (!fs.existsSync(EXPORT_DIR)) {
  console.error("No export dir. Run with --export first.");
  process.exit(1);
}

const sql = buildImportSql();
console.log(`Generated ${sql.length} SQL statements`);

const outFile = path.join(EXPORT_DIR, "import.sql");
fs.writeFileSync(outFile, sql.join("\n"));

if (dryRun) {
  console.log(`Wrote ${outFile}`);
  process.exit(0);
}

if (commit) {
  const flag = remote ? "--remote" : "--local";
  run(`npx wrangler d1 execute gator-board ${flag} --file="${outFile}"`);
  console.log(`Applied import (${flag})`);
} else {
  console.log("Use --commit (--remote for production) to apply.");
}
