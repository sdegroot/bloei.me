# Bloei.me decision register

Last updated: 2026-08-21

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
- **Status:** Superseded by D-064
- **Decision:** Tenants own branding, domains, projects, moderation, and
  verification. Projects own campaigns.
- **Why:** The first use is Epistola, but the platform should be reusable by
  other open-source communities and providers.
- **Consequences:** Tenant isolation is a core invariant. A single-project
  tenant may simplify its UI without changing the domain model.

## D-004 — Use one artifact for hosted and self-hosted deployments

- **Date:** 2026-08-01
- **Status:** Accepted; tenant-routing consequences superseded by D-064
- **Decision:** The same application artifact supports hosted multi-tenancy,
  self-hosted multi-tenancy, and root-domain single-tenancy.
- **Why:** Separate editions would create behavioral drift and duplicate
  maintenance.
- **Consequences:** Tenant resolution supports subdomains, a path fallback,
  custom domains, and an explicit single-tenant mode.

## D-005 — Use deployment-level OIDC and global organizations

- **Date:** 2026-08-01
- **Status:** Partially accepted; tenant-specific consequences superseded by
  D-064
- **Decision:** Configure one OIDC provider per deployment. Organizations have
  a global identity within that deployment and tenant-specific verification.
- **Why:** OIDC avoids building password authentication. A shared organization
  identity prevents duplicates, while tenant verification preserves local
  governance.
- **Consequences:** Hosted Bloei.me initially uses Authentik. Tenant-specific
  identity providers may be added later.

## D-006 — Separate organizational responsibilities with roles

- **Date:** 2026-08-01
- **Status:** Accepted and expanded by D-038; tenant and project role scopes
  replaced by D-064 and D-066
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
- **Consequences:** Component maintainers remain responsible for campaign
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
- **Consequences:** Drafts, ideas, protected moderation case data,
  representatives, budgets, and invoice administration remain private. Public
  moderation effects may leave a tombstone. V1 only permits public publication.

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
- **Status:** Accepted; image-format and storage details superseded by D-080
  and D-082
- **Decision:** Evidence supports sanitized text, external links, and raster
  images only.
- **Why:** These formats cover the initial proof requirement while avoiding the
  security, retention, and rendering burden of arbitrary documents.
- **Consequences:** Image uploads follow the bounded sanitation pipeline in
  D-082 and use the storage model in D-080. SVG and non-images are rejected.

## D-030 — Use a Kotlin/Spring modular monolith

- **Date:** 2026-08-01
- **Status:** Accepted; SQL-access choice superseded by D-068
- **Decision:** Use Kotlin/JVM 25, Spring Boot 4, Spring Modulith, PostgreSQL,
  Flyway, Spring MVC, Thymeleaf, and HTMX. The original SQL-access choice was
  jOOQ.
- **Why:** This aligns with existing operational knowledge and produces one
  simple deployment artifact without requiring a separate SPA or distributed
  services.
- **Consequences:** Module boundaries and tests must preserve separation inside
  the monolith.

## D-031 — Keep integrations behind internal ports

- **Date:** 2026-08-01
- **Status:** Superseded by D-069, D-070, and D-071
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
- **Consequences:** Interface text uses message bundles. User-authored content
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
- **Decision:** Do not charge hosted subscriptions or campaign fees inside the
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
- **Status:** Superseded by D-064
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
- **Status:** Accepted and clarified by D-064
- **Decision:** Organization administrators assign organization-wide roles to
  members. Platform operators verify legal identity but do not approve
  individual staff; component and program roles remain separately scoped.
- **Why:** Staffing and internal delegation belong to the organization and may
  change frequently. Requiring platform approval for every employee adds little
  protection after the organization itself is verified.
- **Consequences:** Pledges and ballots belong to the organization rather than
  the acting person. Budget authorization remains an additional requirement.
  The creator is the provisional first administrator; platform operators
  provide audited recovery for disputed ownership or when no administrator
  remains.

## D-039 — Handle verification loss according to commitment state

