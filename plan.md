# Bloei.me product and implementation plan

Status: Living plan

Last updated: 2026-08-01

This document describes the agreed product and implementation direction for
Bloei.me. The reasons behind the choices are recorded in
[decisions.md](decisions.md).

## Product summary

Bloei.me is a standalone, multi-tenant platform where organizations reserve
innovation budgets and collectively fund fixed-outcome open-source campaigns
with a published maximum price.

- Product name: **Bloei.me**
- Descriptor: **Open-source co-funding**
- English tagline: **Fund what should grow.**
- Dutch tagline: **Samen laten we open source bloeien.**

The visual identity should feel trustworthy, civic, transparent, and
accessible. Growth can be used as a subtle metaphor, without making the
product overly floral or playful.

The first release is successful when Epistola can run a real campaign from
proposal through budget-backed pledging, delivery review, settlement export,
and externally recorded invoicing.

## Product model

### Tenants and projects

- A tenant owns its branding, domains, projects, moderation policy, and
  organization verification.
- A tenant has one or more projects.
- A project represents a fundable open-source product or initiative.
- A campaign belongs to exactly one project.
- A single-project tenant hides unnecessary project-switching UI.
- The hosted service primarily uses `{tenant}.bloei.me`, with
  `bloei.me/t/{tenant}` as a path-based fallback.
- A tenant may use a verified custom domain.
- A single-tenant self-hosted installation operates directly at its root
  domain. The same application artifact can also run in multi-tenant mode.

### Identity and roles

Bloei.me uses one configurable OIDC provider per deployment. The hosted
service initially uses the central Authentik deployment. Self-hosted operators
can configure another standards-compliant OIDC provider.

Organizations have a global identity within a Bloei.me deployment, while each
tenant verifies an organization's participation independently.

The authorization model contains these roles:

- **Platform operator:** provisions tenants, performs exceptional audited
  operations, and operates the deployment.
- **Tenant administrator:** manages tenant branding, projects, verification,
  and tenant membership.
- **Project maintainer:** curates proposals and manages project campaigns.
- **Moderator:** reviews idea submissions, comments, and flags.
- **Organization administrator:** controls the organization's profile,
  representatives, and role assignments.
- **Budget manager:** creates budgets, controls cost centers, and authorizes
  funding representatives to spend from budgets.
- **Funding representative:** pledges and votes on behalf of an organization.
- **Member:** participates in the community without financial authority.

One person may hold several organization roles. Public visitors can read
published content; authentication is required for submissions and comments.

## Proposals and campaigns

The primary product flow is:

`Private idea -> Public proposal -> Funding -> Delivery -> Review -> Settlement`

### Ideas and proposals

- Any signed-in user can privately submit an idea to a tenant or project.
- Moderators review the submission before it becomes public.
- Project maintainers turn suitable ideas into outcome-focused public
  proposals.
- A verified organization can add one advisory endorsement to a proposal.
- Endorsement is separate from funding and does not bind prioritization.
- Comments, updates, notifications, flagging, and moderation are native
  Bloei.me functionality.
- Turning a proposal into a campaign is a deliberate maintainer action, never
  an automatic result of endorsements.

### Campaign terms

Every published campaign identifies one verified supplier organization that
is responsible for delivery and external invoicing. It records:

- One ISO-4217 currency and a maximum net price excluding tax
- Outcome and scope
- Milestones and objective acceptance criteria
- The stable, supported release in which delivery must be available
- A mandatory latest funding date
- A mandatory ultimate delivery date
- A configurable minimum pledge cap, defaulting to 1%
- A configurable review period, defaulting to 14 calendar days and restricted
  to 7–30 days
- Configurable review-vote quorum and approval thresholds between 50% and
  100%, both defaulting to two-thirds

The published price ceiling, scope, criteria, dates, supplier, and governance
settings become immutable after the first pledge. A material change creates a
new campaign version, supersedes the old version, releases its reservations,
and requires every organization to pledge again.

Published campaigns are public in v1. Visibility and inherited access policy
remain explicit domain concepts so private campaigns can be introduced later
without redesigning the authorization model.

## Organization budgets

Every pledge must be backed by a budget. A budget is a private planning and
commitment control belonging to an organization; it is not a bank account or
an accounting ledger.

An organization may define multiple budgets. Each budget has:

- Name and optional description
- Cost-center code and name
- ISO currency
- Net total amount
- Valid-from and expiration dates
- Administrative processing buffer, defaulting to 14 days
- Authorized funding representatives
- Lifecycle status and append-only history

