import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { VCBrainState } from "../state.js";

/**
 * Persist a completed pipeline run (the whole VCBrainState, incl. events) so the
 * demo can replay a "golden" result instantly and offline — no LLM calls needed.
 */
export async function saveSnapshot(path: string, state: VCBrainState): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(state, null, 2) + "\n", "utf8");
}

export async function loadSnapshot(path: string): Promise<VCBrainState> {
  return JSON.parse(await readFile(path, "utf8")) as VCBrainState;
}
