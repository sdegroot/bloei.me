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
- **Status:** Accepted and clarified by D-060
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
- **Status:** Accepted and expanded by D-037 and D-060
- **Decision:** Configure one OIDC provider per deployment. Organizations have
  a global identity within that deployment and tenant-specific verification.
- **Why:** OIDC avoids building password authentication. A shared organization
  identity prevents duplicates, while tenant verification preserves local
  governance.
- **Consequences:** Hosted Bloei.me initially uses Authentik. Tenant-specific
  identity providers may be added later.

## D-006 — Separate organizational responsibilities with roles

- **Date:** 2026-08-01
- **Status:** Accepted and expanded by D-038
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
- **Status:** Superseded by D-035 for price and D-049 for supplier participation
- **Decision:** Each campaign names one verified supplier organization and one
  fixed net price in a single ISO currency.
- **Why:** One accountable delivery and invoicing party keeps settlement
  understandable. A fixed outcome lets funders evaluate the complete result.
- **Consequences:** The supplier bears overruns, keeps efficiency margin, and
  adds applicable tax on external invoices.

## D-011 — Treat pledges as serious public maximum commitments

- **Date:** 2026-08-01
- **Status:** Accepted; its fixed-price basis is superseded by D-035
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
- **Status:** Accepted and extended by D-036
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
- **Status:** Superseded by D-048
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
- **Status:** Accepted; its quorum-based voting details are superseded by D-041
- **Decision:** Pledging organizations review evidence. No objection causes
  automatic acceptance; an unresolved objection can trigger an organization
  vote with campaign-configured quorum and approval thresholds.
- **Why:** Funders are the customers of the shared outcome. An independent
  reviewer adds ceremony and raises questions about appointment and funding.
- **Consequences:** Objections must reference acceptance criteria. A failed
  vote returns the campaign to revision and creates no settlement.

## D-019 — Set review policy per campaign

- **Date:** 2026-08-01
- **Status:** Partially superseded by D-041; review duration and configurable
  approval remain accepted
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

## D-035 — Use a maximum price with a supplier-declared final price

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** A campaign publishes one immutable maximum net price rather
  than a fixed price or range. With the first delivery submission, the supplier
  declares and locks any final price from zero through that maximum.
- **Why:** Software delivery is not always predictable enough for an exact
  price. A ceiling gives organizations a firm worst case while letting the
  supplier voluntarily charge less. A range was rejected because it creates
  ambiguous start thresholds, actual-cost proof, and partially funded overrun
  rules.
- **Consequences:** A pledge cap is a percentage of the final price, while its
  budget reserves the same percentage of the maximum price. The first delivery
  submission releases the unused reservation. Bloei.me requires no itemized
  cost statement, and later evidence submissions cannot change the locked
  price.

## D-036 — Allow the supplier to start below full coverage

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Full coverage continues to start delivery automatically, but
  the supplier may irreversibly start at any lower coverage, including zero.
- **Why:** A supplier may choose to invest its own capacity, accept the funding
  risk, and let organizations join while delivery is already underway.
- **Consequences:** The start coverage and supplier exposure are public.
  Existing pledges lock immediately, later pledges lock when made, and the
  supplier absorbs every final-price share not covered by organization caps.
  If delivery has not started by the funding deadline, the campaign expires.

## D-037 — Use global organizations with tenant enrollments

- **Date:** 2026-08-01
- **Status:** Accepted and clarified by D-060
- **Decision:** Register an organization once per deployment and represent its
  relationship with each tenant through an independently governed enrollment.
- **Why:** Tenant-local copies fragment legal identity, memberships, budgets,
  and reporting when the same municipality joins several communities. Fully
  global access would remove tenant governance.
- **Consequences:** Tenant enrollment can be pending, verified, rejected, or
  suspended. Tenant administrators govern only that relationship; suspension
  in one tenant does not affect another.

## D-038 — Let organizations own memberships and roles

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Organization administrators assign organization-wide roles to
  members. Tenant administrators verify organizations, not individual staff.