- **Date:** 2026-08-01
- **Status:** Accepted with platform participation replacing tenant enrollment
  under D-064
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
- **Status:** Superseded by D-064 and D-065
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
  start, the supplier may concede public failure, while maintainer- or operator-
  initiated forced failure requires seven days' notice unless an emergency
  operator override applies.
- **Why:** A supplier may already have relied on locked commitments and started
  work, so post-start termination must remain visible and accountable.
- **Consequences:** Proposed failure pauses new financial actions and acceptance
  timers. There is no automatic limit on revision attempts. Every failure
  releases reservations and creates no settlement.

## D-044 — Pause campaigns when supplier verification is lost

- **Date:** 2026-08-01
- **Status:** Accepted and expanded by D-049; tenant-specific consequences
  superseded by D-064
- **Decision:** Supplier suspension blocks pledging, delivery, review, voting,
  and settlement while preserving existing commitments.
- **Why:** Bloei.me must not settle with an unverified supplier, but immediate
  failure may be disproportionate when verification can be restored.
- **Consequences:** Active timers pause and later resume with their remaining
  duration. Original campaign deadlines do not move. A platform operator may
  restore participation; an in-scope component maintainer or operator may use
  the public failure process.

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
- **Status:** Superseded by D-064 for participation; identity/account-control
  separation remains accepted
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

## D-061 — Make organizations public and operational data private

- **Date:** 2026-08-01
- **Status:** Accepted and clarified by D-064
- **Decision:** Attribute public campaign, financial, supplier, objection, and
  governance actions to organizations rather than their acting employees.
  Publish the minimum organization and campaign information needed for an
  auditable co-funding record while keeping personal actors, budgets, settlement
  completion, participation review, verification evidence, and security data
  restricted.
- **Why:** Funders and the public need to see who committed what and how a
  campaign was governed. Publishing employee identities or internal financial
  and verification records adds privacy and security risk without improving
  organization-level accountability.
- **Consequences:** Public profiles show minimal legal identity, factual
  verification metadata, and platform participation. Pledges, amounts,
  amendments, objections, final ballots, delivery, and settlement lines are
  public at organization level. Detailed participation-review and suspension
  reasons stay private; a suspension's factual public effect may be shown when
  relevant. Settlement-note completion is shared only with the funder and
  supplier team. Internal actor attribution remains in protected audit history,
  account deletion anonymizes the person rather than erasing the organization
  action, and every future public API or export must use the same explicit public
  projection as the website.

## D-062 — Separate content moderation from campaign governance

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Give moderators reversible control over content visibility but
  no authority to alter organization-owned positions or campaign state. Use
  reasoned reports, restrictions, notices, public tombstones, and appeals;
  escalate identity, participation, and campaign consequences to their existing
  governance processes.
- **Why:** Harmful or illegal content must be addressable without allowing a
  content decision to settle a funding, scope, delivery, or acceptance dispute.
  Recorded reasons and review protect both the reporter and affected author from
  arbitrary action.
- **Consequences:** V1 includes ordinary and illegal-content reporting, a basic
  queue, reversible moderation overlays, emergency hiding, protected originals,
  author and reporter notices, a basic appeal, and complete audit history. An
  objection whose explanation is redacted retains its organization, criterion,
  and position. Personal restrictions do not erase organization actions, and
  campaign consequences use cancellation, suspension, identity review, or
  forced-failure governance. Advanced case operations and external dispute
  resolution may follow later.

## D-063 — Use AI as an optional moderation assistant

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Put an optional provider-neutral AI classifier between
  deterministic safety checks and deterministic moderation policy. Let it warn,
  classify, prioritize, summarize, and temporarily quarantine for human review,
  but never make final sanctions or campaign and organization decisions.
- **Why:** AI can reduce moderator load and catch personal data, abuse, spam,
  and malicious content earlier, but model errors, bias, prompt injection, and
  outages must not gain governance authority or block Bloei.me operation.
- **Consequences:** Assessments use structured versioned output, minimal input,
  no domain tools, no hidden reasoning storage, human overrides, performance
  metrics, and audited temporary actions. Managed, local, alternative, and
  disabled configurations are supported. V1 may implement warnings, triage,
  prioritization, and reversible quarantine; final automated enforcement,
  custom training, cross-component detection, and advanced analytics are
  deferred.

