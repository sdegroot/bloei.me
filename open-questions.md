# Bloei.me open questions

Status: Living register

Last updated: 2026-08-01

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

## Product and scope

### Q-001 — Are programs part of v1?

- **Decision horizon:** Pilot decision
- **Current inclination:** Keep the data model and routes compatible with
  programs, but launch without program administration unless the first pilot
  needs a curated cross-component collection.
- **Why it remains open:** Campaigns and component pages may provide enough
  discovery initially. Programs add editorial work and UI without adding a
  governance boundary.
- **Decision trigger:** Select the first pilot campaigns and test whether they
  can be found and explained without a curated collection.

### Q-002 — Who may create a new canonical component?

- **Decision horizon:** Launch blocker
- **Current inclination:** Any signed-in organization may propose a component;
  a platform operator verifies canonical identity before publication.
- **Why it remains open:** Open creation reduces operator work but increases
  duplicates, trademark confusion, and false upstream claims.
- **Decision trigger:** Design the component proposal, duplicate-check, and
  publication workflow.

### Q-003 — How is stewardship claimed, challenged, and transferred?

- **Decision horizon:** Launch blocker for official-upstream campaigns
- **Current inclination:** Require public evidence, notify existing stewards,
  preserve versioned history, and let a platform operator decide contested or
  abandoned claims with an appeal path.
- **Why it remains open:** Repositories, foundations, companies, and informal
  maintainer groups establish authority differently.
- **Decision trigger:** Specify acceptable evidence and the claim, response,
  expiry, transfer, and appeal interfaces.

### Q-004 — What happens when a component has no verified maintainer?

- **Decision horizon:** Pilot decision
- **Current inclination:** Permit clearly labelled independent extensions and
  forks; require operator review before presenting an outcome as official.
- **Why it remains open:** Blocking every campaign would strand unmaintained
  software, while silently treating a supplier as upstream would mislead
  funders.
- **Decision trigger:** First proposal concerning an unmaintained or
  community-governed component.

### Q-005 — How are equivalent or duplicate outcomes detected?

- **Decision horizon:** Evidence needed
- **Current inclination:** Maintainer judgement with operator override and an
  explicit relationship between related campaigns; no automatic text match.
- **Why it remains open:** Two campaigns may overlap without being substitutes,
  especially across releases or components.
- **Decision trigger:** Two supplier drafts or campaigns target materially
  overlapping outcomes.

### Q-006 — How are proposals closed, merged, archived, or reopened?

- **Decision horizon:** Pilot decision
- **Current inclination:** Preserve public history and use explicit outcomes
  such as `converted`, `duplicate`, `declined`, `withdrawn`, and `stale`.
- **Why it remains open:** The retention period, reopening authority, and effect
  on endorsements have not been chosen.
- **Decision trigger:** Design proposal lifecycle screens and notifications.

## Governance and operations

### Q-007 — What exact rules govern platform suspension and appeal?

- **Decision horizon:** Launch blocker
- **Current inclination:** Reasoned notice, proportionate reversible measures,
  a protected appeal, and a different operator reviewing the appeal where
  staffing permits.
- **Why it remains open:** The grounds, urgency levels, response periods, and
  authority for emergency action need an operational policy.
- **Decision trigger:** Draft the platform participation and acceptable-use
  terms.

### Q-008 — Who performs platform operations at launch?

- **Decision horizon:** Launch blocker
- **Current inclination:** Name accountable people for organization checks,
  component claims, moderation, appeals, incident response, and exceptional
  campaign operations; separate duties where practical.
- **Why it remains open:** The functional roles are designed, but staffing,
  service levels, absence cover, and escalation contacts are not assigned.
- **Decision trigger:** Confirm pilot ownership and support hours.

### Q-009 — Which moderation and appeal service levels apply?

- **Decision horizon:** Pilot decision
- **Current inclination:** Use severity-based targets, with prompt handling of
  illegal-content and personal-data reports and published expectations rather
  than unconditional guarantees.
