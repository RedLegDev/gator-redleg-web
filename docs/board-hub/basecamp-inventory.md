# Basecamp Inventory — Gator Redleg Chapter USFAA

**Project:** `30371149`  
**Account:** `4905232`  
**Audited:** 2026-09-03  
**Plan ID:** BH-01

## Executive summary

Basecamp is used primarily as a **message board** (long-running coordination threads) and **to-do lists** (event and housekeeping work). Chat is light; schedule and docs are stale or supplementary. MVP board hub scope (**messages + tasks**) covers the active workflow. Chat, schedule, vault, and automated notification chat can be deferred or replaced by simpler mechanisms.

| Tool | Volume | MVP replace? | Notes |
|------|--------|--------------|-------|
| Message Board | ~164 active messages | **Yes** | Primary board coordination (sponsor threads, meeting FYIs) |
| To-dos | 12 lists, ~130 open items | **Yes** | `St. Barbara's 2026` dominates (100 open) |
| Chat (main) | ~25 recent lines | **No** | Informal; comments on messages suffice |
| Chat (Automated Notifications) | ~25 recent lines | **Partial** | Inbound email mirror; replace via #12 + #31 + #36 |
| Schedule | 45 entries | **No** | Mostly 2023; chapter meetings live on site `/zoom` |
| Docs & Files | 20 items (11 folders) | **No** | Migrate critical docs manually; budget doc has web counterpart |
| Incoming Email | Enabled in dock | **Yes (post-#12)** | Form CC + external mail; see #31 |

---

## Enabled dock tools

| Tool | ID | Position | Status |
|------|-----|----------|--------|
| Chat | `5579798165` | 1 | Active — low volume |
| Automated Notifications | `8055468032` | 2 | Active — email-to-chat bot |
| Message Board | `5579798156` | 3 | **Primary** |
| To-dos | `5579798160` | 4 | **Primary** |
| Docs & Files | `5579798162` | 5 | Reference archive |
| Schedule | `5579798168` | 7 | Stale |
| Incoming Email | `5579798171` | 8 | Forwards into project |

---

## Message board

- **~164** active messages (recordings API, paginated cap 100 per page — full export needed at migration time)
- **~100+** comments across project (recordings API sample)
- Recent threads (Sep 2026):
  - *TI Defense — $500 sponsorship* — fulfillment checklist linked to todo list
  - *Sponsor Outreach Coordination* — long-running comment thread for St. Barbara's
  - *Chapter Meeting* reminders with link to `gatorredleg.org/zoom`

### Migration priority: **Must migrate**

Preserve subject, body, author, timestamps, and comment threads. Pinned messages should map to `pinned` flag in board hub.

---

## To-do lists

| List | ID | Completion | Open (approx.) | Migration |
|------|-----|------------|------------------|-----------|
| St. Barbara's 2026 | `9795689964` | 26/138 | **100** | **Must migrate** |
| Inbox / Housekeeping | `5579801298` | 212/225 | 13 | **Must migrate** |
| Regimental Honors | `8975809082` | 0/1 | 1 | Migrate |
| Bullard Award | `8975560377` | 6/9 | 3 | Migrate |
| Executive Board and Members-at-Large | `8635786338` | 4/8 | 4 | Migrate |
| Treasurer | `6836297995` | 8/8 | 0 | Archive (complete) |
| GatorRedleg.org | `8463806317` | 46/49 | 3 | Migrate or close |
| Golf Tournament | `6855078450` | 0/1 | 1 | Low priority |
| Softball Tournament | `7530266918` | 0/0 | 0 | Empty — skip |
| Merchandising / SWAG | `5749436725` | 6/6 | 0 | Archive (complete) |
| 501(c)(3) Related | `5579855004` | 7/12 | 5 | Migrate |
| Fundraising | `5579854727` | 0/0 | 0 | Empty — skip |

**Proposed board hub list mapping:** 1:1 — use same list names on import.

---

## Chat

### Main chat (`5579798165`)

- ~25 recent lines
- Mix of text and image uploads (e.g. Ashleigh sharing PNGs)
- **Defer in v1** — message board comments + attachments cover the use case

### Automated Notifications (`8055468032`)

- Posts by **Andy** bot mirroring inbound email to chapter addresses
- Sample content: Tax990, QGiv/Bloomerang, PayPal marketing — mostly noise
- **Replace with:** SaaSMail webhook → board message for actionable mail; filter or drop marketing (#36 BH-23 for store webhooks)

---

## Schedule

- 45 entries; samples dated **2023** (chapter meetings, golf, softball, regimental birthday)
- Site already publishes meeting cadence and `/zoom`
- **Defer** — do not migrate

---

## Docs & Files

- 20 top-level items (11 folders, 4 uploads, 5 documents)
- Notable: St. Barbara's **Working Budget Doc** — live counterpart in vault + was synced to Basecamp doc `10152390560`
- **Defer bulk migration** — export archive at cutover (#32); link out from board messages where needed

---

## Incoming email & form integration

### Basecamp incoming email

Dock tool enabled; external mail to chapter addresses can land in Basecamp.

### Site form CC (today)

`src/lib/email.ts`:

```ts
export const BOARD_CC = "save-CaacJzMWhKMV@app.basecamp.com";
```

Used by:

- `src/app/api/contact/route.ts`
- `src/app/api/support-request/route.ts`

Forms send to `president@gatorredleg.org` with Basecamp CC. **Remove CC at cutover** (#31, #32); route to `board@gatorredleg.org` after #12.

---

## People

- **41** project members (includes alumni, bots, family members)
- **~10 active board** (Executive Committee + Members at Large per chapter records)

### Board allowlist (names — emails TBD by president)

| Role | Name |
|------|------|
| President | CPT Matt Wagner |
| Vice President | LTC Antonio Hyman |
| Treasurer | SFC Julio Veguilla-Garcia |
| Secretary | Ashleigh McKean |
| Member at Large | SGM Ryan Rock |
| Member at Large | CSM(R) Jason Evarts |
| Member at Large | CSM Robert Eads |
| Member at Large | SSG Ryan Blume |
| Member at Large | CSM(R) Casey Ducharme |

**Action required (Matt):** Provide preferred login email per board member (personal vs `.mil`) for `BOARD_ALLOWLIST` secret.

Non-board project members (41 total) do not need board hub access unless explicitly added.

---

## Operational rules (from chapter Lessons)

1. **Message board posts notify the whole project** — consider draft→publish workflow (#34 BH-21)
2. **Comments are board-visible** — write as staff notes, not private asides
3. **Never post Message Board items without president OK** — approval workflow is post-MVP but culturally important
4. **Do not trash mistaken messages** — board gets dead notifications

---

## Migration priority matrix

| Priority | Content | Action |
|----------|---------|--------|
| P0 | Message board + comments | Import script #29 |
| P0 | Open todos in St. Barbara's 2026 + Inbox/Housekeeping | Import script #29 |
| P1 | Other lists with open items | Import script #29 |
| P1 | Form CC → board intake | #12 + #31 |
| P2 | Completed lists | Import as archived or skip |
| P2 | Vault docs | Export zip at cutover; manual links |
| P3 | Schedule | Skip |
| P3 | Chat history | Skip |
| P3 | Automated Notifications spam | Do not migrate |

---

## v1 scope sign-off

**Recommended MVP (matches epic #37):**

- [x] Message board with comments and @mentions
- [x] Task lists and assignments
- [x] Outbound email notifications via `SEND_EMAIL`
- [ ] Inbound email → board (blocked on #12)
- [ ] Chat, schedule, vault

**Board president sign-off:** _Pending Matt Wagner_

---

## References

- Epic: [#37](https://github.com/RedLegDev/gator-redleg-web/issues/37)
- Domain mail: [#12](https://github.com/RedLegDev/gator-redleg-web/issues/12)
- Inbound → board: [#31](https://github.com/RedLegDev/gator-redleg-web/issues/31)
- Vault: `~/vault/Areas/Gator Redlegs/Lessons.md`