## D-064 — Use one canonical Bloei.me network without communities

- **Date:** 2026-08-01
- **Status:** Accepted; supersedes D-003, D-037, and the tenant-specific parts of
  D-004, D-005, D-039, D-040, D-044, D-060, and D-061
- **Decision:** Operate hosted Bloei.me as one canonical co-funding network, not
  separate tenant or community sites. Keep organizations and components
  canonical within a deployment; scope authority directly to organizations,
  components, programs, campaigns, and moderation cases. A self-hosted instance
  is a separate deployment.
- **Why:** Funding benefits from one registration, budget view, public history,
  search surface, and cross-component network. Communities would add repeated
  enrollment, fragmented discovery, unclear authority, and a substantial
  isolation and routing model before a concrete independently governed or
  white-labelled operator needs it.
- **Consequences:** Remove tenant enrollment, tenant routing, custom tenant
  domains, tenant administrators, tenant isolation, and tenant budget allowlists.
  Identity verification remains distinct from one deployment-level platform
  participation status. Hosted routes live under `bloei.me`; optional vanity
  subdomains may redirect but create no boundary. Budgets may instead use an
  optional component scope. Platform and object-scoped roles govern workflows,
  and a future truly independent operator uses another deployment unless a real
  tenancy requirement is deliberately introduced.

## D-065 — Make open-source components canonical funding targets

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Model complete applications and smaller building blocks as
  deployment-canonical `OpenSourceComponent` records with optional hierarchy,
  lineage, supported releases, and versioned primary or co-maintainer
  stewardship. Proposals and campaigns target one or more components.
- **Why:** “Component” matches both complete products and Common Ground-style
  building blocks without duplicating a separate product concept. Canonical
  identity prevents conflicting names, sources, licences, stewardship, and
  campaign history while supporting genuine forks and cross-component work.
- **Consequences:** Every campaign target records its modified, integrated, or
  newly-created relationship; official, extension, or fork status; promised
  release; and any maintainer confirmation. Official upstream promises require
  the relevant maintainer. Stewardship proves an upstream relationship, not
  exclusive commercial rights, quality, or guaranteed delivery. Target or
  upstream-status changes after pledging are material amendments.

## D-066 — Curate supplier formation in one public network

- **Date:** 2026-08-01
- **Status:** Accepted; expands D-007, D-008, D-049, D-051, and D-052
- **Decision:** Let component maintainers curate proposals and campaign
  formation. Eligible suppliers may submit private drafts, and maintainers may
  select one, request revision, encourage a team, split distinct outcomes, or
  select none. A primary maintainer may lead directly without a mandatory
  competition. Optional programs curate public collections but create no
  identity, policy, budget, or security boundary.
- **Why:** A proposal captures demand before a supplier and price exist, while a
  campaign is a concrete supplier commitment. Private formation supports
  comparison and team-building without fragmenting public funding or turning
  Bloei.me into an automated tender marketplace. Programs provide thematic and
  cross-component discovery without recreating tenants.
- **Consequences:** No draft accepts pledges. One equivalent outcome cannot have
  silently competing active funding campaigns. Selection publishes a concise
  rationale while unsuccessful suppliers and drafts remain private. Lowest
  price is not mandatory, supplier affiliation is disclosed, upstream status is
  explicit, and rejected suppliers may challenge policy or conflict failures
  but have no right to publication. Before the first pledge a public campaign
  may be replaced with history; afterward ordinary amendment consent applies.

## D-067 — Provide isolated development authentication

- **Date:** 2026-08-01
- **Status:** Accepted
- **Decision:** Keep production authentication behind OIDC, but provide a
  separate development adapter that lets local developers and browser tests
  select seeded personas without an identity provider. Exclude the adapter from
  the production runtime classpath and OCI image rather than relying only on a
  disabled production property.
- **Why:** Requiring a running identity provider for every local UI or workflow
  test would slow development and make role, suspension, supplier-conflict, and
  continuity scenarios harder to reproduce. Sharing the authenticated-actor
  boundary preserves realistic application authorization.