Budget amounts, balances, cost centers, allocations, and authorized spenders
are visible only to authorized organization members. Budget values exclude VAT
and other taxes, matching campaign settlement values.

### Eligibility

A budget can back a pledge only when:

- The budget and campaign currencies match.
- The budget is active.
- The funding representative is authorized to use it.
- Its available amount covers the pledge's complete maximum exposure.
- Its expiry covers the campaign's ultimate delivery date, review period, and
  the budget's processing buffer.

In formula form:

`budget expiry >= ultimate delivery date + review period + processing buffer`

Bloei.me does not perform currency conversion.

If no eligible budget exists, an organization administrator or budget manager
can create one inside the pledge flow. A funding representative without budget
management permission must select an existing budget they are authorized to
use.

### Reservations and consumption

- Creating a pledge and reserving its complete maximum monetary exposure occur
  in one database transaction. That exposure is the pledge cap multiplied by
  the campaign's maximum price.
- Concurrent pledges cannot reserve the same remaining balance twice.
- Increasing a pledge reserves the additional exposure.
- Reducing or withdrawing a pre-start pledge releases the corresponding
  reservation.
- Expired, cancelled, failed, or superseded campaigns release their active
  reservations.
- The first delivery submission locks the supplier's final price, freezes the
  allocation, and releases the part of each reservation above its final
  allocated amount.
- Accepted settlement converts the remaining reservation into consumed budget.
- Invoice and payment status do not alter budget consumption.

A budget total may be increased. It may only be reduced when the new total
still covers all consumed and reserved amounts. Expiration can be extended; it
can only be shortened when every active reservation remains eligible. Budgets
with financial history are archived rather than deleted.

If delivery becomes overdue, budget managers receive escalating warnings and
may move the private reservation to another eligible budget without modifying
the public pledge. A locked pledge is never automatically withdrawn. If no
replacement is available at expiry, the budget becomes `expired with active
commitment`; settlement remains possible and the organization handles the
accounting exception externally.

### Future split-budget support

The persistence model supports several budgets funding one pledge through a
`pledge_budget_allocations` association. Each allocation records its budget,
reserved amount, consumed amount, state, and ledger references.

V1 enforces exactly one active allocation that covers the complete pledge
maximum. Cost center information exists only on the budget. A later version
can permit multiple allocations whose sum covers the pledge without migrating
existing pledge data.

## Pledging and allocation

### Pledge semantics

- A pledge is a serious, public maximum-percentage commitment against the
  campaign's eventual final price.
- It is not a donation, payment, or legally binding invoice.
- Its worst-case monetary exposure is that percentage of the published maximum
  price, and the organization's budget reserves that complete amount.
- Confirmation explains that the campaign starts automatically at 100%
  coverage, may be started earlier by the supplier, and locks the commitment
  when delivery starts.
- The public record shows the organization, maximum cap, projected share,
  worst-case amount, campaign activity, and final net settlement amount.
- Representative identity, budget information, and invoice administration are
  private.

Before delivery starts, an organization can increase, reduce, move, or
withdraw its pledge. When aggregate caps reach 100%, the campaign atomically
starts delivery without reconfirmation.

Below 100%, the supplier may manually start delivery at any coverage level,
including zero. This action is irreversible and publicly records the coverage
at which the supplier accepted responsibility for the uncovered share. Once
delivery starts, existing pledges can no longer be reduced or withdrawn.

If the latest funding date arrives before automatic or manual start, the
campaign expires. Once delivery has started, that deadline no longer closes
pledging; new organizations may continue to join until delivery submission.

New verified organizations may pledge throughout delivery, and existing
organizations may increase their caps. Each change updates the projected
allocation and its transactional budget reservations. Joining a campaign that
is already delivering requires an explicit acknowledgement that the new pledge
locks immediately.

An exceptional post-start reduction requires a deployment operator, a public
reason, and an immutable audit event. Any shortfall after work starts is the
supplier's risk. A campaign started below full coverage prominently shows the
supplier's uncovered percentage and worst-case monetary exposure.

Public campaign pricing shows the maximum price, aggregate coverage, committed
amount at the ceiling, current supplier-funded gap, and the coverage captured
at manual start. After delivery submission, it additionally shows the locked
final price and final organization allocations. The coverage indicator stops
at 100%, even if the sum of organization caps is higher.

