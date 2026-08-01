# Bloei.me decision register

Last updated: 2026-08-01

This register records accepted product and architecture decisions and why they
were made. Decisions are not silently rewritten when direction changes. A
future change should add a new entry and mark the affected decision as
superseded.

## D-001 — Use Bloei.me as the brand

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Use **Bloei.me** as the product name, with “Open-source
  co-funding” as its descriptor.
- **Why:** “Bloei” expresses shared growth and is broad enough to include code,
  documentation, accessibility, infrastructure, and community work. The owned
  domain is memorable and works as an invitation.
- **Consequences:** The visual identity should be civic and trustworthy rather
  than overly floral. Trademark registration is not part of the plan.

## D-002 — Keep the funding platform independent

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Bloei.me is a standalone application, not an extension of the
  current GitHub issue setup or support workflow.
- **Why:** Funding, issue organization, and support have different audiences,
  permissions, and lifecycles. Combining them made the initiative too complex.
- **Consequences:** GitHub organization and support are separate projects.
  Bloei.me contains no GitHub-specific core concepts.

## D-003 — Use a multi-tenant product model

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Tenants own branding, domains, projects, moderation, and
  verification. Projects own campaigns.
- **Why:** The first use is Epistola, but the platform should be reusable by
  other open-source communities and providers.
- **Consequences:** Tenant isolation is a core invariant. A single-project
  tenant may simplify its UI without changing the domain model.

## D-004 — Use one artifact for hosted and self-hosted deployments

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** The same application artifact supports hosted multi-tenancy,
  self-hosted multi-tenancy, and root-domain single-tenancy.
- **Why:** Separate editions would create behavioral drift and duplicate
  maintenance.
- **Consequences:** Tenant resolution supports subdomains, a path fallback,
  custom domains, and an explicit single-tenant mode.

## D-005 — Use deployment-level OIDC and global organizations

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Configure one OIDC provider per deployment. Organizations have
  a global identity within that deployment and tenant-specific verification.
- **Why:** OIDC avoids building password authentication. A shared organization
  identity prevents duplicates, while tenant verification preserves local
  governance.
- **Consequences:** Hosted Bloei.me initially uses Authentik. Tenant-specific
  identity providers may be added later.

## D-006 — Separate organizational responsibilities with roles

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Use distinct platform, tenant, project, moderation,
  organization-administration, budget-management, funding, and member roles.
- **Why:** Curating work, controlling budgets, and legally representing an
  organization are different responsibilities.
- **Consequences:** One person may hold several roles, but authorization checks
  use the narrow permission required by each operation.

## D-007 — Moderate ideas before publishing proposals

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Signed-in users submit ideas privately. Maintainers publish
  curated, outcome-focused proposals after moderation.
- **Why:** This keeps the public catalogue useful without preventing broad
  community input.
- **Consequences:** Idea submissions need a private moderation queue and are
  not public by default.

## D-008 — Keep endorsement advisory and organization-based

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** A verified organization may add one endorsement to a proposal.
  Endorsement is separate from pledging and does not automatically prioritize
  or create a campaign.
- **Why:** Interest and financial authority are different signals. One vote per
  organization avoids popularity being dominated by individual account count.
- **Consequences:** Project maintainers remain responsible for campaign
  curation.

## D-009 — Publish campaigns in v1 and prepare for later privacy

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Published campaign terms, progress, pledging organizations,
  evidence, and settlement are public in v1. Visibility remains explicit in
  the model.
- **Why:** Transparency helps organizations coordinate open-source investment.
  Later private procurement-like campaigns should not require a security-model
  rewrite.
- **Consequences:** Drafts, ideas, moderation, representatives, budgets, and
  invoice administration remain private. V1 only permits public publication.

## D-010 — Use one supplier and a fixed net campaign price

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Each campaign names one verified supplier organization and one
  fixed net price in a single ISO currency.
- **Why:** One accountable delivery and invoicing party keeps settlement
  understandable. A fixed outcome lets funders evaluate the complete result.
- **Consequences:** The supplier bears overruns, keeps efficiency margin, and
  adds applicable tax on external invoices.

## D-011 — Treat pledges as serious public maximum commitments

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** A pledge publicly declares the organization's maximum
  percentage of the fixed campaign price and may be relied upon to start work.
- **Why:** Organizations need a clear commitment without Bloei.me becoming a
  payment processor or contract platform.