- **Why:** Staffing and internal delegation belong to the organization and may
  change frequently. Requiring tenant approval for every employee adds little
  protection after the organization itself is verified.
- **Consequences:** Pledges and ballots belong to the organization rather than
  the acting person. Budget authorization remains an additional requirement.
  The creator is the provisional first administrator; platform operators
  provide audited recovery for disputed ownership or when no administrator
  remains.

## D-039 — Handle verification loss according to commitment state

- **Date:** 2026-08-01
- **Status:** Accepted and clarified by D-060
- **Decision:** Before delivery starts, suspension deactivates an organization's
  pledge and releases its reservation. After start, the commitment survives and
  the organization retains only the actions required to administer it.
- **Why:** Unverified organizations should not create new commitments, but a
  supplier may already have relied on a locked pledge.
- **Consequences:** Restoration before start requires a new pledge. During
  delivery, review, voting, representative replacement, and reservation
  transfer remain available, while endorsement, new pledges, and cap increases
  are blocked. Verification has no automatic expiry.

## D-040 — Allow explicitly scoped cross-tenant budgets

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Organization budgets may fund campaigns across several tenants
  selected in an explicit allowlist.
- **Why:** One innovation envelope should prevent total overcommitment across
  communities without making every cost center universally spendable.
- **Consequences:** Adding a tenant enables future reservations. Removing one
  prevents new reservations but preserves existing commitments and history.

## D-041 — Use negative consent for disputed acceptance

- **Date:** 2026-08-01
- **Status:** Accepted and expanded by D-057; supersedes the quorum rules in
  D-018 and D-019
- **Decision:** A maintained objection opens a fresh acceptance window equal to
  the campaign review period. Silence is deemed acceptance, there is no quorum,
  and the configurable approval threshold defaults to two-thirds.
- **Why:** Ordinary delivery already accepts after silence. A quorum would let
  inactive organizations block settlement after an objection even though their
  nonparticipation normally means consent.
- **Consequences:** The objector begins as rejecting. Positions can change and
  remain hidden until closing. The final public record distinguishes explicit
  acceptance, deemed acceptance, and rejection. Only unanimous explicit
  acceptance closes early; a failed threshold returns delivery to revision.

## D-042 — Require recorded notice for deemed acceptance

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Send in-app and email notices plus reminders to funding
  representatives and organization administrators before silence counts as
  acceptance.
- **Why:** Negative consent is only fair when organizations receive clear and
  repeated notice of the deadline and consequence.
- **Consequences:** Bloei.me records delivery attempts. An email bounce does not
  stop the deadline; organizations are responsible for maintaining contacts.

## D-043 — Distinguish cancellation, suspension, and failure

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Responsible owners may cancel before delivery starts. After
  start, the supplier may concede public failure, while tenant-forced failure
  requires seven days' notice unless an emergency operator override applies.
- **Why:** A supplier may already have relied on locked commitments and started
  work, so post-start termination must remain visible and accountable.
- **Consequences:** Proposed failure pauses new financial actions and acceptance
  timers. There is no automatic limit on revision attempts. Every failure
  releases reservations and creates no settlement.

## D-044 — Pause campaigns when supplier verification is lost

- **Date:** 2026-08-01
- **Status:** Accepted and expanded by D-049 and D-060
- **Decision:** Supplier suspension blocks pledging, delivery, review, voting,
  and settlement while preserving existing commitments.
- **Why:** Bloei.me must not settle with an unverified supplier, but immediate
  failure may be disproportionate when verification can be restored.
- **Consequences:** Active timers pause and later resume with their remaining
  duration. Original campaign deadlines do not move. The tenant administrator
  may restore the supplier or use the public failure process.

## D-045 — Represent self-funding and supplier shortfalls explicitly

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Delivery with no pledgers completes as self-funded without
  review or settlement. Partial funding uses a public supplier-contribution
  settlement line.
- **Why:** No funder exists to review a zero-pledger campaign, while every
  published final price should still reconcile transparently when pledges cover
  only part of it.
- **Consequences:** Supplier-contribution lines are never invoiced. Organization
  settlement lines plus supplier contribution equal the final price.