### Fair-share calculation

Allocation uses max-min fair water filling against the supplier's final price:

1. Divide the remaining target equally among participating organizations.
2. Lock any organization whose maximum cap is below that equal share.
3. Redistribute the remaining target equally among the remaining organizations.
4. Repeat until the target is allocated or all caps are exhausted.

For caps of 10%, 30%, 100%, and 100%, the allocation is 10%, 30%, 30%, and
30%. If another organization with a cap of at least 22.5% joins, the allocation
becomes 10%, 22.5%, 22.5%, 22.5%, and 22.5%.

When combined caps reach at least 100%, water filling allocates the complete
final price. When a supplier starts and delivers below full coverage, every
organization reaches at most its cap and the supplier absorbs the unallocated
remainder.

Pledge caps are stored in basis points. Monetary values are stored in currency
minor units. Rounding is deterministic and never exceeds the exact maximum
amount displayed during confirmation. The supplier bears any unavoidable
fractional-currency shortfall. The supplier also absorbs delivery overruns and
retains any delivery efficiency margin.

## Delivery, review, and settlement

### Delivery evidence

The supplier publishes sanitized text, external links, and raster images as
evidence. V1 does not accept arbitrary document uploads.

With the first delivery submission, the supplier declares a final net price
from zero through the published maximum. Bloei.me does not require an itemized
cost statement or audit: the supplier is free to charge less, while the
published ceiling remains the funders' guaranteed worst case.

The first delivery submission atomically:

- Permanently closes pledging
- Locks the final price so later evidence resubmissions cannot change it
- Freezes the final allocation
- Freezes the set of voting organizations
- Releases budget reservations above final allocated amounts
- Opens the configured review period

### Pledger review

- Funding representatives assess evidence against the published criteria.
- If nobody objects, delivery is automatically accepted when the review period
  ends.
- An objection must identify an unmet acceptance criterion.
- The supplier may correct the work and resubmit, restarting the review period.
- No independent reviewer is required.

A declared price within the previously accepted ceiling is not itself grounds
for an objection. Bloei.me does not assess the supplier's internal costs or
margin.

If the supplier contests a remaining objection, the pledging organizations
vote. Each organization has one vote. The campaign's immutable quorum and
approval thresholds apply. If the vote passes, delivery is accepted. If it
fails, the campaign returns to revision and no settlement is created.

### Settlement and invoicing

Accepted delivery creates one immutable settlement from the locked final price
and frozen allocation, then consumes the associated budget reservations. A
zero final price produces a public zero settlement, releases all reservations,
and creates no invoice obligations.

Bloei.me:

- Publishes final organization shares and net amounts
- Exports authorized settlement data as CSV and JSON
- Lets the supplier privately record `not invoiced`, `invoiced`, and `paid`
  states
- Does not collect money
- Does not generate tax invoices
- Does not calculate tax

The supplier invoices every funding organization externally after accepted
delivery and adds legally required VAT or other tax. Advance and milestone
invoicing are not supported in v1.

An unsuccessful campaign creates no settlement or invoice. The failure,
evidence, and produced open-source work remain visible.

## Technical architecture

### Application

- Kotlin on JVM 25
- Spring Boot 4
- Spring Modulith modular monolith
- Spring MVC, Thymeleaf, and HTMX
- PostgreSQL, jOOQ, and Flyway
- Spring Security OIDC
- Dutch and English message bundles
- Locally hosted, progressively enhanced, WCAG 2.2 AA user interface

Modules cover tenancy, identity, organizations, budgets, proposals, campaigns,
pledges, delivery, settlement, moderation, notifications, and auditing.

Core value types include:

- `Money(currency, minorUnits)`
- `PercentageCap(basisPoints)`
- `CampaignPrice(maximum, finalPrice?)`
- `CampaignVisibility`
- `CampaignDeadlinePolicy(fundingDeadline, deliveryDeadline)`
- `AcceptancePolicy(reviewDays, quorumBps, approvalBps)`
- `BudgetValidity(validFrom, expiresOn, processingBufferDays)`
- Versioned pledge attestation

PostgreSQL tenant isolation is enforced in the database where applicable and
backed by application-level authorization. State-changing workflows use
transactions, optimistic or explicit locking where required, and append-only
audit events.

### Evidence, jobs, and notifications

- Store evidence images in S3-compatible object storage.
- Accept JPEG, PNG, and WebP only after successful decoding and re-encoding.
- Strip metadata, reject SVG and non-images, and enforce size limits.
- Use an outbox-backed worker for email, funding deadlines, budget warnings,
  review timers, and automatic acceptance.
