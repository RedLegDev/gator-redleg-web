/**
 * Chapter Zoom room details — single source of truth for the /zoom page and
 * any link that points members at the chapter meeting.
 *
 * These are the "Gator Redlegs Board Meeting" room's details. The join URL
 * embeds the passcode, so most members never type one; the raw meeting ID,
 * passcode, dial-in, and SIP values are kept alongside it for anyone joining
 * from a phone or a conference-room system. Update this file when the chapter
 * schedules a new meeting room.
 */

export const ZOOM_JOIN_URL =
  "https://us06web.zoom.us/j/86748474759?pwd=NLrZXAwWOCuCbHvvwMVYlO8eQm7HIL.1";

/** Formatted for reading aloud / typing into the Zoom app. */
export const ZOOM_MEETING_ID = "867 4847 4759";

export const ZOOM_PASSCODE = "613268";

/**
 * Zoom's one-tap strings, split into a `tel:` href and a human-readable
 * display form. The digits after the number are the meeting ID and the
 * passcode, so tapping joins without further prompts.
 */
export const ZOOM_DIAL_IN = [
  {
    region: "US",
    display: "+1 305 224 1968",
    tel: "+13052241968,,86748474759#,,,,*613268#",
  },
  {
    region: "US",
    display: "+1 309 205 3325",
    tel: "+13092053325,,86748474759#,,,,*613268#",
  },
] as const;

export const ZOOM_SIP = "86748474759@zoomcrc.com";