- **Consequences:** Local pages show an unmistakable development banner, accept
  only predefined fixture identities, and create ordinary application sessions.
  CI still runs an OIDC contract journey, and an optional Compose profile may
  provide Authentik for production-like smoke testing. Production packaging is
  tested to prove the development endpoint and classes are absent.

## D-068 — Use the Exposed SQL DSL

- **Date:** 2026-08-01
- **Status:** Accepted; supersedes the jOOQ part of D-030
- **Decision:** Use the Exposed JDBC SQL DSL for persistence, without the
  Exposed DAO API. Keep Flyway as the only authority for production schema
  migrations.
- **Why:** Exposed provides a concise Kotlin-native persistence layer and lets
  each business module own its table definitions without a generated-source
  pipeline. Bloei.me is primarily a transactional domain-workflow application,
  so this simplicity is more valuable initially than jOOQ's broader advanced
  SQL surface and schema-generated types.
- **Consequences:** Exposed table and result types remain inside persistence
  adapters. Repository ports, domain values, Flyway migrations, and PostgreSQL
  tests prevent the domain from depending on the library and preserve a later
  migration path. Parameterized JDBC may handle exceptional queries that the
  DSL cannot express cleanly. Integration tests must detect drift between
  Flyway schemas and Exposed table declarations and verify locking,
  transactions, JSONB, and concurrent financial workflows.

## D-069 — Make REST a complete non-administrative product interface

- **Date:** 2026-08-02
- **Status:** Accepted; supersedes the no-public-API part of D-031; service-
  account and sequencing details superseded by D-084
- **Decision:** Publish a versioned `/api/v1` REST API. Allow anonymous reads of
  public records and delegated-user OAuth access to every organization,
  maintainer, supplier, funder, reporting, and appeal-submission workflow that
  the web interface supports. Keep platform verification, participation,
  moderation decisions, appeal handling, security diagnostics, and exceptional
  operator actions out of the public API.
- **Why:** External community sites, organizational systems, and future clients
  should be able to use Bloei.me without duplicating its domain rules. Full
  workflow parity creates a dependable interface rather than a growing set of
  integration-specific exceptions, while keeping the highest-risk platform
  administration on protected internal tooling.
- **Consequences:** Authentik issues audience-bound tokens using authorization
  code with PKCE to operator-registered clients. OAuth scopes constrain the
  client and current Bloei.me authorization is checked again for every command.
  Financial and governance commands require exact version attestations,
  optimistic preconditions, and idempotency keys. Public and authorized cursor
  event feeds support polling; outbound webhooks, service accounts, dynamic
  client registration, and public administration APIs are deferred.

## D-070 — Link provider-neutral repositories and observe public GitHub data

- **Date:** 2026-08-02
- **Status:** Accepted; resolves Q-023 and supersedes the no-GitHub-specific-
  fields part of D-031
- **Decision:** Model canonical provider-neutral code repositories separately
  from components. Let components link multiple repositories and let proposals,
  campaigns, progress, and delivery evidence reference external issues, pull
  requests, commits, and releases. Implement GitHub as the first read-only
  public-metadata provider with validation and periodic refresh.
- **Why:** Open-source funding needs a durable connection to the code and work
  it affects, but a GitHub-only domain model would exclude other forges and let
  external metadata conflict with maintained Bloei.me facts.
- **Consequences:** Provider observations never overwrite curated component
  data or change stewardship, campaign scope, delivery, review, or acceptance.
  GitHub validation uses fixed API hosts, stable external identifiers, cached
  allowlisted metadata, visible freshness, and resilient failure states. V1 has
  no GitHub App installation, private-repository access, inbound GitHub
  webhooks, issue synchronization, or GitHub write actions.

## D-071 — Defer MCP until the domain and REST contracts stabilize

- **Date:** 2026-08-02
- **Status:** Superseded by D-084; originally superseded the undifferentiated
  integration deferral in D-031
