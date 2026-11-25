// Fridge Roast: One Line, Biggest Laugh — make.fun entry.
//
// Writes a single roast line (at most 200 characters) to /output/entry.txt.
// The line is a fixed string: the program is fully deterministic, so every
// run produces byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My smart fridge updated its firmware and now the ice maker needs a login, the door needs Wi-Fi, and the milk needs a software license to stay cold.";

// Gate: one line, 1-200 characters, no control characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-200`);
}
if (LINE.includes("\n") || /[\u0000-\u001f]/.test(LINE)) {
  throw new Error("entry must be a single line with no control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read the file back and verify the output is byte-identical to the line.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry line");
}

console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