## D-046 — Keep external invoice administration deliberately small

- **Date:** 2026-08-01
- **Status:** Superseded by D-055
- **Decision:** Track `not invoiced`, `invoiced`, `disputed`, `paid`, and
  `closed unpaid` privately, with an optional note and external reference.
- **Why:** Suppliers need basic operational visibility without turning Bloei.me
  into accounts-receivable or dispute-resolution software.
- **Consequences:** There are no partial payments, reminders, credits, or
  collection workflows. `Paid` and `closed unpaid` are terminal except for an
  audited operator correction. Invoice status never changes settlement or
  consumed budget.

## D-047 — Preserve organizational history while minimizing personal data

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Snapshot legal identity for pledges and settlements, anonymize
  people after account deletion, and allow only exceptional operator redaction
  with a public tombstone.
- **Why:** Public funding history must remain auditable, while personal data and
  sensitive material should not be retained or exposed unnecessarily.
- **Consequences:** Renames and audited merges link historical snapshots to the
  current canonical organization. Redaction never silently erases the existence
  of a published record.

## D-048 — Require unanimous explicit consent for material amendments

- **Date:** 2026-08-01
- **Status:** Accepted; supersedes D-015
- **Decision:** Protect material campaign terms after the first pledge, but
  permit an amendment before the first delivery submission when every existing
  funding organization explicitly consents and every affected budget remains
  eligible. Silence means no consent.
- **Why:** Scope, cost, dates, and delivery assumptions can genuinely change
  during open-source work. Automatically cancelling every commitment is
  unnecessarily disruptive, while negative consent is inappropriate when an
  organization is being asked to accept a different obligation.
- **Consequences:** Amendments show the before-and-after terms and rationale,
  pause new pledges and cap increases, revalidate dates, and atomically reserve
  any increased exposure. Accepted pledges carry to the new version only with
  recorded consent. If one organization rejects, does not respond, or cannot
  reserve the additional exposure, the original terms remain binding. Mere
  clarifications need no consent; optional additions use linked campaigns; an
  ordinary cost overrun remains the supplier team's risk.

## D-049 — Use one lead supplier with optional co-suppliers

- **Date:** 2026-08-01
- **Status:** Accepted; supersedes the one-supplier part of D-010 and expands
  D-044; its invoice-administration consequences are superseded by D-055
- **Decision:** Every campaign has exactly one verified lead supplier and may
  name verified co-suppliers. The lead supplier administers the campaign and
  submits one combined delivery. Bloei.me does not specify which supplier does
  which work or allocate price, settlement, or invoices among them.
- **Why:** Several organizations may collaborate on one outcome, but their
  internal division of work and invoicing is a commercial arrangement rather
  than part of funder governance. One lead keeps responsibility and platform
  permissions unambiguous.
- **Consequences:** Co-suppliers confirm public participation before campaign
  publication. Supplier-team changes after a pledge are material amendments.
  Loss of verification by any supplier pauses the campaign. The team may use
  one invoice or several external invoices, but Bloei.me records only each
  funder's aggregate settlement obligation. The lead records `not invoiced`,
  `partially invoiced`, `fully invoiced`, `disputed`, `paid`, or
  `closed unpaid` with external references, without supplier-level amounts.
  Combined invoices must not exceed the obligation, and supplier disputes are
  resolved outside Bloei.me.

## D-050 — Model campaign lifecycle separately from temporary conditions

- **Date:** 2026-08-01
- **Status:** Accepted and expanded by D-058
- **Decision:** Use explicit primary campaign states from draft through funding,
  delivery, review, settlement, and terminal outcomes. Represent amendments,
  suspension, proposed failure, and overdue delivery as orthogonal conditions.
- **Why:** Combining every hold and warning with every lifecycle phase would
  create an unmanageable state explosion and ambiguous restoration behavior.
- **Consequences:** Published campaigns never return to draft. Settlement is
  atomic with acceptance. Missing the delivery date marks a campaign overdue
  rather than automatically failing it, and archival is presentation metadata.