- **Why it remains open:** Real report volume and operator capacity are unknown.
- **Decision trigger:** Write the moderation operations handbook.

### Q-010 — Which AI moderation features ship in v1?

- **Decision horizon:** Pilot decision
- **Current inclination:** Start with author warnings and moderator
  prioritization; enable temporary quarantine only after measured evaluation.
- **Why it remains open:** Provider choice, data-processing terms, Dutch and
  English evaluation sets, thresholds, costs, and human-review capacity remain
  unknown.
- **Decision trigger:** Complete an offline evaluation and privacy assessment.

### Q-011 — What is the final authority for a forced campaign failure?

- **Decision horizon:** Launch blocker
- **Current inclination:** Keep supplier proposal, maintainer recommendation,
  and platform exceptional action distinct, with recorded reasons and an
  appeal where the outcome is not already irreversible.
- **Why it remains open:** Cross-component campaigns can involve several
  maintainers with conflicting views, and failure releases financial
  reservations.
- **Decision trigger:** Specify the exceptional campaign-operations runbook.

## Finance, contracts, and public-sector use

### Q-012 — When does a pledge become legally binding, if at all?

- **Decision horizon:** Legal review
- **Current inclination:** Run the initial pilot on verified-organization trust,
  explicit confirmations, and complete audit records without claiming that
  Bloei.me itself forms or enforces the supplier contract.
- **Why it remains open:** The platform records an organization-to-campaign
  commitment but deliberately does not name a payee in its settlement note.
- **Decision trigger:** Legal review before public launch or any claim of
  enforceability.

### Q-013 — What external agreement supports municipal expenditure?

- **Decision horizon:** Legal review; deferred capability
- **Current inclination:** Later allow a campaign to require a versioned,
  externally signed agreement before a pledge activates.
- **Why it remains open:** The appropriate parties, signatures, procurement
  route, supplier-team structure, and precedence over campaign terms vary.
- **Decision trigger:** A pilot municipality requires contractual evidence for
  budget authorization.

### Q-014 — How is procurement responsibility explained and evidenced?

- **Decision horizon:** Legal review
- **Current inclination:** Bloei.me provides transparent coordination records
  and selection rationale but does not represent supplier selection as a public
  procurement procedure.
- **Why it remains open:** Aggregation, joint commissioning, subsidy, conflict,
  and tender obligations depend on the participating bodies and campaign.
- **Decision trigger:** Legal review of the first public-sector campaign.

### Q-015 — Which exact records and retention periods apply?

- **Decision horizon:** Launch blocker and legal review
- **Current inclination:** Define separate schedules for public campaign
  history, organization identity snapshots, protected verification evidence,
  moderation cases, security logs, and future agreements.
- **Why it remains open:** Audit value, privacy minimization, limitation
  periods, procurement records, and self-hosted responsibilities differ.
- **Decision trigger:** Complete the record inventory and privacy schedule.

### Q-016 — What are the controller and processor roles?

- **Decision horizon:** Legal review
- **Current inclination:** Assess each processing purpose separately for hosted
  Bloei.me and document self-hosted operator responsibilities rather than using
  one blanket label.
- **Why it remains open:** Identity verification, public commitments,
  moderation, AI assistance, and hosting can involve different roles.
- **Decision trigger:** Select hosting and AI providers and draft privacy terms.

### Q-017 — What tax and invoicing guidance may Bloei.me display?

- **Decision horizon:** Pilot decision and legal review
- **Current inclination:** State only that settlement and invoicing happen
  outside Bloei.me; avoid calculating VAT, naming a payee, or prescribing how
  suppliers divide invoices.
- **Why it remains open:** Funders may still need practical export fields and
  explanatory language without the platform giving incorrect tax advice.
- **Decision trigger:** Design the settlement-note export with pilot finance
  teams.

## Service and sustainability

### Q-018 — Who operates and governs the hosted network?

- **Decision horizon:** Launch blocker
- **Current inclination:** One named legal operator publishes terms, privacy
  information, decision authorities, incident contacts, and service
  expectations.
