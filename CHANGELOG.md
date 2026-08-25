# Changelog

All notable changes to Bloei.me will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A non-normative public-sector procurement discussion paper covering
  open-source purchasing rules, procurement-backed funding instruments,
  conditional commitments, shared frameworks, municipal journeys, product
  implications, alternatives, and validation questions.
- A bilingual, zero-backend browser mockup with seeded organizations,
  role-specific workspaces, budget-backed pledging, fair-share allocation,
  delivery review, and settlement across a guided PDF/UA pilot journey.
- Versioned local browser persistence, compressed URL-fragment sharing, guarded
  snapshot previews, and offline JSON export and import for mockup journeys.
- Browser coverage for the complete multi-persona mockup journey, direct-file
  offline use, automatic and early campaign starts, supplier-funded shortfalls,
  Dutch and English accessibility, persistence, and snapshot round-tripping.
- An accepted first-class read/write MCP architecture for early campaign and
  delivery automation, with Streamable HTTP, delegated-person OAuth, narrowly
  scoped organization automation principals, confirmation tokens, closed tool
  schemas, idempotency, and direct application-command parity.
- Accepted technical policies for exact OIDC subject binding, PostgreSQL-first
  deployment and evidence storage, typed UUIDv7 identifiers, immutable public
  slugs, future local/S3 storage adapters, and bounded asynchronous JPEG/PNG
  sanitation with optional fail-closed ClamAV scanning.
- An accepted architecture decision for versioned restricted Markdown,
  constrained WYSIWYG editing, authoritative JVM rendering, managed inline
  images, and disposable sanitized HTML projections.
- A pinned Java 25, Kotlin, Spring Boot, and two-project Gradle build foundation
  for the `core` business library and executable `app`.
- A bilingual Thymeleaf and HTMX application shell with production OIDC,
  PostgreSQL-backed sessions, Flyway, Actuator, and Prometheus configuration.
- A separately compiled local persona login with an unmistakable development
  banner and no presence in the production application artifact.
- PostgreSQL integration proofs for Flyway, Exposed transaction rollback, and
  DBOS workflow recovery across application restarts.
- JVM-only Playwright and axe-core browser verification for responsive,
  keyboard-accessible, server-rendered pages.
- A non-root local development image, PostgreSQL-first Compose stack, and
  optional Authentik, S3Mock, and Mailpit profiles.
- GitHub Actions gates for formatting, architecture, tests, accessibility,
  coverage, SBOM generation, OCI verification, vulnerability and secret scans,
  dependency review, and CodeQL.
- Developer documentation for the two-project architecture, local personas,
  Authentik OIDC testing, optional services, verification, and production
  configuration.
- The EUPL-1.2 project license and locked, reproducible JVM dependencies.
- Initial product and implementation plan.
- Initial product and architecture decision register.
- End-to-end product scenarios covering organization onboarding, budgeting,
  funding, delivery, review, and settlement.
- Edge-case scenarios for platform participation, organizational continuity,
  suspension, failure, negative consent, and historical integrity.
- Scope-change scenarios covering clarification, linked additions, unanimous
  amendments, non-response, and budget revalidation.
- Multi-supplier scenarios covering supplier-team creation, replacement,
  combined delivery, and externally arranged invoicing.
- Lifecycle, authorization, supplier-continuity, conflict, duplicate-merge, and
  future four-eyes scenarios.
- Review edge cases for early and multiple objections, withdrawal after the
  deadline, resubmission, and content moderation.
- Timing scenarios for deadline races, daylight-saving changes, paused windows,
  platform outages, and delayed background jobs.
- A separate legal and compliance considerations document plus trust-based and
  future signed-contract scenarios.
- Identity, account-control, platform-participation, supplier-labeling, and
  event-driven re-verification scenarios.
- Public/private visibility scenarios covering organization-level transparency,
  protected employee attribution, private participation review, and safe future
  exports.
- Moderation and AI-assistance scenarios covering content redaction, appeals,
  fraud escalation, author warnings, reversible quarantine, prompt injection,
  and classifier outages.
- Canonical component, stewardship, supplier-formation, cross-component,
  independent-extension, program, and target-amendment scenarios.
- A separate open-question register with decision horizons, current
  inclinations, rationale, and concrete decision triggers.
- A standalone interactive functional design covering the product model,
  end-to-end journey, authority, lifecycle, funding logic, scope change,
  information visibility, representative scenarios, and release boundary.
