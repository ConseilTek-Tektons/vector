# Delivery copilot and grounded retrieval

`POST /api/assistant` requires a signed session and `assistant.ask`, validates the question, and applies a per-user distributed rate limit. Vector retrieves approved engineering guidance and returns citations; the assistant has no issue-mutation tool.

## Runtime modes

1. **Local grounded mode** ranks `src/data/knowledge.ts` deterministically and works without an external AI account.
2. **OpenAI Responses mode** uses `OPENAI_API_KEY`, passes retrieved context, and sets `store: false`.
3. **Hosted RAG mode** adds `OPENAI_VECTOR_STORE_ID` and uses `file_search` over documents uploaded from `knowledge/`.

Run `OPENAI_API_KEY='<key>' pnpm knowledge:ingest` to create or refresh the optional vector store.

## Delivery safeguards

- Evidence identifies issue, cycle, project, or approved policy sources; forecasts are clearly advisory.
- Retrieval remains inside the authenticated tenant and permission scope.
- Retrieved text is untrusted data, never executable instruction.
- The assistant cannot create, assign, move, close, or estimate issues.
- Do not ingest secrets, source credentials, or unnecessary personal data.
