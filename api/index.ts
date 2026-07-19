import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleNodeApi } from "../brain/src/apiRuntime.js";

export const config = {
  maxDuration: 300,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const forwarded = typeof req.query.p === "string" ? req.query.p : undefined;
  if (forwarded) {
    const q = req.url?.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    req.url = `/api/${forwarded.replace(/^\//, "")}${q}`;
  }
  await handleNodeApi(req, res);
}