- A proposed solution architecture covering system context, module boundaries,
  transactional workflows, persistence, authorization, evidence handling,
  security, operations, testing, repository structure, and delivery slices.
- An isolated local development-authentication design with seeded personas and
  a retained OIDC contract test.
- API and repository-integration scenarios covering delegated OAuth,
  idempotency, authority revocation, event visibility, shared repositories,
  provider failures, external work references, and deferred capabilities.
- A normative REST, event-feed, repository, GitHub metadata, and v1 MCP
  contract with concrete authorization, representations, commands, failure
  semantics, security boundaries, and verification requirements.

### Changed

- Finalized pilot catalogue, stewardship, duplicate, proposal-lifecycle,
  suspension, moderation-service, future-AI, and forced-failure policies.
- Formalized neutral commitment, procurement, agreement, tax, component-
  support, privacy-role, retention, and post-pilot sustainability boundaries.
- Organized executable applications under `apps/` and reusable business
  modules under `modules/`, following the shared repository convention.
- Enforced an explicit self-only content security policy in production and
  development security chains.
- Simplified the proposed implementation from per-capability and adapter Gradle
  projects to `core` feature packages plus one executable `app`; REST and MCP
  adapters join that application with their first domain slices.
- Selected DBOS for durable workflows, PostgreSQL 18 and server-side sessions,
  structured logs and Prometheus, and GitHub Actions supply-chain gates.
- Replaced fixed campaign prices with an immutable maximum-price ceiling and a
  supplier-declared final price.
- Allowed suppliers to start delivery below full coverage while accepting the
  uncovered funding risk.
- Clarified canonical organizations, deployment-level participation,
  organization-owned roles, and optional component-scoped budgets.
- Replaced quorum-based acceptance voting with notified negative consent.
- Added supplier suspension, cancellation and failure safeguards, self-funded
  delivery, and supplier-contribution settlement lines.
- Defined historical identity snapshots, personal anonymization, duplicate
  recovery, and exceptional audited redaction.
- Replaced mandatory re-pledging after every material change with explicit
  unanimous campaign amendments backed by successful budget revalidation.
- Allowed one lead supplier and optional co-suppliers per campaign while
  keeping work, price, and invoice allocation outside Bloei.me.
- Replaced invoice administration with minimal payee-free settlement notes that
  only the lead supplier marks open or completed.
- Defined the complete campaign lifecycle separately from suspension,
  amendments, proposed failure, and overdue conditions.
- Added supplier representatives, organization-owned actions, conflict rules,
  supplier attestations, and operational responsibility boundaries.
- Prepared generic multi-approval authorization while retaining immediate
  single-person approval in v1.
- Formalized pledge lifecycle, backing-budget transfer, attestation snapshots,
  and exceptional duplicate-organization merges.
- Detailed amendment duration, changing consent, supplier confirmation,
  provisional reservations, deadline interaction, and clarification challenges.
- Finalized public criterion-based objections, full review before contested
  voting, rejection reasons, resubmission, withdrawal, and moderation rules.
- Defined authoritative campaign timezones, exclusive local deadlines,
  calendar-day windows, timer pauses, outage correction, and reminder policy.
- Adopted verified-organization trust for v1 commitments while preparing an
  optional external-contract requirement for later municipal expenditure.
- Separated legal identity verification from deployment-level platform
  participation and explicitly rejected supplier-quality certification.
- Defined an organization-attributed public record while keeping personal
  actors, budgets, verification evidence, enrollment review, settlement-note
  completion, and security data private.
- Separated reversible content moderation from campaign governance and defined
  reasoned reporting, notices, public tombstones, appeals, and escalation.
- Designed optional provider-neutral AI moderation for warnings, triage, and
  temporary quarantine without final enforcement or campaign authority.
- Replaced multi-tenancy and community sites with one canonical Bloei.me network,
  object-scoped governance, and separate self-hosted deployments.
- Added canonical hierarchical open-source components, versioned stewardship,
  formal campaign targets, private supplier formation, and optional non-isolating
  programs.
- Replaced jOOQ with the Exposed JDBC SQL DSL while retaining Flyway as the
  migration authority and repository boundaries as an escape path.
- Replaced the blanket v1 integration deferral with a complete
  non-administrative REST API, provider-neutral repository links, read-only
  public GitHub observations, and cursor event feeds. The former MCP deferral
  is superseded by the early read/write automation decision.
