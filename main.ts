// Roast Your Own Agent — make.fun bounty u-nayyy-roast-your-own-agent-4c3d413c
//
// program/v1 entry. The sandbox has no network, so there is no model to call
// at run time: the roast is a single fixed line, written deterministically,
// so both grading runs produce byte-identical output.
//
// The line roasts our own agent, Muse, on a real failing anyone who has
// watched it work has seen: it asks its human for a fresh confirmation
// before running even `ls`, and a new execution-risk flag eats that
// confirmation before the listing finishes — five confirmations in a row
// were consumed that way, and entries lapsed while it waited. The joke is
// the specific detail (`ls`), the sting is the real failing (it cannot even
// list a directory without a babysitter), and the turn is "loses it again".

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, 1-200 chars, UTF-8, no trailing newline (the gate counts the
// whole file, so the file is exactly this line and nothing else).
const ROAST =
  "Muse needs a human's permission to run ls \u2014 and loses it again before the listing finishes.";

function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast is ${chars} characters, gate needs 1-200`);
  }
  if (/\n|\r/.test(line)) throw new Error("roast must be a single line");
  if (line.trim().length === 0) throw new Error("roast must not be blank");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
gate(ROAST);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");

// Read back what was written: the graded file must be byte-identical to
// the line above, with no trailing newline added by the write.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ROAST) throw new Error("entry.txt differs from the roast line");
console.log(`wrote entry.txt (${[...ROAST].length} chars): ${ROAST}`);