## D-051 — Use organization-owned actions and narrowly scoped roles

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** People act with membership, role, budget, and approval checks,
  while pledges, consents, supplier participation, objections, and ballots
  belong to organizations. Add a supplier-representative role and reserve
  campaign administration for representatives assigned by the lead supplier.
- **Why:** Personnel change while organizational commitments must remain
  stable. Funding authority and delivery authority are distinct.
- **Consequences:** Revocation preserves completed actions but invalidates an
  incomplete approval. Co-suppliers confirm participation without administering
  campaigns. Supplier organizations cannot pledge to or vote on their own
  campaign, and conflicts are disclosed or excluded according to the action.

## D-052 — Define supplier responsibility as operational, not implied liability

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** The lead supplier coordinates and represents the supplier team
  inside Bloei.me. Every co-supplier confirms participation and the lead's
  platform authority. Bloei.me records supplier attestations but does not
  determine work division, revenue sharing, or joint legal liability.
- **Why:** Funders need one accountable platform interface, while legal and
  commercial relationships among suppliers may differ by campaign.
- **Consequences:** The lead submits the combined outcome and price and attests
  authority, licensing, evidence integrity, and responsible publication.
  Supplier-organization replacement requires an amendment; changing an
  individual representative does not. Internal supplier disputes stay external.

## D-053 — Prepare generic multi-approval authorization without building it

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** V1 uses one immediate authorized approval, while domain and
  persistence boundaries prepare versioned organization policies and distinct
  approval records for future four-eyes workflows.
- **Why:** Municipal organizations may require separation of duties, but making
  every pilot organization configure approvals would add premature complexity.
- **Consequences:** Future pending financial requests reserve budget privately
  and become effective only after all approvals. Policy snapshots, expiry,
  rejection, and authority loss are modelled without requiring v1 approval UI.

## D-054 — Keep one organization-owned pledge through a strict lifecycle

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** An organization has one effective pledge per campaign. It is
  editable before delivery, locked at start, allocated at first submission, and
  settled on acceptance. Backing budgets may move privately, but pledges cannot
  transfer to unrelated organizations.
- **Why:** Suppliers need dependable post-start commitments and the public needs
  an understandable organization position despite representative changes.
- **Consequences:** Late pledges lock immediately, authority and terms are
  snapshotted, and suspension follows commitment state. Duplicate organizations
  merged after start retain both frozen allocation positions but receive one
  combined canonical contribution so other funders are not recalculated.

## D-055 — Use minimal lead-completed settlement notes

- **Date:** 2026-08-01
- **Status:** Accepted; supersedes D-046 and the invoice-administration part of
  D-049
- **Decision:** After acceptance, create one settlement note per funding
  organization stating its final net campaign contribution without a payee.
  Only the lead supplier may change it between `open` and `completed`.
- **Why:** Bloei.me needs to communicate who contributes what, but supplier
  allocation, invoices, taxes, payments, and disputes belong to external
  processes. A detailed invoice tracker would blur that boundary.
- **Consequences:** Completion means the lead says the supplier team considers
  external handling complete; it is not bank proof. Status is private to the
  funder and supplier team, reopening requires a reason, and neither status
  changes settlement nor budget consumption. No supplier, invoice, or payment
  details are stored.

## D-056 — Govern amendments with one time-bounded unanimous process

- **Date:** 2026-08-01
- **Status:** Accepted; expands D-048
- **Decision:** Allow only one open amendment, with a 14-day default consent
  period configurable from 7–30 days. Supplier confirmations precede funder
  consent; positions may change until the final valid consent activates the
  amendment immediately.
- **Why:** A stable group, explicit deadline, and exact version prevent consent
  from becoming ambiguous while allowing genuine changes to proceed promptly.
- **Consequences:** Additional exposure reserves provisionally per consent.
  Amendments do not unilaterally pause campaign deadlines. Pre-start funders may
  withdraw entirely; locked funders cannot. Clarification challenges receive a
  non-conflicted ruling, and every activated version and consent remains public.

## D-057 — Use criterion-based public objections before negative-consent voting

