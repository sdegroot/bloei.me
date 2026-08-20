# ADR-0001: Use ProseMirror JSON with a Kotlin rich-text renderer

- **Status:** Proposed pending spike
- **Date:** 2026-08-20
- **Question:** [Q-030](../open-questions.md#q-030--which-authoring-format-and-sanitizer-policy-are-used)

## Context

Bloei.me needs accessible rich-text authoring for campaign scope, acceptance
criteria, proposals, delivery notes, objections, and comments. Authors include
non-technical public-sector and open-source participants, so Markdown syntax
alone is not an adequate primary editing experience.

The application otherwise uses server-rendered Thymeleaf and HTMX. Public
content must remain readable without JavaScript, and the server must never
trust editor-produced HTML. The content model also needs a small, explicit
surface that can be validated, moderated, migrated, and rendered consistently.

ProseMirror supplies a schema-constrained browser document model, but its
official server serializer is JavaScript and requires a DOM implementation
outside a browser. Running Node as a production rendering service would add an
operational boundary solely for rich text. A small Kotlin renderer is feasible
because Bloei.me deliberately permits only a restricted schema.

## Proposed decision

Use direct upstream ProseMirror packages for rich-text editing. Add a pinned
Node and package-manager toolchain to build versioned static browser assets;
Node is not part of the production runtime.

Persist the authoritative document in PostgreSQL `jsonb` using this envelope:

```json
{
  "schemaVersion": 1,
  "doc": {
    "type": "doc",
    "content": []
  }
}
```

The v1 schema permits only:

- document, paragraph, H2 through H4, blockquote, bullet-list, ordered-list,
  list-item, code-block, hard-break, and text nodes; and
- strong, emphasis, inline-code, and link marks.

Links may use HTTPS or a root-relative application path. Images, arbitrary
HTML, tables, horizontal rules, embedded media, style attributes, and unknown
nodes, marks, or attributes are not part of the rich-text schema. Evidence
images remain separate sanitized uploads governed by Q-031 and Q-032.

Treat the browser document as untrusted input. The server parses generic JSON,
validates it into a closed Kotlin model, and rejects malformed structure,
unknown fields, unsupported nesting, unsafe URLs, excessive depth, excessive
node counts, and field-specific size violations. It must not enable
polymorphic class construction from submitted type names.

The Kotlin renderer recursively produces static HTML and plain text. It always
escapes text and attribute values, maps only enumerated nodes and marks, and
runs the result through a custom OWASP Java HTML Sanitizer allowlist before the
HTML can reach a Thymeleaf raw-HTML insertion point. Sanitized HTML is a
disposable cache identified by both the source revision and a separate render-
policy version; the JSON document remains authoritative.

Public pages render the cached server output and work without JavaScript.
Authoring requires JavaScript and must provide an accessible toolbar, visible
focus, keyboard operation, localized labels, and paste handling constrained by
the same schema.

Every stored document carries its schema version. Additive or breaking schema
changes require matching browser, Kotlin validation, HTML, plain-text, and
migration support. During a migration, the server must continue reading every
persisted version until all documents have been upgraded. Shared fixtures must
exercise both the TypeScript editor schema and Kotlin implementation.

This ADR defines an internal persistence and rendering contract. It does not
choose the representation exposed by the future REST API.

## Alternatives considered

### Restricted Markdown only

This keeps storage portable and server rendering mature, but makes formatting
syntax part of the primary experience for non-technical authors. Rejecting
unsupported syntax also creates avoidable authoring errors.

### ProseMirror over authoritative Markdown

The official `prosemirror-markdown` package supports this approach and avoids a
JVM ProseMirror renderer. It introduces normalization and round-trip constraints
between the editor schema and Markdown, and makes future structured nodes
dependent on Markdown encodings.

### ProseMirror JSON rendered by Node

ProseMirror's `DOMSerializer` can render on a Node server when supplied with a
DOM implementation. This keeps schema and rendering code in one language but
adds a production JavaScript process, sidecar, or remote rendering boundary to
an otherwise JVM application.

### ProseMirror JSON rendered in the browser

Client-only rendering would undermine server-rendered public pages and make
untrusted client HTML authoritative. It is not acceptable.

## Consequences

- Rich content is structurally constrained before it reaches storage or public
  rendering.
- ProseMirror becomes a browser-build dependency and requires a small custom
  editing shell; it is a toolkit rather than a drop-in editor.
- The Kotlin renderer is intentionally small, deterministic, and independent
  of browser DOM behavior.
- Browser and server schemas can drift unless shared fixtures and compatibility
  checks are mandatory release gates.
- Each future node, mark, or attribute requires an explicit security review,
  schema-version decision, and implementations in both environments.
- A successful spike may accept this ADR. Acceptance then creates the next
  D-numbered summary, resolves Q-030, and updates the normative architecture.

## Required spike

The ADR remains proposed until a thin end-to-end spike proves all of the
following:

1. Representative Dutch and English documents persist and reload in the editor
   without semantic loss.
2. Kotlin HTML and plain-text rendering covers every permitted node and mark
   and matches the intended browser semantics on shared fixtures.
3. Unknown structures, malicious attributes, unsafe and deceptive URLs,
   malformed Unicode, excessive nesting, and excessive node counts fail closed.
4. An adversarial XSS corpus cannot produce executable markup, and the OWASP
   sanitizer remains an effective final boundary.
5. Public content renders correctly without JavaScript.
6. The editor passes keyboard-only browser journeys and automated axe-core
   checks at supported responsive sizes.
7. Benchmarks establish document-size, nesting-depth, and node-count limits
   before acceptance.

## References

- [ProseMirror guide](https://prosemirror.net/docs/guide/)
- [ProseMirror reference manual](https://prosemirror.net/docs/ref/)
- [ProseMirror Markdown example](https://prosemirror.net/examples/markdown/)
- [ProseMirror DOMSerializer security notice](https://discuss.prosemirror.net/t/heads-up-xss-risk-in-domserializer/6572)
- [OWASP Java HTML Sanitizer](https://github.com/OWASP/java-html-sanitizer)