- **Decision:** Do not ship an MCP endpoint or SDK dependency in v1. Preserve
  application commands, audience-aware queries, typed schemas, and OAuth
  boundaries so a later remote MCP adapter can expose Bloei.me resources and
  tools without embedding an AI model or routing back through REST.
- **Why:** MCP is useful for agent discovery and action, but implementing it
  alongside the first public API would stabilize two external contracts at
  once. The REST and application-service boundaries should prove their names,
  permissions, and failure semantics first.
- **Consequences:** Future MCP uses Streamable HTTP, audience-bound OAuth, and
  the same application authorization and confirmation policy as every other
  adapter. No MCP client can gain platform-admin access or bypass organization
  roles. Adding MCP later requires its own accepted decision and threat model.

## D-072 — Start with two production Gradle projects

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-025
- **Decision:** Use `core` for feature packages, persistence, migrations, and
  durable workflows, and `app` for the Spring Boot runtime and server-rendered
  UI. Enforce feature boundaries with Spring Modulith rather than one Gradle
  project per capability. Add no empty REST, MCP, adapter, or foundation
  projects.
- **Why:** The feature-first boundary matters, but separate projects and fixed
  internal layers would add ceremony before the business slices exist.
- **Consequences:** Features expose types at their package root and add internal
  `persistence`, `workflow`, or `integration` packages only when needed. Future
  REST and MCP libraries may join the same application after their contracts
  are ready.

## D-073 — Use DBOS for durable workflows

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-028
- **Decision:** Use DBOS Transact with PostgreSQL for durable waits, retries,
  and workflow recovery. Keep concrete workflow definitions in their owning
  `core` feature and runtime configuration in `app`.
- **Why:** Business workflows belong near their policies, while DBOS provides
  tested persistence and recovery without maintaining a custom leasing and
  retry framework.
- **Consequences:** Workflows use deterministic identifiers and idempotent use
  cases. The business model remains authoritative. V1 runs one stable executor;
  active-active execution needs a separate decision. Add an outbox only when a
  real committed domain event must launch a workflow.

## D-074 — Fix the executable application foundation

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-027, Q-029, Q-033, and Q-034
- **Decision:** Baseline PostgreSQL 18, forward Flyway migrations,
  PostgreSQL-backed browser sessions, structured logs, Actuator and Prometheus,
  and GitHub Actions release gates. Use Authentik as the production OIDC
  provider while retaining the isolated local-persona artifact.
- **Why:** These choices make the scaffold executable, observable, testable,
  and production-shaped without selecting a tracing backend or release-signing
  identity prematurely.
- **Consequences:** CI covers formatting, Modulith boundaries, unit,
  PostgreSQL, DBOS recovery, OIDC, browser, accessibility, SBOM, OCI,
  vulnerability, secret, dependency, and CodeQL checks. OTLP, publishing,
  signing, and multi-replica execution remain deferred.

## D-075 — Fix pilot catalogue and proposal governance

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-001 through Q-006
- **Decision:** Defer programs beyond v1. Let verified organizations privately
  propose components while platform operators approve canonical publication.
  Operators adjudicate stewardship claims after a 14-day response period,
  publish only safe evidence references, protect sensitive evidence, and
  require annual and event-driven reconfirmation. Components without a verified
  steward may host clearly labelled independent extensions, forks,
  replacements, and unconfirmed campaigns, but no unsupported official claim.
  Duplicate detection uses deterministic cues and human reports; maintainers
  classify relationships with operator override. Proposals close through
  explicit retained outcomes and become stale after 12 inactive months plus 30
  days' notice. Maintainers approve reopening, and endorsements never transfer
  or reactivate automatically.
- **Why:** The pilot needs truthful canonical identity and durable public
  history without premature program administration, automated equivalence
  judgements, or implied upstream authority.
- **Consequences:** V1 has no program persistence, route, role, or management
  UI. Unresolved equivalent active campaigns cannot be published. Proposal
  outcomes are `converted`, `duplicate`, `declined`, `withdrawn`, and `stale`;
  reopening creates a new event and requires organizations to endorse the
  current version again.

