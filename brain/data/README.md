# VC Brain data

`sourced-companies.json` is the canonical portable file for companies found by
live Tavily sourcing. The Brain API loads it at startup and rewrites it after a
successful sourcing run.

To share sourced companies with another laptop:

1. Commit and push `brain/data/sourced-companies.json`.
2. On the other laptop, pull the branch.
3. Start the Brain API normally with `npm run api` from `brain/`.

The polished frontend demo seed remains in
`app/src/lib/mock/fixtures.ts`. That file is separate from live sourced results.
