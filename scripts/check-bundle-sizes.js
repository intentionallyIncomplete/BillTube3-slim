#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const budgetPath = path.join(rootDir, "scripts", "bundle-size-budget.json");

const budget = JSON.parse(fs.readFileSync(budgetPath, "utf8"));
const files = Object.keys(budget.files);

let failed = false;
let total = 0;

console.log("Bundle size check (gzip-agnostic byte limits):\n");

for (const rel of files) {
  const abs = path.join(rootDir, rel);
  if (!fs.existsSync(abs)) {
    console.error(`✗ missing ${rel}`);
    failed = true;
    continue;
  }
  const size = fs.statSync(abs).size;
  total += size;
  const max = budget.files[rel];
  const kb = (size / 1024).toFixed(1);
  const maxKb = (max / 1024).toFixed(1);
  if (size > max) {
    console.error(`✗ ${rel}: ${kb}KB exceeds ${maxKb}KB budget (+${((size - max) / 1024).toFixed(1)}KB)`);
    failed = true;
  } else {
    console.log(`✓ ${rel}: ${kb}KB (budget ${maxKb}KB)`);
  }
}

if (budget.totalMaxBytes && total > budget.totalMaxBytes) {
  console.error(
    `✗ total ${(total / 1024).toFixed(1)}KB exceeds ${(budget.totalMaxBytes / 1024).toFixed(1)}KB budget`
  );
  failed = true;
} else if (budget.totalMaxBytes) {
  console.log(`\n✓ total ${(total / 1024).toFixed(1)}KB (budget ${(budget.totalMaxBytes / 1024).toFixed(1)}KB)`);
}

process.exit(failed ? 1 : 0);