- **Consequences:** Confirmation uses versioned terms and clearly explains
  locking. The organization and cap are public; the representative is private.

## D-012 — Use max-min fair water-filling allocation

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Split the target equally subject to each organization's maximum
  cap, repeatedly redistributing unused share.
- **Why:** This lets willing organizations cap their risk while giving every
  participant the fairest possible equal share.
- **Consequences:** Projected shares change as organizations join. No
  organization pays more than its displayed maximum.

## D-013 — Start immediately at full coverage

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** When aggregate caps reach 100%, delivery starts atomically
  without a reconfirmation step.
- **Why:** A second confirmation would weaken the original pledge and delay
  work after the supplier has obtained the requested coverage.
- **Consequences:** Pre-start pledges are editable and withdrawable. After
  start, caps cannot decrease or be withdrawn except through an audited
  operator exception.

## D-014 — Allow pledging throughout delivery

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** New organizations may join, and existing organizations may
  increase caps, until the first delivery submission.
- **Why:** Continuing participation lowers every funder's fair share and gives
  more organizations a way to support work already underway.
- **Consequences:** Projected shares and budget reservations recalculate after
  each change. Existing locked caps cannot decrease.

## D-015 — Freeze campaign terms after the first pledge

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Material campaign terms become immutable after the first
  pledge. A material change creates a new version and requires re-pledging.
- **Why:** An organization must know that the scope, price, dates, supplier,
  and acceptance rules it accepted will not change underneath its commitment.
- **Consequences:** Superseding a version releases its reservations and does
  not carry pledges forward automatically.

## D-016 — Require funding and ultimate-delivery deadlines

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Every campaign publishes a latest funding date and an ultimate
  delivery date.
- **Why:** Budget eligibility cannot be assessed against an open-ended delivery
  promise, and suppliers need enough time after funding to deliver.
- **Consequences:** The dates freeze after the first pledge. Missing the funding
  deadline expires an unfunded campaign; missing delivery marks it overdue.

## D-017 — Close pledging at the first delivery submission

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Submitting delivery evidence permanently closes pledging and
  freezes the allocation and voting organizations.
- **Why:** Review and settlement require a stable amount and a stable set of
  funders. “Delivered” is the natural end of the pledge window.
- **Consequences:** Corrections and resubmissions do not reopen pledging or
  alter the frozen allocation.

## D-018 — Let pledgers review delivery

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Pledging organizations review evidence. No objection causes
  automatic acceptance; an unresolved objection can trigger an organization
  vote with campaign-configured quorum and approval thresholds.
- **Why:** Funders are the customers of the shared outcome. An independent
  reviewer adds ceremony and raises questions about appointment and funding.
- **Consequences:** Objections must reference acceptance criteria. A failed
  vote returns the campaign to revision and creates no settlement.

## D-019 — Set review policy per campaign

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Campaigns configure a 7–30 day review period and organization-
  based quorum and approval thresholds from 50% to 100%. Defaults are 14 days
  and two-thirds for both thresholds.
- **Why:** Higher-risk or more expensive outcomes may require stronger
  acceptance than routine work.
- **Consequences:** These settings are public campaign terms and freeze after
  the first pledge. Each funding organization has one vote.

## D-020 — Settle and invoice only after acceptance

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Accepted delivery creates the settlement. The supplier invoices
  externally afterward.
- **Why:** Advance or milestone invoicing conflicts with the fixed-outcome
  promise that failed delivery creates no invoice.
- **Consequences:** Bloei.me does not collect money, calculate tax, or generate
  invoices. It exports settlement data and privately tracks invoice status.

## D-021 — Publish unsuccessful outcomes without settlement

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** An unsuccessful delivery creates no settlement or invoice, but
  its outcome, evidence, and produced open-source work remain visible.
- **Why:** Funders should not pay for an outcome that did not meet its criteria,
  while transparency preserves learning and the value of work already done.
- **Consequences:** Failure releases remaining budget reservations.

## D-022 — Require a budget for every pledge

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Every pledge reserves its complete maximum monetary exposure
  from an organization budget.
- **Why:** Municipalities and other organizations need to reserve periodic
  innovation funding and prevent aggregate overcommitment.
- **Consequences:** A pledge without an eligible budget cannot become active.
  Authorized users can create a budget inside the pledge flow.