## D-076 — Define pilot enforcement and moderation operations

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-007, Q-009, Q-010, and Q-011
- **Decision:** Platform restrictions use reasoned notice, the least
  restrictive proportionate measure, a 14-day ordinary response period, and a
  30-day appeal window without automatic stay. Emergency restrictions receive
  review within 48 hours. Moderation uses published critical, high, and
  standard service targets, and appeals go to a different reviewer within 14
  days where possible. AI is an advisory-only future extension for warnings,
  classification, summaries, and queue priority; it has no domain commands or
  enforcement authority and is not implemented in v1. After a proposed forced
  campaign failure and seven-day supplier response, a platform operator who is
  distinct from the proposer makes the terminal decision.
- **Why:** Reversible, separated authority protects participants while still
  allowing urgent safeguards. Human accountability is required before model
  quality, privacy, and language performance have been proven.
- **Consequences:** Public restriction status remains neutral while protected
  case data contains the detailed grounds. Critical reports target four-hour
  acknowledgement, eight-hour protection, and 48-hour review; high reports
  target one-business-day acknowledgement and three-business-day decision;
  standard reports target three-business-day acknowledgement and ten-business-
  day decision. Appeals target three-business-day acknowledgement and a 14-day
  decision, with one reasoned 14-day extension. Failure is irreversible once
  reservations have been released.

## D-077 — Fix the pilot commercial and support boundary

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-013, Q-017, and Q-020 and narrows Q-012 and
  Q-014
- **Decision:** Describe a pledge as a recorded organizational funding
  commitment without claiming that Bloei.me forms or determines an enforceable
  contract. V1 always uses `contract not required` and implements no agreement
  upload or signature workflow. Bloei.me publishes factual coordination and
  selection records but no procurement-compliance claim; each pledger confirms
  responsibility for its own approvals, procurement route, and legal review.
  Settlement displays currency and net amounts but does not calculate VAT, name
  a payee, allocate supplier invoices, or give tax advice. Bloei.me supports its
  own funding workflow and routes component bugs, product support, and security
  reports to maintainer-owned channels.
- **Why:** Neutral, auditable records support the trust-based pilot without
  turning product behavior into unsupported contract, procurement, tax, or
  maintainer-service claims.
- **Consequences:** Specialist review still determines final launch terms and
  legal effect. Future external-agreement support starts only from a concrete
  pilot requirement identifying parties, procurement route, signing system,
  precedence, and evidence. Bloei.me never proxies or promises a maintainer's
  response time.

## D-078 — Adopt a reviewable pilot data-governance schedule

- **Date:** 2026-08-20
- **Status:** Accepted working policy; narrows Q-015 and Q-016 pending legal
  review
- **Decision:** The hosted operator acts as controller for core platform
  purposes. Participating organizations act as independent controllers for
  their own purposes, and vendors are processors where they act only on
  instructions; do not assume blanket joint controllership. A self-hosted
  operator assumes the deployment-level controller responsibilities. Retain
  public history for the service lifetime subject to review, core campaign and
  financial audit records for seven years, organization identity decisions for
  active life plus five years, raw verification evidence for at most 90 days,
  membership and authority history for two years, moderation data by severity
  for six months, two years, or five years, raw security logs for 90 days and
  summaries for one year, and incidents for five years. Retain notification
  delivery diagnostics for 90 days, idempotency records for 24 hours, and
  rolling backups for 35 days.
- **Why:** Category-specific periods preserve public accountability and
  financial auditability while avoiding indefinite retention of identity,
  actor, moderation, and operational data.
- **Consequences:** Legal holds suspend deletion with a recorded scope and
  reason. Successful and rejected raw image uploads are deleted immediately
  after terminal processing; abandoned chunks expire after 24 hours. Public
  tombstones and sanitized accepted evidence follow their parent public record.
  Provider selection, lawful bases, data-subject handling, processor terms,
  and final periods remain launch legal-review items.

