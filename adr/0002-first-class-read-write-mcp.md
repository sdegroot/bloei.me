# ADR-0002: Ship first-class read/write MCP automation

- **Status:** Accepted
- **Date:** 2026-08-21
- **Accepted:** 2026-08-21
- **Decision:** D-084

## Context

Bloei.me must be easy to operate through agents and organizational automation,
not only through forms or a conventional REST client. Creating and maintaining
campaigns, publishing progress, associating external work, and submitting
delivery results are especially suitable for automation. Deferring MCP until a
complete REST API exists would make the web interface the only early way to
exercise these workflows and would postpone validation of the application
command boundary.

MCP tools are model-controlled. A convenient write interface must therefore not
become an authorization bypass, treat a model assertion as human confirmation,
or hide which person, organization, or automation credential caused a change.
Bloei.me also needs unattended operation without sharing a person's refresh
token with a CI job or long-running agent.

## Decision

Ship a remote MCP server as an early v1 interface in the existing Spring Boot
application. Use Streamable HTTP at `/mcp`; do not add a sidecar, separate
service, embedded model, or HTTP call from MCP back into Bloei.me. The adapter
calls the same application commands and audience-aware queries as the web and
REST adapters.

Implement MCP incrementally with the domain slices. The first useful release
must expose discovery and read operations plus the complete campaign-authoring
and delivery-management path. Do not wait for the entire REST surface before
shipping MCP. A domain command is implemented once and may have web, MCP, and
later REST adapters.

### Resources and read tools

Expose explicit public and authorized projections for organizations,
components, proposals, campaign drafts and campaigns, progress, evidence,
review state, and settlement results. Use MCP resources and resource templates
where clients support them, and provide equivalent narrow `search`, `list`, and
`get` read-only tools so an automation client is not dependent on resource UI.
Never expose a generic database query, raw audit log, or unrestricted entity
serializer.

### Write tools

Expose narrow tools mapped one-to-one to application commands, starting with:

- creating, validating, revising, publishing, clarifying, and cancelling
  campaign drafts where the actor has authority;
- maintaining supplier teams and component targets;
- publishing progress and associating allowlisted external-work references;
- creating and revising delivery evidence, associating already-sanitized media,
  declaring the final price, and submitting or resubmitting delivery; and
- reading resulting review, acceptance, and settlement projections.

Later feature slices add their ordinary non-administrative commands under the
same policy. Platform verification, moderation decisions, security operations,
role administration, exceptional corrections, and secret management have no
MCP tools in v1. Do not provide a generic `update_resource` or arbitrary state-
transition tool.

Every write tool has closed input and output JSON Schemas, rejects unknown
fields, identifies the acting organization explicitly, supports validation or
dry-run where useful, and returns the affected resource and audit correlation.
State-changing tools use the same optimistic version, exact terms/statement,
idempotency, deadline, conflict, and domain validation rules as other adapters.
MCP tool annotations are descriptive only and never grant authority.

Binary evidence is uploaded through the authenticated media-upload workflow,
not embedded as unbounded base64 and never fetched from an arbitrary URL. MCP
can create an upload session and associate accepted media objects; delivery
submission remains blocked until sanitation is complete.

### Interactive and unattended authority

Support two actor types:

1. **Delegated person:** OAuth authorization code with PKCE lets an MCP client
   act with the person's current Bloei.me memberships and roles.
2. **Organization automation:** OAuth client credentials identify a dedicated
   automation principal linked in Bloei.me to exactly one organization.

An organization administrator creates an automation registration, gives it an
expiry and explicit capabilities, and may restrict it to named components or
campaigns. Bloei.me stores the registration and external `(issuer, subject)`
binding, not the credential secret. Capabilities initially include separate
grants for campaign drafting, campaign publication, progress, evidence editing,
media upload, and delivery submission. Automation principals cannot administer
memberships or roles, accept platform terms, pledge budgets, cast acceptance
ballots, moderate, verify identities, or act as platform operators.

Interactive high-impact tools require an exact short-lived confirmation token
minted after the person reviews the authoritative server preview. A model-set
boolean is not confirmation. Unattended publication or delivery submission is
allowed only when the organization administrator explicitly granted that named
capability and scope; every resulting public and audit record identifies the
action as automated. Revocation and scope reduction take effect on the next
tool call even if the access token has not expired.

### Protocol and security

Implement the current supported MCP protocol with protocol-version negotiation
and Streamable HTTP. Publish OAuth Protected Resource Metadata, use authorization
server discovery, require resource indicators, and validate issuer, signature,
expiry, audience/resource, client, grant type, and scopes on every request. Do
not accept browser session cookies at `/mcp`, put tokens in URLs, or pass an MCP
token to GitHub or another provider. Validate a present HTTP `Origin` header
against the deployment allowlist before processing an MCP message.

Return only tools and resources permitted by the presented authorization, but
repeat authoritative authorization inside every application command. Apply
client, actor, organization, tool, and write rate limits. Bound request,
response, pagination, Markdown, and tool-result sizes. Treat tool descriptions,
annotations, resource text, and submitted content as untrusted data.

## Consequences

- MCP becomes a v1 interface and D-071 is superseded.
- Campaign and delivery commands must be designed for safe automation from
  their first implementation, rather than extracted from controller logic.
- Organization automation accounts and client-credentials support move into v1;
  broad service accounts and platform automation remain excluded.
- MCP and REST share schemas and semantics where practical, but neither proxies
  the other and one is not blocked on completion of the other.
- The integration surface grows earlier, so protocol, authorization, schema,
  idempotency, audit, and adversarial tool tests become release gates.

## Alternatives considered

### Defer MCP until REST is complete

This reduces the initial interface count but fails the required agent and
automation workflow and delays testing whether application commands are truly
adapter-independent.

### Wrap REST from a separate MCP service

This duplicates authentication and error translation, adds another deployment,
and encourages MCP-specific orchestration outside the transaction and policy
boundary.

### Delegated people only

This supports interactive agents but encourages unattended jobs to retain human
refresh tokens. Explicit organization automation is safer and more auditable.

### Give automation ordinary organization roles

Human roles carry powers that automation does not need. Named capabilities with
component/campaign constraints provide narrower authority and clearer review.

## Acceptance checks

Implementation must prove:

1. A supported MCP client discovers OAuth metadata, authenticates, lists only
   allowed tools, and reads public and protected projections.
2. Delegated-person tools lose authority immediately after role or membership
   revocation.
3. An organization automation principal cannot cross its organization,
   component, campaign, capability, or expiry boundary.
4. Campaign creation through publication and progress through delivery
   submission work end to end with identical domain results from web and MCP.
5. Retries cannot duplicate campaigns, progress, evidence revisions, final
   price declarations, or delivery submissions.
6. Interactive high-impact actions reject model-supplied confirmation without
   a valid short-lived server token; explicitly granted unattended actions are
   labelled and audited as automation.
7. Unknown fields, prompt-injection text, oversized results, wrong-audience
   tokens, token passthrough, cookie authentication, and arbitrary media-fetch
   attempts fail closed.
8. Packaging and deployment add no separate MCP process or required AI model.

## References

- [MCP authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- [MCP tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [MCP OAuth client-credentials extension](https://modelcontextprotocol.io/extensions/auth/oauth-client-credentials)
- [Authentik machine-to-machine authentication](https://docs.goauthentik.io/add-secure-apps/providers/oauth2/machine_to_machine)