## D-023 — Put cost centers on budgets

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** An organization may have several budgets. Each budget owns its
  cost-center data; a pledge does not duplicate it.
- **Why:** Cost center is an attribute of the funding envelope and should remain
  consistent across its commitments.
- **Consequences:** Moving a reservation changes its private budget allocation
  without changing the public pledge.

## D-024 — Keep budgets organization-private

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Budget totals, balances, cost centers, and allocation details
  are visible only to authorized members of the organization.
- **Why:** These values are internal financial planning data. Public pledges
  provide sufficient campaign transparency.
- **Consequences:** Public campaign pages never expose budget identifiers or
  balances.

## D-025 — Enforce budget capacity transactionally

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Reserve the pledge's maximum exposure in the same transaction
  that creates or increases the pledge.
- **Why:** Reserving only the projected share could overcommit a budget when
  campaign participation changes. Transactionality prevents concurrent
  overspending.
- **Consequences:** Budget availability is a hard constraint, not a warning.
  Pre-start reductions release reservations; settlement consumes them.

## D-026 — Align budget expiry with campaign delivery

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** A budget is eligible only if its expiry covers the campaign's
  ultimate delivery date, review period, and a per-budget processing buffer
  defaulting to 14 days.
- **Why:** The budget must remain usable long enough to review delivery and
  process the resulting invoice without requiring advance invoicing.
- **Consequences:** Overdue delivery generates warnings and permits an audited
  reservation transfer. Expiry never silently withdraws a locked pledge.

## D-027 — Add a dedicated budget-manager role

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Budget managers create and amend budgets and authorize funding
  representatives to use them. Organization administrators retain the same
  powers.
- **Why:** Financial-envelope administration and campaign pledging can require
  different people and controls.
- **Consequences:** Inline budget creation is available only when the acting
  user has budget-management permission.

## D-028 — Prepare for multiple budgets per pledge

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Model pledge funding through a many-to-many allocation entity,
  but enforce exactly one complete budget allocation per pledge in v1.
- **Why:** A later requirement may split a single commitment across cost
  centers. Preparing the schema now avoids a difficult pledge migration without
  adding premature user-interface complexity.
- **Consequences:** Each allocation independently records reserved and consumed
  amounts. A later release can relax the one-allocation validation.

## D-029 — Limit delivery evidence in v1

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Evidence supports sanitized text, external links, and raster
  images only.
- **Why:** These formats cover the initial proof requirement while avoiding the
  security, retention, and rendering burden of arbitrary documents.
- **Consequences:** Image uploads are decoded, re-encoded, metadata-stripped,
  and stored in S3-compatible storage. SVG and non-images are rejected.

## D-030 — Use a Kotlin/Spring modular monolith

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Use Kotlin/JVM 25, Spring Boot 4, Spring Modulith, PostgreSQL,
  jOOQ, Flyway, Spring MVC, Thymeleaf, and HTMX.
- **Why:** This aligns with existing operational knowledge and produces one
  simple deployment artifact without requiring a separate SPA or distributed
  services.
- **Consequences:** Module boundaries and tests must preserve separation inside
  the monolith.

## D-031 — Keep integrations behind internal ports

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Define internal ports for progress, verification,
  notifications, storage, settlement export, and accounting, but expose no
  public API, webhooks, or connector installation in v1.
- **Why:** The standalone workflow should prove itself before integration
  contracts are stabilized.
- **Consequences:** Core concepts remain integration-neutral and contain no
  GitHub-specific fields.

## D-032 — Support Dutch and English accessibly

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Ship Dutch and English interfaces and target WCAG 2.2 AA.
- **Why:** The first audience includes Dutch municipalities, while open-source
  participation is international and the public platform must be broadly
  usable.
- **Consequences:** Interface text uses message bundles. Tenant-authored content
  declares a primary language but does not require duplicate translations.

## D-033 — License Bloei.me under EUPL-1.2

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Release Bloei.me under EUPL-1.2.
- **Why:** It matches existing Epistola projects and is suitable for a European,
  public-sector-friendly open-source platform.
- **Consequences:** Repository and distribution artifacts must carry the
  appropriate license and notices.

## D-034 — Exclude platform billing from v1

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Do not charge tenant subscriptions or campaign fees inside the
  first release.
- **Why:** The co-funding workflow should be validated before adding a second
  commercial and payment domain.
- **Consequences:** Hosted service agreements, if any, are administered outside
  Bloei.me.