## D-079 — Bind OIDC identities without importing authorization

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-021
- **Decision:** Use one standards-compliant OIDC provider per deployment, with
  Authentik as the hosted reference provider. Identify an account only by the
  exact `(issuer, subject)` pair and never automatically link accounts by email.
  Bloei.me remains authoritative for organization memberships and roles.
  Recovery starts at the identity provider, with an audited local organization-
  control recovery path when that cannot restore access. Bootstrap the first
  platform operator once from an exact configured issuer and subject. Require
  MFA or recent step-up authentication for platform roles and high-impact
  organization actions.
- **Why:** OIDC delegates authentication without letting mutable claims silently
  confer local authority or join separate accounts.
- **Consequences:** Invitations bind only after authentication and explicit
  acceptance. Email changes do not change identity. Provider configuration,
  assurance claims, recovery, bootstrap, role changes, and step-up decisions
  are auditable; PostgreSQL-backed sessions follow D-074.

## D-080 — Keep the v1 runtime PostgreSQL-first

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-022 and Q-032
- **Decision:** Ship one OCI application with PostgreSQL, SMTP, and OIDC; add no
  required Redis, broker, search service, AI service, or object store. Store v1
  evidence bytes as PostgreSQL `bytea` behind an object-storage port. Every
  object has an application-generated opaque ID, SHA-256 checksum, and recorded
  storage backend. Use one configured write backend while allowing multiple
  read adapters during migrations. Serve stable `/media/{objectId}` URLs
  through authorization-aware application delivery. Future local-filesystem
  and S3-compatible adapters are required capabilities, but not v1 services.
  The hosted deployment keeps protected data in the EU/EEA, targets a one-hour
  RPO and eight-hour RTO, and may use managed services.
- **Why:** PostgreSQL makes media transactional and covered by the first backup
  design while the port and per-object backend preserve a safe migration path.
- **Consequences:** PostgreSQL backups include media. Quarantined bytes are
  never addressable; private objects require authorization; public immutable
  derivatives use correct MIME types, `nosniff`, and long-lived caching. Do not
  deduplicate across objects. A backend migration copies bytes, verifies the
  checksum, atomically switches the reference, observes a grace period, and
  only then deletes the old copy. A local-filesystem backend is suitable only
  for explicitly single-node/self-hosted storage, never an ephemeral or
  replicated deployment default. The reference deployment remains Compose;
  concrete providers and ownership are deployment configuration.

## D-081 — Use UUIDv7 identities and immutable publication slugs

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-026
- **Decision:** Generate RFC 9562 UUIDv7 values in the application and store
  them as native PostgreSQL `uuid`, wrapped by aggregate-specific Kotlin inline
  value classes. Use a small generator abstraction backed initially by
  `uuid-creator` 6.x. The embedded UUID time is not authoritative business
  time; stored timestamps and event sequence are. Organizations, components,
  proposals, campaigns, and any future programs receive a canonical public
  slug at first publication or launch. Slugs are lowercase ASCII kebab-case,
  at most 80 characters, unique within their resource type, and disambiguated
  deterministically with `-2`, `-3`, and subsequent suffixes. They are immutable
  in v1 and never reassigned.
- **Why:** Typed UUIDv7 identifiers give opaque, sortable database keys without
  coupling URLs to names. Immutable slugs avoid broken links and premature
  redirect-history machinery.
- **Consequences:** Clients treat IDs and slugs as opaque and follow canonical
  links. Slug editing may be introduced later only together with permanent
  redirect history; an old slug remains reserved forever.
