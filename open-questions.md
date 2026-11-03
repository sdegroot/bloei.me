# Bloei.me open questions

Status: Living register

Last updated: 2026-08-25

This register contains product, operational, implementation, and legal choices
that have not been accepted yet. Accepted choices belong in
[decisions.md](decisions.md); implementation direction belongs in
[plan.md](plan.md). A question can be important without blocking the first
pilot.

## How to use this register

- **Launch blocker:** decide before a real v1 campaign can use the affected
  capability.
- **Pilot decision:** choose before or during pilot preparation; the product can
  otherwise be built with a conservative default.
- **Evidence needed:** observe real use before fixing a permanent rule.
- **Legal review:** keep the current trust-based working assumption until
  specialist advice is obtained.
- **Implementation gate:** decide before the named technical milestone; it need
  not block unrelated product or foundation work.
- **Deferred:** preserve room in the model, but do not build the capability in
  v1.

When a question is resolved, add the decision and rationale to
[decisions.md](decisions.md), update the plan and affected scenarios, and move
the item to the resolved log at the bottom of this document.

## Governance and operations

### Q-008 — Who performs platform operations at launch?

- **Decision horizon:** Launch blocker
- **Current inclination:** Staff two internal platform operators with a daily
  routed on-call rota and no self-review. Keep names, direct contacts, absence
  cover, and escalation details in the protected deployment runbook.
- **Why it remains open:** The role split and service targets are decided, but
  the actual people and contact rota must be assigned for the hosted pilot.
- **Decision trigger:** Confirm pilot ownership and support hours.

## Finance, contracts, and public-sector use

### Q-012 — When does a pledge become legally binding, if at all?

- **Decision horizon:** Legal review
- **Current inclination:** Call a pledge a recorded organizational funding
  commitment, require versioned authority and intent confirmation, and avoid
  claiming that Bloei.me forms, enforces, or determines a supplier contract.
- **Why it remains open:** The platform records an organization-to-campaign
  commitment but deliberately does not name a payee in its settlement note.
- **Decision trigger:** Legal review before public launch or any claim of
  enforceability.

### Q-014 — How is procurement responsibility explained and evidenced?

- **Decision horizon:** Legal review
- **Current inclination:** Bloei.me provides transparent coordination records
  and selection rationale but no compliance label. Each pledger records a
  versioned confirmation that its organization remains responsible for its
  procurement route, internal approvals, and legal assessment. The possible
  procurement-backed funding model is explored separately in
  [public-sector-procurement.md](public-sector-procurement.md) without adopting
  it.
- **Why it remains open:** Aggregation, joint commissioning, subsidy, conflict,
  and tender obligations depend on the participating bodies and campaign.
- **Decision trigger:** Legal review of the first public-sector campaign.

### Q-015 — Which exact records and retention periods apply?

- **Decision horizon:** Launch blocker and legal review
- **Current inclination:** Apply D-078's category-specific pilot schedule:
  service-lifetime public history; seven-year core audit; active-life plus five-
  year identity decisions; 90-day raw verification evidence; two-year authority
  history; severity-based moderation; bounded logs, incidents, notifications,
  idempotency records, uploads, and 35-day backups.
- **Why it remains open:** Audit value, privacy minimization, limitation
  periods, procurement records, and self-hosted responsibilities differ.
- **Decision trigger:** Complete the record inventory and privacy schedule.

### Q-016 — What are the controller and processor roles?

- **Decision horizon:** Legal review
- **Current inclination:** Treat the hosted operator as controller for core
  purposes, participant organizations as independent controllers for their own
  purposes, and instructed vendors as processors. Avoid blanket joint control;
  a self-hosted operator assumes deployment-level controller responsibility.
- **Why it remains open:** Identity verification, public commitments,
  moderation, and hosting can involve different roles; any future AI provider
  adds a separate review before enablement.
- **Decision trigger:** Select hosted processors and draft the privacy terms and
  processing inventory.

## Service and sustainability

### Q-018 — Who operates and governs the hosted network?

- **Decision horizon:** Launch blocker
- **Current inclination:** Keep governing-organization identity, legal and
  privacy contacts, security contact, and appointed operator roles as required
  deployment configuration. Name the actual hosted entity before launch.
- **Why it remains open:** The product design defines the platform role but not
  the operating entity or its long-term governance.
- **Decision trigger:** Establish the hosted pilot.

### Q-019 — How is Bloei.me itself funded after the pilot?

- **Decision horizon:** Evidence needed
- **Current inclination:** Keep the pilot free and public browsing free. Test a
  later monthly hosted-service subscription per active verified organization,
  without campaign percentages, seat charges, or transaction pricing.
- **Why it remains open:** Price, billable activity, and waivers for small or
  community organizations require pilot cost and demand evidence.
- **Decision trigger:** Measure operating cost and willingness to pay during the
  pilot.

## Implementation choices

### Q-036 — How does Authentik issue MCP person and automation tokens?

- **Decision horizon:** Implementation gate — before the MCP identity
  foundation
- **Current inclination:** Use one stable deployment issuer and exact subjects
  across web and delegated MCP identity, resource-bound MCP audiences, OAuth
  discovery metadata, PKCE for people, and separately provisioned Authentik
  service-account credentials for Bloei.me automation registrations.
- **Why it remains open:** The reference configuration must prove stable
  issuer/subject mapping across clients, MCP Protected Resource Metadata and
  resource indicators, practical client onboarding without unsafe redirect
  registration, immediate Bloei.me revocation, secret rotation, and an
  equivalent standards-compliant self-hosted-provider path.