- **Why it remains open:** The product design defines the platform role but not
  the operating entity or its long-term governance.
- **Decision trigger:** Establish the hosted pilot.

### Q-019 — How is Bloei.me itself funded after the pilot?

- **Decision horizon:** Evidence needed
- **Current inclination:** Keep platform billing outside v1 and evaluate
  sponsorship, membership, hosted-service fees, or grants using pilot costs and
  demand.
- **Why it remains open:** A campaign percentage could misalign incentives;
  subscriptions or sponsorship may exclude smaller participants.
- **Decision trigger:** Measure operating cost and willingness to pay during the
  pilot.

### Q-020 — What service boundary separates funding from support?

- **Decision horizon:** Pilot decision
- **Current inclination:** Bloei.me supports its funding workflow and routes
  product support, vulnerability reports, and general feedback to systems owned
  by the relevant component maintainers.
- **Why it remains open:** The separate support/feedback workstream has not yet
  defined common hand-offs or service expectations.
- **Decision trigger:** Define the support and feedback product separately.

## Implementation choices

### Q-021 — What is the hosted identity configuration?

- **Decision horizon:** Launch blocker
- **Current inclination:** Use the central Authentik deployment through OIDC,
  with invitation and organization-membership flows implemented in Bloei.me.
- **Why it remains open:** Login methods, assurance levels, recovery, account
  linking, session policy, and administrator bootstrap still need configuration.
- **Decision trigger:** Create the authentication threat model and pilot realm.

### Q-022 — Which infrastructure services are used in v1?

- **Decision horizon:** Launch blocker
- **Current inclination:** PostgreSQL plus S3-compatible image evidence,
  transactional email, background jobs, and auditable event records, using
  existing organizational infrastructure where suitable.
- **Why it remains open:** Providers, regions, backups, retention, monitoring,
  and recovery objectives have not been selected.
- **Decision trigger:** Write the deployment design and data-processing
  inventory.

### Q-023 — Which external component-source integrations come first?

- **Decision horizon:** Deferred
- **Current inclination:** Store curated source links in v1; add repository and
  package-registry synchronization only after canonical identity and
  stewardship workflows are proven.
- **Why it remains open:** GitHub is common but not universal, and automated
  metadata can conflict with maintained Bloei.me records.
- **Decision trigger:** Pilot operators identify repetitive verification work.

### Q-024 — What does future split-budget pledging look like?

- **Decision horizon:** Deferred
- **Current inclination:** Keep the many-to-many allocation model, but expose
  exactly one budget selection per pledge in v1.
- **Why it remains open:** The allocation UI, amendment behavior, expiry rules,
  and internal approvals become substantially more complex.
- **Decision trigger:** A verified organization has a concrete need to fund one
  pledge from multiple envelopes.

### Q-025 — Do modules start as Gradle subprojects or packages?

- **Decision horizon:** Implementation gate — before application scaffolding
- **Current inclination:** Use one Gradle subproject per business module so
  compile-time dependencies reinforce Spring Modulith boundaries.
- **Why it remains open:** Separate builds improve enforcement but add initial
  configuration and can slow feedback if configured poorly.
- **Decision trigger:** Create a small foundation spike with two dependent
  modules and measure build and test ergonomics.

### Q-026 — Which identifier and public-slug strategy is used?

- **Decision horizon:** Implementation gate — before the first database
  migration
- **Current inclination:** Use opaque typed, time-sortable UUIDs internally and
  mutable human-readable slugs with redirect history publicly.
- **Why it remains open:** The exact UUID version, generator support, database
  locality, enumeration risk, and canonical URL behavior need validation.
- **Decision trigger:** Benchmark and test the identifier type with PostgreSQL
  and the selected Kotlin libraries.

### Q-027 — Which PostgreSQL baseline and migration layout are supported?

