import { moveSync } from "https://deno.land/std@0.91.0/fs/mod.ts";

const text = await Deno.readTextFile("import_map.json");
const alephPath = JSON.parse(text).imports["aleph/"];

const buildStatus = await Deno.run({
  cmd: [
    Deno.execPath(),
    "run",
    "--allow-net=deno.land,esm.sh,cdn.esm.sh",
    "--allow-read",
    "--allow-write",
    "--allow-env",
    "--allow-run",
    `${alephPath}cli.ts`,
    "build",
  ],
  stdout: "inherit",
  stderr: "inherit",
}).status();

console.log(`Build Exit Code: ${buildStatus.code}`);

const startStatus = await Deno.run({
  cmd: [
    Deno.execPath(),
    "run",
    "--allow-net=deno.land,esm.sh,cdn.esm.sh",
    `${alephPath}cli.ts`,
    "start",
    "--help",
  ],
  stdout: "null",
  stderr: "inherit",
}).status();

console.log(`Help Exit Code: ${startStatus.code}`);