- **Decision trigger:** Run an Authentik-backed end-to-end spike with one remote
  MCP client and one organization automation principal before selecting the
  Spring MCP/OAuth integration libraries.

## Resolved questions

### Q-030 — Which authoring format and sanitizer policy are used?

- **Resolved:** 2026-08-20 by D-083 and ADR-0001
- **Answer:** Store versioned restricted Markdown, provide a constrained
  WYSIWYG editor, render and sanitize authoritatively on the JVM, and keep both
  editor state and generated HTML disposable.

### Q-021 — What is the hosted identity configuration?

- **Resolved:** 2026-08-20 by D-079
- **Answer:** Use deployment-level OIDC with exact issuer/subject identity,
  local role authority, audited recovery and bootstrap, and step-up protection
  for privileged actions; Authentik is the hosted reference provider.

### Q-022 and Q-032 — Which infrastructure and storage model is used?

- **Resolved:** 2026-08-20 by D-080
- **Answer:** V1 is one application plus PostgreSQL, SMTP, and OIDC. Evidence
  bytes use PostgreSQL behind a multi-backend storage port; local-filesystem and
  S3-compatible adapters are required later migration targets.

### Q-024 — What does future split-budget pledging look like?

- **Resolved:** 2026-08-20 by D-028
- **Answer:** Persist allocation rows now, enforce one complete budget
  allocation per pledge in v1, and relax that validation only for a concrete
  later multi-envelope need.

### Q-026 — Which identifier and public-slug strategy is used?

- **Resolved:** 2026-08-20 by D-081
- **Answer:** Use typed application-generated UUIDv7 identifiers and immutable,
  type-scoped publication slugs; introduce editing only with permanent redirect
  history.

### Q-031 — What limits and tools govern evidence images?

- **Resolved:** 2026-08-20 by D-082
- **Answer:** Accept bounded static JPEG/PNG only, asynchronously sanitize a
  master and preview, require alt text, and support optional fail-closed ClamAV
  scanning through a generic port.

### Q-001 through Q-006 — Catalogue and proposal governance

- **Resolved:** 2026-08-20 by D-075
- **Answer:** Programs are deferred; operators approve canonical components and
  adjudicate stewardship; unmaintained components support truthful independent
  work; and human-led duplicate and proposal-lifecycle policies preserve public
  history.

### Q-007, Q-009, Q-010, and Q-011 — Enforcement and moderation

- **Resolved:** 2026-08-20 by D-076
- **Answer:** Use proportionate appealable restrictions, severity-based service
  targets, advisory-only future AI, and distinct operator confirmation for
  irreversible forced failure.

### Q-013, Q-017, and Q-020 — Deferred agreements and service boundaries

- **Resolved:** 2026-08-20 by D-077
- **Answer:** V1 has no external-agreement workflow, tax or invoice advice, or
  component-support service. It records neutral commitments and settlement data
  and routes component support to maintainer-owned channels.

### Q-025 — Do modules start as Gradle subprojects or packages?

- **Resolved:** 2026-08-20 by D-072
- **Answer:** Use only `core` and `app` as production Gradle projects and use
  Spring Modulith feature packages within `core`.

### Q-027 — Which PostgreSQL baseline and migration layout are supported?

- **Resolved:** 2026-08-20 by D-074
- **Answer:** Baseline PostgreSQL 18 with forward-only Flyway migrations and
  explicit platform, business, and DBOS schemas.

### Q-028 — How are durable jobs and the outbox implemented?

- **Resolved:** 2026-08-20 by D-073
- **Answer:** Use DBOS for durable workflows and add a transactional outbox only
  with the first real event-launched workflow.

### Q-029 — How are browser sessions stored and privileged sessions limited?

- **Resolved:** 2026-08-20 by D-074
- **Answer:** Store sessions in PostgreSQL with secure, HTTP-only, same-site
  cookies. Refine privileged timeout policy with the operator threat model.

### Q-033 — Which observability stack ships in v1?

- **Resolved:** 2026-08-20 by D-074
- **Answer:** Start with structured logs, Actuator health, and Prometheus
  metrics. Defer OTLP until an operations backend is selected.

### Q-034 — Which CI and software-supply-chain controls are required?

- **Resolved:** 2026-08-20 by D-074
- **Answer:** Use GitHub Actions for the complete verification, SBOM, OCI,
  vulnerability, secret, dependency, and CodeQL gates. Defer publishing and
  signing.

### Q-023 — Which external component-source integrations come first?

- **Resolved:** 2026-08-02 by D-070
- **Answer:** Start with provider-neutral component repository links and
  external work references. Validate and periodically refresh public GitHub
  metadata through a read-only adapter without installing a GitHub App.
- **Follow-through:** Private repository access, GitHub writes, webhooks, and
  providers beyond link-only support remain later capabilities.

### Q-035 — Should Exposed replace jOOQ?

- **Resolved:** 2026-08-01 by D-068
- **Answer:** Yes. Start with the Exposed JDBC SQL DSL, exclude its DAO API, and
  keep Flyway authoritative. Preserve repository boundaries so another
  persistence library remains a feasible later change.
- **Follow-through:** Locking, transactions, JSONB, schema drift, and concurrent
  financial behavior remain required implementation tests, not a gate before
  choosing Exposed.

Earlier resolved design choices that predate this register are recorded
directly in [decisions.md](decisions.md).