- **References:** [RFC 9562](https://www.rfc-editor.org/info/rfc9562/),
  [uuid-creator](https://github.com/f4b6a3/uuid-creator), and
  [PostgreSQL UUID functions](https://www.postgresql.org/docs/current/functions-uuid.html).

## D-082 — Sanitize a narrow evidence-image profile

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-031 and supersedes the storage and format
  details of D-029
- **Decision:** Accept only static JPEG and PNG identified from successfully
  decoded bytes. Reject WebP, GIF, SVG, AVIF, APNG, multi-frame, malformed, and
  disguised input. Limit a revision to 20 images; each image to 15 MiB, 24
  megapixels, and 8192 pixels on either axis; require meaningful alt text.
  Process asynchronously with DBOS through `quarantined`, `processing`,
  `accepted`, or `rejected`, and block evidence submission while any referenced
  image is unfinished. Use Java ImageIO with a pinned TwelveMonkeys 3.14.x JPEG
  plugin, apply orientation, normalize to sRGB, remove metadata, re-encode in
  the same format, and create both a sanitized full-resolution master and a
  1600-pixel longest-edge preview. Provide an optional generic `ContentScanner`
  port with ClamAV as the first adapter; when scanning is enabled but
  unavailable, fail closed in quarantine.
- **Why:** A deliberately small decoded format set and bounded re-encoding
  pipeline reduce parser, metadata, decompression, and active-content risk while
  retaining useful visual delivery evidence.
- **Consequences:** Public pages use the preview with dimensions and lazy
  loading and may open the sanitized master. Raw successful or rejected uploads
  are deleted at terminal processing; abandoned upload chunks expire after 24
  hours. Malware scanning is optional and is not a hosted-v1 dependency. PDF
  uploads remain unsupported and require a separate validation, rendering, and
  content-disarm decision, though they may later reuse the scanning port.
- **References:** [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html),
  [Java Image I/O](https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/imageio/package-summary.html),
  and [TwelveMonkeys releases](https://github.com/haraldk/TwelveMonkeys/releases).

## D-083 — Store restricted Markdown behind a WYSIWYG editor

- **Date:** 2026-08-20
- **Status:** Accepted; resolves Q-030 and accepts ADR-0001
- **Decision:** Store versioned restricted Markdown as canonical authored
  content and provide a constrained browser WYSIWYG editor. The editor may use
  ProseMirror internally, but editor JSON and HTML are transient and untrusted.
  V1 supports paragraphs, H2 through H4, block quotes, ordered and unordered
  lists, strong and emphasis, inline and fenced code, safe links, hard breaks,
  and sanitized Bloei.me-managed images with mandatory alt text. Disable raw
  HTML, unknown extensions, external images, data URLs, and arbitrary paths.
  Parse and validate on the JVM, render semantic HTML and plain text, apply a
  final HTML allowlist, and keep generated output disposable.
- **Why:** Bloei.me needs friendly visual editing, but its expected content is
  formatted prose rather than a structured-document platform. Markdown keeps
  canonical content portable and avoids a parallel Kotlin ProseMirror schema,
  renderer, and migration system.
- **Consequences:** Store format and schema version with each source document.
  The visual editor exposes only constructs that round-trip without semantic
  loss, with shared golden fixtures and authoritative server preview. Keep
  business semantics outside prose. A future structured format requires a new
  ADR and explicit migration or per-document coexistence policy.

## D-084 — Make read/write MCP an early v1 interface

- **Date:** 2026-08-21
- **Status:** Accepted; accepts ADR-0002, supersedes D-071, and changes the MCP
  and service-account sequencing in D-069
- **Decision:** Ship Streamable HTTP MCP at `/mcp` in the existing application
  and implement it incrementally with the domain slices rather than after the
  complete REST API. Expose explicit public and authorized resources/read tools
  plus narrow write tools mapped directly to application commands. The first
  useful surface covers campaign creation and management, progress, external-
  work references, evidence revisions, sanitized-media association, final
  price, and delivery submission/resubmission. Support delegated people through
  authorization code with PKCE and narrowly scoped organization automation
  principals through client credentials. Organization administrators grant the
  latter explicit expiring campaign/delivery capabilities and optional
  component or campaign scope.
- **Why:** Agent-driven and unattended campaign operation is a core usability
  requirement. Designing it with the first commands validates adapter-
  independent application boundaries and avoids unsafe sharing of human refresh
  tokens with automation.
- **Consequences:** MCP never proxies REST, embeds a model, or bypasses current
  domain authorization. Interactive high-impact actions require a short-lived
  server confirmation token; explicitly granted unattended publication or
  delivery actions are labelled and audited as automation. Automation cannot
  administer identity or roles, accept terms, pledge, vote, moderate, verify,
  or operate the platform. OAuth discovery, resource indicators, audience
  validation, closed schemas, idempotency, rate limits, revocation, and
  adversarial MCP tests are release gates.