- **Date:** 2026-08-01
- **Status:** Accepted; expands D-041
- **Decision:** Keep the complete review period open after an objection and
  allow formal voting only after it ends and the lead has responded to every
  open objection. Objections and explicit rejections are organization-owned,
  public, and criterion-based.
- **Why:** Every funder needs the full opportunity to inspect delivery, while
  objections must remain tied to the outcome that was actually promised. A
  structured vote resolves substantive disagreement without an independent
  technical judge.
- **Consequences:** Objector silence never withdraws an objection. A resubmission
  supersedes old objections and restarts review while preserving price and
  allocation. One vote decides the complete outcome; new explicit rejection
  requires a reason, silence is acceptance, and successful voting atomically
  settles. There is no partial acceptance, automatic supplier-response deadline,
  or reopening after acceptance. Moderation may remove harmful wording but not
  silently erase an organization position.

## D-058 — Use campaign-local calendar windows with authoritative UTC instants

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Store instants in UTC while every campaign uses one immutable
  IANA timezone for exact local deadlines and calendar-day interaction windows.
  Deadlines are exclusive and database time, not the browser or job execution
  time, decides whether an action succeeded.
- **Why:** Funders need understandable local dates, while transactions, daylight
  saving, concurrent expiry, and delayed workers require one deterministic
  authority.
- **Consequences:** Weekends and holidays receive no automatic adjustment.
  Holds pause amendment, review, and voting countdowns but not funding,
  delivery, or budget dates. Missing delivery marks overdue. Verified platform
  or deployment-wide OIDC outages permit a public audited correction to the
  later of lost duration and 24 hours after restoration; email or internal
  organization failures do not. This is the sole audited way to restore a
  campaign that expired during the outage and has had no later lifecycle action.
  Important windows receive in-app and email notices with non-duplicative
  reminders.

## D-059 — Start with trust-based commitments and prepare external contracts

- **Date:** 2026-08-01
- **Status:** Accepted working position pending specialist legal review
- **Decision:** V1 activates pledges from verified organizations through their
  authorized representatives without requiring a signed contract. Treat them
  as serious operational platform commitments while avoiding claims that
  verification, the pledge, or a payee-free settlement note proves legal or
  procurement compliance.
- **Why:** A trust-based pilot keeps the first workflow practical. Municipalities
  may later require formal expenditure agreements, but their form and parties
  depend on procurement, authority, supplier structure, and applicable law that
  the platform should not guess.
- **Consequences:** Verification confirms identity rather than spending
  authority or guaranteed payment. Organizations and suppliers arrange their
  legal basis externally. Bloei.me stores no contract in v1 and does not enforce
  contributions. The model prepares a future organization- or budget-level
  `external contract required` policy with protected, versioned evidence and an
  external signature service. [legal.md](legal.md) records risks, sources, and
  questions that require counsel before broader public-sector use.

## D-060 — Separate legal identity verification from tenant approval

- **Date:** 2026-08-01
- **Status:** Accepted; clarifies D-003, D-005, D-037, D-039, and D-044
- **Decision:** Verify an organization's legal identity and initial account
  control once per deployment. Let every tenant separately approve, reject,
  suspend, or restore participation without repeating or rewriting identity
  verification. Do not create a supplier-quality verification tier.
- **Why:** Legal identity, control of an account, and permission to join a
  community answer different questions. Separating them prevents duplicate
  evidence collection and avoids presenting participation as competence,
  procurement, credit, or payment endorsement.
- **Consequences:** Organization identity uses `provisional`, `verified`,
  `review required`, `closed`, and `merged`; tenant enrollment uses `pending`,
  `approved`, `rejected`, and `suspended`. Authoritative registries and an
  independent official channel support initial verification, with minimal
  protected evidence and event-driven re-review rather than automatic expiry.
  Appeals follow the level that made the decision. Suppliers need verified
  identity, approved enrollment, representative confirmation, and maintainer
  publication, but receive no “trusted supplier” badge. Future eHerkenning may
  strengthen Dutch account control without becoming a v1 dependency.
