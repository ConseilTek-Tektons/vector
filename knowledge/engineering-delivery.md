# Vector engineering delivery

## Cycle decisions

Treat a cycle forecast as decision support. Review added scope, blockers, assignee load, and remaining working days before moving work. The assistant can explain its evidence but cannot edit an issue.

## Triage

Every new issue begins in a team-owned workflow state. Similarity can suggest a duplicate, while only an authorized user can establish the relationship or close the duplicate.

## Dependencies

Blocking relationships must remain explicit. Project and cycle views derive risk from the dependency graph and preserve the source issue behind every warning.

## Consistency

PostgreSQL is the system of record. Immediately after a write, route reads to a source that has replayed the write before returning to normal replica selection.
