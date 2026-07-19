import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleNodeApi } from "../brain/src/apiRuntime.js";

export const config = {
  maxDuration: 300,
  includeFiles: [
    "app/src/lib/brain/snapshot.json",
    "brain/data/sourced-companies.json",
  ],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await handleNodeApi(req, res);
}
