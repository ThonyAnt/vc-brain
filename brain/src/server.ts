/**
 * Local long-lived Meridian brain API.
 *
 *   npm run api          (from brain/)
 *
 * Production on Vercel uses `api/[...path].ts` → same `handleNodeApi` runtime.
 */
import http from "node:http";
import { apiModelLabel, handleNodeApi } from "./apiRuntime.js";

const PORT = Number(process.env.VC_BRAIN_API_PORT ?? "8790");

const server = http.createServer((req, res) => {
  void handleNodeApi(req, res);
});

server.listen(PORT, () => console.log(`• Brain API on http://localhost:${PORT} (model ${apiModelLabel()})`));
