// SPDX-License-Identifier: MIT
// One Star, Written in Sap — writes the single one-line houseplant review
// from entry.txt to $MAKEFUN_OUTPUT_DIR/entry.txt after validating the gate:
// UTF-8 text, 1 to 279 characters, not only whitespace, single line.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const line = raw.replace(/\r\n/g, "\n").trim();

if (line.length < 1 || line.length > 279) {
  throw new Error(`entry must be 1-279 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const outText = line + "\n";
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, outText, "utf8");
console.log(`Sap review delivered: ${line.length} characters, saved to ${outPath}`);
