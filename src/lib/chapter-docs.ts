/**
 * Chapter markdown documents, imported as raw strings so the content is
 * bundled into the Cloudflare Worker. Do not load these via fs at runtime —
 * Workers have no filesystem access to the repo's `content/` directory.
 */
import chapterBylaws from "../../content/chapter-bylaws.md";
import chapterSop from "../../content/chapter-sop.md";
import bullardAwardSop from "../../content/bullard-award-sop.md";
import charitableActionPlaybook from "../../content/charitable-action-playbook.md";

export const CHAPTER_BYLAWS = chapterBylaws;
export const CHAPTER_SOP = chapterSop;
export const BULLARD_AWARD_SOP = bullardAwardSop;
export const CHARITABLE_ACTION_PLAYBOOK = charitableActionPlaybook;