- Deliver notifications through SMTP and an in-app inbox.

### Interfaces and future integrations

Stable public pages cover tenants, projects, proposals, campaigns,
organizations, evidence, and settlements. Private management pages cover
budgets, moderation, verification, and invoicing status.

V1 has no public JSON API, webhook framework, GitHub-specific fields, or
connector installation UI. Internal ports should exist for future progress
sources, organization verification, notifications, object storage, settlement
export, and accounting integrations.

### Deployment

- Publish one OCI image for hosted and self-hosted installations.
- Provide a Compose deployment with PostgreSQL and S3-compatible storage.
- Keep OIDC and SMTP configurable external services.
- Include readiness and health endpoints, structured logs, metrics, database
  migrations, backup guidance, and reverse-proxy documentation.
- Keep tenant provisioning and hosted commercial agreements operator-managed
  in v1.

## Implementation sequence

1. **Foundation:** build, license, CI, changelog, database migrations, module
   boundaries, and bilingual design system.
2. **Tenancy and identity:** OIDC, tenant routing, branding, organizations,
   verification, roles, and auditing.
3. **Budgets:** budget administration, spender authorization, ledger,
   eligibility, transactional reservations, transfers, and inline creation.
4. **Community workflow:** projects, private ideas, proposals, endorsements,
   comments, moderation, and notifications.
5. **Funding:** campaign versions, deadlines, attestations, budget-backed
   pledges, fair allocation, and atomic campaign start.
6. **Delivery and settlement:** evidence, allocation freeze, review,
   objections, voting, budget consumption, exports, and invoice statuses.
7. **Hardening and pilot:** security, concurrency, accessibility, operational
   documentation, and an Epistola pilot campaign.

Each meaningful unit uses a Conventional Commit, updates `CHANGELOG.md` when
notable, applies local formatting, and passes relevant tests. Nothing is pushed
without explicit permission.

## Verification and acceptance

### Automated coverage

- Property-test water-filling fairness, cap enforcement, deterministic output,
  late pledges, and rounding.
- Test transactional budget reservations under concurrent pledges and cap
  increases.
- Reject overcommitted, unauthorized, incompatible, inactive, and
  insufficiently valid budgets.
- Test budget changes, transfers, release, consumption, expiration, and
  immutable ledger history.
- Enforce one budget allocation per pledge in v1 while testing the multi-row
  persistence model.
- Test campaign versioning, deadlines, re-pledging, operator exceptions, and
  overdue delivery.
- Test automatic start at full coverage and irreversible manual start at zero,
  partial, and full coverage.
- Reject a final price above the ceiling and every attempt to alter it after
  the first delivery submission.
- Verify full, partial, and zero-price settlement, including supplier-funded
  shortfalls and released budget reservations.
- Test automatic acceptance, objections, resubmission, quorum rounding,
  configurable thresholds, and failed votes.
- Verify tenant isolation, role authorization, CSRF protection, content
  sanitization, and image validation.
- Run PostgreSQL integration and migration tests with Testcontainers.
- Run Dutch and English browser journeys and automated WCAG 2.2 AA checks.

### Pilot acceptance

The Epistola pilot must:

- Receive budget-backed pledges from at least three verified organizations.
- Reject a concurrent or direct budget overcommit.
- Start automatically when coverage reaches 100%.
- Demonstrate manual early start and the public supplier-risk disclosure.
- Reallocate projected shares after a late pledge.
- Lock a lower final price, freeze allocation, and release surplus reservations
  at delivery submission.
- Complete pledger review and acceptance.
- Consume final budget amounts at settlement.
- Produce reproducible CSV and JSON exports.

## Explicit boundaries

- `bloei.me` is the controlled product domain; trademark registration is out of
  scope.
- Epistola is the first tenant, but the core contains no Epistola-specific or
  GitHub-specific concepts.
- Published campaigns are public in v1. Budgets, cost centers,
  representatives, moderation, and invoicing administration remain private.
- Every pledge requires one budget in v1; the data model prepares for several
  budgets per pledge later.
- Bloei.me manages commitments and settlement evidence, not bank funds or
  statutory accounts.
- Payments, advance invoicing, milestone invoicing, tax calculation, debt
  collection, tenant billing, campaign fees, support management, and GitHub
  synchronization are outside v1.