- **Decision horizon:** Implementation gate — before application scaffolding
- **Current inclination:** Select one supported PostgreSQL major version and use
  schema-per-module, forward-only Flyway migrations.
- **Why it remains open:** Hosted and self-hosted operational baselines and the
  effect of cross-schema constraints on module independence need agreement.
- **Decision trigger:** Choose the pilot deployment environment and run the
  first cross-module transaction spike.

### Q-028 — How are durable jobs and the outbox implemented?

- **Decision horizon:** Implementation gate — before notification or deadline
  work
- **Current inclination:** Use small PostgreSQL-backed job and outbox tables with
  leased `SKIP LOCKED` workers unless a focused maintained library clearly fits
  the transaction and observability requirements.
- **Why it remains open:** An in-house implementation is transparent but adds
  retry, leasing, cleanup, and operational responsibility.
- **Decision trigger:** Compare candidate libraries against paused timers,
  idempotent deadline evaluation, and same-transaction outbox writes.

### Q-029 — How are browser sessions stored and privileged sessions limited?

- **Decision horizon:** Implementation gate — before OIDC integration
- **Current inclination:** Use server-side PostgreSQL-backed sessions, secure
  same-site cookies, session rotation, and a shorter inactivity limit for
  operator work.
- **Why it remains open:** The Authentik logout model, horizontal scaling,
  recovery flows, remember-me behavior, and practical timeout lengths need a
  threat model.
- **Decision trigger:** Complete the authentication and account-takeover threat
  model for Q-021.

### Q-030 — Which authoring format and sanitizer policy are used?

- **Decision horizon:** Implementation gate — before user-authored descriptions
  and comments
- **Current inclination:** Store a constrained source format and render through
  a strict, versioned allowlist; avoid unrestricted HTML and embedded media.
- **Why it remains open:** Markdown is portable but still needs sanitization,
  while a structured editor can improve accessibility at greater complexity.
- **Decision trigger:** Prototype campaign scope, acceptance criteria, comments,
  and moderation redaction in Dutch and English.

### Q-031 — What limits and tools govern evidence images?

- **Decision horizon:** Implementation gate — before delivery evidence
- **Current inclination:** Enforce conservative byte and dimension limits,
  decode and re-encode JPEG, PNG, and WebP, strip metadata, and reject animated
  or malformed content.
- **Why it remains open:** The image library, decompression-bomb protection,
  animation policy, malware scanning, and accessible description requirements
  need testing.
- **Decision trigger:** Build an adversarial image-validation spike and agree
  pilot evidence needs.

### Q-032 — Which object-storage adapters and serving model are used?

- **Decision horizon:** Implementation gate — before delivery evidence
- **Current inclination:** Use an S3-compatible port with a local test adapter,
  private immutable objects, and authorization-aware delivery or short-lived
  signed URLs.
- **Why it remains open:** The pilot provider, region, encryption, versioning,
  recovery, CORS, and retention behavior depend on Q-022 and Q-015.
- **Decision trigger:** Select the pilot infrastructure and run backup/restore
  plus unauthorized-access tests.

### Q-033 — Which observability stack ships in v1?

- **Decision horizon:** Implementation gate — before pilot deployment
- **Current inclination:** Emit structured logs and Micrometer metrics from the
  start; include OpenTelemetry tracing only if the chosen operations stack will
  consume it.
- **Why it remains open:** One process may not justify a tracing backend, but
  job and notification correlation still benefits from trace-compatible IDs.
- **Decision trigger:** Choose the pilot operations and alerting environment.

### Q-034 — Which CI and software-supply-chain controls are required?

- **Decision horizon:** Implementation gate — before the first release
- **Current inclination:** Run formatting, module, unit, integration, migration,
  browser, and accessibility checks; scan dependencies and images; generate an
  SBOM; and sign release images.
- **Why it remains open:** The CI platform, dependency update automation,
  vulnerability policy, provenance format, signing identity, and release
  process are not selected.
- **Decision trigger:** Scaffold the build and define the first releasable OCI
  artifact.

## Resolved questions

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
