# ADR-0001: Use restricted Markdown with a WYSIWYG editor

- **Status:** Accepted
- **Date:** 2026-08-20
- **Accepted:** 2026-08-20
- **Question:** Q-030, resolved by D-083

## Context

Bloei.me needs accessible formatted authoring for campaign descriptions,
proposals, delivery notes, objections, responses, and comments. Authors include
non-technical public-sector and open-source participants, so Markdown syntax
alone is not an adequate primary editing experience.

The expected content is nevertheless ordinary prose. Acceptance criteria,
evidence metadata, component and campaign references, organization identities,
and other business semantics belong in versioned domain records rather than
custom rich-text nodes. Images are separately managed and sanitized objects.

The application uses server-rendered Thymeleaf and HTMX. Public content must
remain accessible without JavaScript, and editor-produced HTML must never be
authoritative. Persisting ProseMirror JSON would require Bloei.me to own a
parallel Kotlin schema, validator, renderer, migration framework, and browser-
server compatibility suite before the product needs structured documents.

## Decision

Persist a versioned, restricted Markdown dialect as the canonical source. Give
authors a constrained WYSIWYG editor in the browser. The editor may use
ProseMirror internally, but its JSON and DOM are transient editing state and
are never persisted or trusted by the server.

Store each document with at least:

- `content_format = markdown`;
- `content_schema_version = 1`; and
- the original UTF-8 Markdown source.

The v1 dialect permits only:

- paragraphs, H2 through H4, block quotes, ordered and unordered lists;
- strong and emphasis, inline code, fenced code blocks, links, and hard breaks;
  and
- Bloei.me-managed images with meaningful alt text.

Disable raw HTML and reject unknown extensions. Links may use HTTPS or a safe
root-relative application path. Image destinations may reference only a
sanitized Bloei.me media record associated with the current content revision;
external images, data URLs, and arbitrary paths are forbidden. The renderer
selects the sanitized preview and master described by D-082. Content cannot be
submitted while a referenced image is unfinished.

Use a pinned JVM CommonMark implementation with an explicit extension set.
Parse and validate submitted Markdown on the server, including URL policy,
document byte size, nesting depth, rendered output size, and field-specific
rules. Render semantic HTML and plain text on the server. Pass HTML through a
custom OWASP Java HTML Sanitizer allowlist before any Thymeleaf raw-HTML
insertion point. Generated HTML is a disposable projection keyed by source
revision and render-policy version; Markdown remains authoritative.

The WYSIWYG editor exposes only constructs that serialize losslessly to the v1
dialect. It must provide an accessible toolbar, keyboard operation, localized
labels, visible focus, constrained paste handling, and managed image upload.
Unsupported pasted formatting is converted to supported semantics or removed
with clear feedback. Publication-sensitive workflows provide an authoritative
server-rendered preview.

Shared golden fixtures must prove supported Markdown round-trips through the
editor without semantic loss and that normalized editor output matches the
server-rendered structure. Public pages use the same content styles where
practical, while responsive layout may differ from the editing surface.

This ADR defines an internal persistence and rendering contract. It does not
choose the representation exposed by the future REST API.

## Future evolution

New formatting features are accepted only when they have an unambiguous,
portable Markdown representation and pass the same round-trip, security, and
accessibility gates. Do not encode domain behavior in custom Markdown syntax.

If a concrete need arises for collaborative editing, tracked changes, typed
inline references, interactive blocks, or other structured-document behavior,
introduce a separately versioned format such as `prosemirror-json-v1`. A future
format may coexist per document during migration, but formats are never mixed
within one document. The restricted v1 dialect keeps a deterministic Markdown-
to-document migration feasible.

## Alternatives considered

### Raw Markdown editor

This is simplest technically but makes formatting syntax the primary experience
for non-technical authors. It remains a possible accessible fallback, not the
default authoring interface.

### ProseMirror JSON with a Kotlin renderer

This gives typed document structure and avoids Markdown conversion, but requires
parallel browser and Kotlin schemas, a custom security-sensitive renderer,
schema migrations, and coordinated implementation for every node and mark. The
current product does not justify that cost.

### ProseMirror JSON rendered by Node

This reuses JavaScript rendering behavior but adds a production JavaScript
process, sidecar, or remote rendering boundary to an otherwise JVM application.

### Authoritative HTML

HTML is difficult to constrain durably, couples storage to rendering policy,
and creates unnecessary migration and stored-XSS risk. It is never canonical.

## Consequences

- Authors receive visual editing without storing editor-specific JSON.
- Source remains portable, inspectable, exportable, and renderable by mature
  JVM libraries.
- The editor feature set is intentionally limited by lossless Markdown
  round-tripping.
- Browser parsing and JVM rendering can drift, so shared golden fixtures and an
  authoritative server preview are mandatory.
- Rich domain concepts remain queryable and auditable outside prose.
- A later structured format remains possible, but requires a new ADR and an
  explicit migration or coexistence policy.

## Acceptance checks

Implementation must prove:

1. Representative Dutch and English documents round-trip through the editor
   without semantic loss.
2. Every permitted construct renders to semantic, accessible, JavaScript-free
   HTML and useful plain text.
3. Raw HTML, unsafe URLs, external images, malformed input, excessive nesting,
   and oversized source or output fail closed.
4. An adversarial XSS corpus cannot produce executable markup.
5. Managed images preserve mandatory alt text and cannot bypass quarantine.
6. Keyboard-only browser journeys and automated axe-core checks pass at
   supported responsive sizes.

## References

- [CommonMark specification](https://spec.commonmark.org/)
- [ProseMirror Markdown example](https://prosemirror.net/examples/markdown/)
- [OWASP Java HTML Sanitizer](https://github.com/OWASP/java-html-sanitizer)
