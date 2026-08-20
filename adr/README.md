# Bloei.me architecture decision records

Architecture decision records (ADRs) preserve the context, alternatives, and
validation needed for consequential technical choices. They complement the
short accepted-decision summaries in [decisions.md](../decisions.md).

## Lifecycle

Each ADR uses a four-digit sequence and one of these statuses:

- **Proposed:** preferred direction that still needs named validation or
  approval;
- **Accepted:** binding implementation direction;
- **Rejected:** evaluated but not adopted; or
- **Superseded:** replaced by a later ADR, which must be linked from both
  records.

Do not silently rewrite an accepted ADR. Clarifications that do not change its
meaning may be appended. A material change requires a new ADR and marks the old
record as superseded.

When a proposed ADR becomes accepted:

1. update its status and acceptance date;
2. add a concise D-numbered summary to the decision register;
3. resolve any linked item in [open-questions.md](../open-questions.md); and
4. update the solution architecture, plan, scenarios, and changelog where the
   decision changes them.

## Index

| ADR | Status | Subject |
| --- | --- | --- |
| [ADR-0001](0001-prosemirror-json-rich-text.md) | Proposed | ProseMirror JSON and Kotlin server rendering for rich text |
