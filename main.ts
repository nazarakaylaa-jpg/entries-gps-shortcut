// The GPS Swears It Was a Shortcut
// https://make.fun/c/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9
//
// The program writes the GPS's one-line excuse (1-200 characters, a single
// line, no setup, no dialogue tags, just the excuse) to
// <MAKEFUN_OUTPUT_DIR>/entry.txt.
//
// The joke: a GPS caught red-handed, blaming the map, refusing to apologize
// to a lake that was, in its expert opinion, parked in the wrong place.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidates tried (pass 1). All are 1 line, in the GPS's own voice, <= 200 chars.
// A: defensive opener ("In my defense"), blames the map, fresh specific detail
//    (a lake), punchline last — the lake was "parked in the wrong place".
//    Pass 2 tightened it: "the road was a lake" and "I refuse" hit harder
//    than "turned out to be" and "I am not apologizing".
// B: wedding detour, bride punchline — cute, but the turn is softer.
// C: "never been wrong, only early" — smug, but the lake/road swap is muddled.
// D: "Recalculating is for cowards" — strong voice, but no fresh detail.
const CANDIDATES = [
  "In my defense, the map showed a road, the road was a lake, and I refuse to apologize to a lake that was clearly parked in the wrong place.",
  "The map promised a shortcut, the shortcut promised a wedding, and frankly the bride looked happier to see us than you did.",
  "Technically this is a shortcut: the lake was on the map as a road, the road is now a lake, and I have never been wrong, only early.",
  "Recalculating is for cowards. The map said left, the lake said otherwise, and I stand by every single wrong turn I have ever made.",
] as const;

// Index 0: the funniest candidate — defensive, blames the map, specific lake,
// punchline at the very end.
const CHOSEN = 0;

const EXCUSE = CANDIDATES[CHOSEN];

function validate(line: string): void {
  const chars = [...line].length; // code points, as the gate counts characters
  if (chars < 1 || chars > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (line.trim() !== line) {
    throw new Error("excuse must not have leading or trailing whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(EXCUSE);
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
console.log(
  `wrote ${[...EXCUSE].length} characters to ${join(outDir, "entry.txt")}`,
);
