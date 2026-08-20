# Bloei.me product and implementation plan

Status: Living plan

Last updated: 2026-08-02

This document describes the agreed product and implementation direction for
Bloei.me. An interactive overview is available in
[functional-design.html](functional-design.html). The reasons behind the choices
are recorded in [decisions.md](decisions.md). Concrete end-to-end journeys are
documented in [scenarios.md](scenarios.md). The proposed software design is in
[solution-architecture.md](solution-architecture.md), with the public interface
contract in [api-and-integrations.md](api-and-integrations.md). The trust-based
pilot assumptions, unresolved legal questions, and future signed-contract
direction are recorded separately in [legal.md](legal.md). Product,
operational, and implementation choices that still need a decision are tracked
in [open-questions.md](open-questions.md).

## Product summary

Bloei.me is one public co-funding network where organizations reserve innovation
budgets and collectively fund fixed-outcome open-source campaigns with a
published maximum price.

- Product name: **Bloei.me**
- Descriptor: **Open-source co-funding**
- English tagline: **Fund what should grow.**
- Dutch tagline: **Samen laten we open source bloeien.**

The visual identity should feel trustworthy, civic, transparent, and
accessible. Growth can be used as a subtle metaphor, without making the
product overly floral or playful.

The first release is successful when Epistola can run a real campaign from
proposal through budget-backed pledging, delivery review, settlement export,
and lead-confirmed completion of settlement notes.

## Product model

### Network, components, and programs

The hosted service is one canonical `bloei.me` network rather than a collection
of community sites. Organizations register once, components have one canonical
identity, and public proposals and campaigns are discoverable together. The
v1 routes are `/components`, `/proposals`, `/campaigns`, `/organizations`, and
the signed-in `/my` area. A future `/programs` route or memorable program
subdomain may redirect to its canonical page but does not create another
application, identity, policy, or authorization boundary.

An **open-source component** is the software, standard, service, library,
connector, or other maintained building block affected by funded work. A
component may be a complete application or a child of another component. It
records canonical name, type, description, official website, source locations,
licence, supported releases, component family, related components, and
versioned stewardship. Forks are separate components with lineage links rather
than tenant-specific versions of the same component.

An optional **program** is a public curated collection of components, proposals,
and campaigns around an objective such as Common Ground document services. A
program may have branding and curators, but it is not a tenant: it has no
separate organization enrollment, identity store, budget boundary, terms,
private data silo, or campaign copy. One campaign can appear in several programs
while retaining one canonical URL and record.

Programs are deferred beyond v1. The pilot adds no program persistence, route,
curator role, or administration UI.

Every proposal targets at least one component. Every campaign targets one or
more components and snapshots, for each formal target, whether it is modified,
integrated, or newly created; whether the result is official, an extension, or
a fork; any promised supported release; and required maintainer confirmation.
Incidental dependencies remain technical scope rather than formal targets.
Adding or removing a target, changing official upstream status, moving to a
fork, or changing a promised release after the first pledge is material.

Self-hosting creates a separate deployment and canonical network at its own root
domain. Hosted and self-hosted installations use the same artifact, but do not
share identities or records unless federation is deliberately designed later.

Canonical code repositories are provider-neutral records linked to one or more
components. Components may have several repositories and at most one marked
primary. Proposals, campaigns, progress, and delivery evidence may also refer
to external issues, pull requests, commits, and releases without importing
their lifecycle into Bloei.me. GitHub is the first read-only public-metadata
provider; observed metadata never overrides curated component or campaign facts.

### Identity and roles

Bloei.me uses one configurable OIDC provider per deployment. The hosted
service initially uses the central Authentik deployment. Self-hosted operators
can configure another standards-compliant OIDC provider.

An account is bound only to the exact OIDC issuer and subject. Email is not an
account-linking key, and provider claims never grant Bloei.me organization
membership or roles. Recovery starts at the identity provider; an independently
verified, audited organization-control procedure handles cases where provider
recovery cannot restore access. The initial platform operator is bootstrapped
once from an exact configured issuer and subject. Platform roles and high-impact
organization actions require MFA or recent step-up authentication.

Local development and browser tests may instead load a separate development
authentication adapter with selectable seeded personas. That adapter is absent
from the production runtime classpath and OCI image, displays a persistent
development banner, and exercises the same authenticated-actor boundary as
OIDC. CI retains a separate OIDC contract journey.

Organizations have one identity within a Bloei.me deployment, with status
`provisional`, `verified`, `review required`, `closed`, or `merged`. Verification
establishes legal identity and initial account control once. Platform
participation is a separate deployment-level status of `active`, `suspended`, or
`closed`, so a policy restriction does not rewrite a factual identity decision.
A verified organization becomes active after accepting the current platform
terms; it does not apply separately to components or programs.

The authorization model contains these roles:

- **Platform operator:** verifies identity, manages platform participation,
  performs exceptional audited operations, and operates the deployment.
- **Platform moderator:** reviews reports and applies reversible content
  restrictions without changing campaign governance.
- **Component maintainer:** maintains canonical component information, curates
  proposals, confirms official upstream claims, and approves suitable campaign
  publication within assigned component scope.
- **Program curator:** maintains a public program and its non-exclusive curated
  collection without controlling included campaign records.
- **Organization administrator:** controls the organization's profile,
  representatives, and role assignments.
- **Budget manager:** creates budgets, controls cost centers, and authorizes
  funding representatives to spend from budgets.
- **Funding representative:** pledges and votes on behalf of an organization.
- **Supplier representative:** represents a supplier organization and may be
  assigned to administer its lead-supplier campaigns.
- **Member:** participates in discussion without financial authority.

Organization roles belong to the person's organization membership and work
throughout that deployment. Organization administrators assign and revoke
roles. Funding representatives additionally require authorization to use the
selected budget. Component and program roles are separately scoped assignments
and never grant access to an organization's members or budgets.

One person may hold several organization roles. Actions are performed by people
but owned by their organizations. Completed commitments and positions therefore
survive representative replacement. Public visitors can read published content;
authentication is required for submissions and comments.

Authority is evaluated when an action occurs. The actor must have active
organization membership, the required role, budget authorization where money
is involved, and every applicable internal approval. Revoking authority does
not invalidate a completed organization action, but it invalidates that
person's contribution to an approval that is still pending. Concurrent changes
to one organization position use optimistic locking rather than silently
overwriting a colleague's action.

Platform operators, component maintainers, program curators, and moderators
cannot grant organization roles or approve spending. An organization cannot
remove its last active administrator; audited platform recovery is available
when no usable administrator remains.

### Organization participation and continuity

- A claimant searches registration identifiers and normalized legal names
  before creating a provisional organization. Exact identifiers block a
  duplicate; possible matches direct the person to request membership.
- A deployment operator verifies legal identity from an authoritative source.
  For Dutch businesses this may be the KVK Handelsregister; Dutch public bodies
  may use the Register van Overheidsorganisaties and government-domain register;
  foreign organizations use an appropriate national register with VIES only as
  supplementary VAT evidence. Manual review remains available.
- Legal-identity evidence records source, reference, observed values, time,
  reviewer, and reason. Raw documents are avoided by default; any necessary
  protected document has encryption, restricted access, and a retention limit.
- The first administrator must also prove control separately from legal
  existence through an official organization channel and independent
  confirmation. An official-domain email alone is insufficient. Existing
  administrators approve later members; disputed ownership uses audited
  operator recovery. Future eHerkenning support may strengthen Dutch
  organization authorization but is not required in v1.
- After identity and account-control verification, an organization administrator
  accepts versioned platform terms to activate participation. No component or
  program can require a duplicate organization application.
- A platform-policy suspension records a private detailed reason, an appropriate
  public operational status, notice, and an appeal without rewriting verified
  legal identity.
- Identity verification has no automatic expiry. Legal name, form, registration
  or active-status changes, domain loss, credible fraud reports, succession,
  administrator loss, or material source mismatches trigger `review required`.
  Existing locked commitments survive while new sensitive actions may pause;
  platform participation suspension remains available when risk warrants it.
- A platform operator can recover an organization with no active administrator
  after verifying the replacement's authority.
- Legal registration identifiers prevent duplicate creation where available.
  A platform operator may merge accidental duplicates with a complete audit
  trail and redirects to the canonical profile.
- Removing a representative never changes organization-owned pledges, budgets,
  or ballots. Another authorized representative can take control and alter an
  open organization ballot.
- Account deletion anonymizes personal profile data while preserving
  organization-authorized actions and internal audit identifiers.

Identity and participation appeals go to a different deployment operator where
possible. Public profiles show factual identity-verification source category and
date plus active or suspended platform participation, not private evidence or
reviewer identity. The interface uses “organization identity verified” and
“active Bloei.me participant” and never presents verification as procurement
approval, credit assessment, technical competence, or trusted-supplier
certification.

If a funding organization is suspended before delivery starts, its pledges are
deactivated and reservations released. Restoration requires new pledges. If
suspension happens after delivery starts, locked pledges remain and the
organization may only administer those commitments: review, vote, replace its
representative, or move a reservation. It cannot endorse, create another pledge,
or increase a cap until restored.

### Component identity and stewardship

An `OpenSourceComponent` exists once per deployment. A verified organization may
privately propose a record, but a deployment operator approves its canonical
publication after duplicate and identity review. A verified organization may
claim a stewardship relationship, supported by official source-control access,
project websites, published governance, release or package authority, trademark
authorization where relevant, or confirmation through an established official
channel. Existing stewards receive 14 days to respond to a claim or transfer.
A deployment operator resolves duplicates, disputed claims, transfers, and
succession with protected evidence and safe public evidence references. Claims
are reconfirmed annually and after material governance, repository, domain, or
organization-identity events. Appeals follow platform appeal policy.

A component may have one primary maintainer organization, several co-maintainer
organizations, community governance without an organizational primary, or no
verified steward yet. Stewardship is versioned with role, scope, status
`claimed`, `verified`, `disputed`, or `ended`, effective dates, evidence category,
and audit history. It establishes upstream responsibility, not supplier quality,
exclusive commercial rights, or guaranteed delivery.

Component maintainers are people authorized within the scope of a stewardship
organization or exceptionally assigned by the platform while governance is
resolved. A primary maintainer may initiate a campaign, lead it, select another
supplier team, confirm official release integration, or remain outside delivery.
Third-party campaigns remain possible but must distinguish confirmed official
work from an independent extension, fork, replacement, or unconfirmed outcome.
No campaign may imply official upstream support without confirmation. Every
supplier still satisfies ordinary organization, representative, and campaign-
confirmation requirements.

### Future multi-approval authorization

V1 requires one authorized person for each organization action. The persistence
and application boundaries prepare for configurable four-eyes approval through
a versioned authorization policy owned by an organization and optionally
scoped to a budget and action type. An authorization request records distinct
approvers, whether the initiator counts, a policy snapshot, expiry, and result.

When multi-approval is introduced, a pending financial request privately
reserves its worst-case exposure but does not become public or count toward
campaign coverage until every required approval succeeds. Rejection, expiry,
or loss of an approver's authority releases or revises the pending request.
The same mechanism can later govern pledges, cap increases, amendment consent,
reservation transfers, and settlement-note completion without changing the v1
one-approval user experience.

### Information visibility and personal data

Bloei.me provides transparency at the organization level. Public financial and
governance actions name the responsible organization, not the employee who
performed them. The exact actor, authority evaluation, and approval evidence
remain in a restricted audit trail. This preserves accountable campaign history
when representatives change without unnecessarily publishing personal data.

The public product surface includes:

- Published components, stewardship, programs, proposals, campaigns, terms,
  versions, supplier teams, lifecycle states, public reasons, evidence, and
  outcomes
- An organization's legal name, country and type, appropriate public registry
  identifier, official website, identity-verification source category and date,
  and platform participation status
- Pledging organizations, their maximum caps and worst-case amounts, projected
  and final contributions, aggregate coverage, and supplier-funded shortfalls
- Activated amendments and organization-level consent results, including
  non-response or rejection
- Organization-owned objections, criterion references, moderated public reasons,
  and final explicit-acceptance, deemed-acceptance, or rejection classifications
- Public settlement lines and exceptional redaction tombstones

The following remains private to the owning organization and specifically
authorized members: memberships, organization-role assignments, budget totals,
balances, cost centers, eligibility rules, reservations, transfers, internal
authorization requests, and future contract requirements or evidence. A
funding organization and the supplier team can see that organization's
settlement-note status; the status is never public.

Platform operators privately see identity and participation review records;
moderators see only assigned moderation cases. Active or suspended participation
is public where operationally relevant, but protected evidence and detailed
reasons stay private unless a lawful and proportionate public reason is
required. Component-claim and unsuccessful supplier-draft evidence is likewise
restricted.

Only authorized deployment operators may access raw identity-verification
evidence, recovery evidence, protected fraud reports, internal actor identifiers,
and security logs. The application avoids retaining raw identity documents when
a registry reference is sufficient. Access to protected data is purpose-bound,
audited, and subject to a defined retention policy.

Ordinary discussion contributions may use a person's chosen public display name.
Official pledges, consents, objections, ballots, supplier actions, and settlement
actions use the organization as the public actor. A person may opt into a public
profile, but authorization never requires publication of their legal name.

Every public page, search index, future API, feed, and public export must be
generated from an explicit public projection rather than by serializing internal
domain records. Private exports are permission-scoped. Public evidence is
sanitized before publication, including image metadata removal. Account deletion
anonymizes the personal actor while retaining the organization-owned action;
exceptional legal, privacy, or security redaction leaves a public tombstone.

### Moderation, abuse, and AI assistance

Moderation controls content visibility; it never silently changes a pledge,
consent, objection, ballot, delivery, settlement, or campaign outcome. When
harmful wording in an organization-owned position is hidden or redacted, its
structured organization, criterion, and position remain public with a
moderation tombstone.

Reportable grounds include illegal content, personal or confidential
information, threats or harassment, discrimination, spam, impersonation,
malicious content, materially misleading campaign information, identity or
authority fraud, manipulation of platform identities or reports, and platform-
terms violations. Disagreement about scope, price, delivery quality, or an
acceptance position uses campaign clarification, amendment, objection, and
voting processes rather than moderation.

Authority stays separated:

- Moderators may label, request correction, quarantine, hide, redact, restore,
  or take no action on content.
- Component maintainers curate proposals and may request campaign corrections
  within their assigned scope.
- Deployment operators govern platform participation and handle exceptional
  identity, legal, fraud, security, recovery, and forced-failure actions.
- Funding organizations judge delivery through objections and voting.

Signed-in users can make ordinary content reports. An accessible electronic
illegal-content notice accepts a report without an account and requires contact
details, the exact target, a sufficiently substantiated explanation, and a
good-faith declaration, subject to legally required exceptions. Bloei.me
acknowledges the report and records its source without publicly naming the
reporter.

A moderation case contains one or more reports, a typed target reference,
grounds, protected evidence, decisions, restrictions, appeals, notices, and
append-only events. Every restriction is an overlay on the original record and
is reversible. Decisions identify whether they rely on law or platform terms,
the applicable ground, facts, scope, duration, use of automation, reason, and
available review. Urgent content may be temporarily hidden before review.
Affected authors and reporters receive the outcome where appropriate and may
request review; a different qualified reviewer handles an appeal where
practical.

Published targets are not unconditional guarantees. Critical reports target
acknowledgement within four hours, protective action within eight hours, and
formal review within 48 hours. High reports target acknowledgement within one
business day and decision within three business days. Standard reports target
acknowledgement within three business days and decision within ten business
days. Appeals target acknowledgement within three business days and decision
within 14 calendar days, with one reasoned 14-day extension. Actual security
incidents and personal-data breaches enter the incident process immediately.

Participation restrictions use the least restrictive proportionate measure,
reasoned notice, a 14-day ordinary response period, and a 30-day appeal window.
Appeal does not automatically stay a restriction. Emergency action receives
review within 48 hours, and a different operator reviews an appeal where
staffing permits. Public status is neutral; detailed grounds remain protected.

Campaign-relevant restrictions leave a limited public tombstone and public
operational effects where necessary. Reports, reporter identity, protected
originals, internal deliberation, and detailed fraud or security evidence stay
restricted. Restricting a person does not erase organization-owned history or
prevent another authorized representative from administering a locked
commitment. Before start, ordinary cancellation remains available; after start,
material campaign consequences use suspension and forced-failure governance.

AI moderation is an optional, provider-neutral assistant behind a
`ModerationClassifier` port. The processing pipeline is:

`submission -> deterministic checks -> AI assessment -> policy decision -> human review`

Deterministic checks remain authoritative for supported file types, decoding,
metadata stripping, size limits, rate limits, and known malicious patterns. AI
may later detect risk categories and relevant spans, warn an author, suggest
safer wording, classify and prioritize reports, translate or summarize context,
and draft private moderator summaries.

AI never independently deletes content permanently, rejects an appeal, changes
an organization position, imposes an organization sanction, determines identity
fraud, judges delivery, or changes campaign state. Model output is untrusted
input to deterministic policy code, uses structured schemas, has no tools or
direct domain commands, and is never published as an allegation.

Each AI assessment records provider and model identifier, model and policy
version, language, categories, relevant spans, confidence, suggested action,
automatic temporary action, and the later human outcome. Bloei.me stores the
structured assessment rather than hidden model reasoning. Metrics cover false
positives, sampled false negatives, human and appeal reversals, language and
category performance, and quarantine duration.

The classifier receives only content and context needed for moderation. Private
budgets, memberships, identity documents, and unrelated records are excluded.
Provider configuration must prohibit training on submitted Bloei.me content and
meet applicable processing and retention requirements. Hosted deployments may
configure a managed provider; self-hosted deployments may use another provider,
a local model, or disable AI.

AI is not an availability dependency. If it fails or is disabled, deterministic
controls and human reporting continue, ordinary low-risk content can proceed,
and content already considered suspicious remains queued. Delivery and campaign
deadlines do not wait indefinitely for a classifier.

V1 implements reporting, a basic queue, reasoned reversible content decisions,
public tombstones, notices, appeal, emergency handling, deterministic safety
checks, and protected audit history. It implements no model provider. AI
warnings, classification, prioritization, summaries, and any evaluated
reversible quarantine may follow only after Dutch and English evaluation,
privacy and provider review, error and bias measurement, and explicit cost
limits. Configurable component policies, mandatory second review, advanced
automation, trusted reporters, bulk operations, cross-component detection,
transparency analytics, and external dispute-resolution integration may follow
later.

## Proposals and campaigns

The primary product flow is:

`Private idea -> Public proposal -> Funding -> Delivery -> Review -> Settlement`

### Ideas and proposals

- Any signed-in user can privately submit an idea against one or more components.
- Moderators review the submission before it becomes public.
- A component maintainer in scope turns a suitable idea into an outcome-focused
  public proposal. Cross-component proposals require confirmation from every
  maintainer whose official component participation is claimed.
- An active identity-verified organization can add one advisory endorsement to
  a proposal.
- Endorsement is separate from funding and does not bind prioritization.
- Comments, updates, notifications, flagging, and moderation are native
  Bloei.me functionality.
- Turning a proposal into a campaign is deliberate supplier and maintainer work,
  never an automatic result of endorsements.

Ideas use `needs clarification`, `duplicate`, `maintainer review`, `out of
scope`, or `content rejected` dispositions. A proposal is owned by its component
curation process rather than its original submitter, while optional public
attribution remains possible. Proposal states are `open`, `campaign forming`,
`campaign funding`, `delivered`, `closed`, or `archived`. One proposal may
produce different or sequential campaigns, but Bloei.me does not allow two
active funding campaigns to promise the same outcome silently.

Terminal proposal outcomes are `converted`, `duplicate`, `declined`,
`withdrawn`, and `stale`. Twelve months without substantive activity starts a
30-day notice to the proposer, endorsers, and maintainers; a maintainer may keep
the proposal open with a recorded reason. Proposers and endorsing organizations
may request reopening, but a maintainer approves it, with operator intervention
only through appeal or maintainer absence. Closure history remains public.
Endorsements are frozen as history and never transfer or reactivate; each
organization must endorse the current version again.

### Campaign formation and supplier selection

An eligible supplier may express interest in a public proposal, be invited by a
component maintainer, suggest terms, assemble a supplier team, and submit a
private campaign draft. Expressions and unsuccessful drafts are private by
default; a supplier may publicly show its interest. No organization can pledge
against a draft.

Several suppliers may prepare private drafts. Maintainers may select one, ask
for revision, encourage a combined team, split meaningfully different outcomes
into related proposals, or select none. Bloei.me does not run an automatic
auction and does not require the lowest price. Suitability may consider scope,
objective criteria, feasibility, maximum price, timing, public delivery history,
licensing, capacity, risk, and community need.

The selected campaign publishes a concise selection and upstream rationale
without naming unsuccessful suppliers or exposing their drafts. Selection is
component curation rather than a claim of procurement compliance or supplier
certification. A supplier may request platform review of undisclosed conflicts,
discrimination, policy breach, or misrepresentation, but has no automatic right
to publication.

A primary maintainer may form and lead a campaign directly without a mandatory
supplier competition. The page discloses when a steward is also a supplier.
Affiliation is expected and transparent rather than prohibited. V1 permits one
authorized component-maintainer approval; a future four-eyes policy may require
a distinct internal approver, but no unrelated external technical reviewer.

Before publication, the lead and every co-supplier confirm their participation,
public naming, representative authority, combined ceiling, external allocation
boundary, licensing position, and campaign responsibilities. Every component
whose official modification or release is promised has the required maintainer
confirmation. A campaign with uncertain upstream acceptance must be labelled as
an extension, fork, or unconfirmed contribution rather than promise an official
release.

Before the first pledge, a public campaign may be corrected, withdrawn, or
replaced with public version history and reason. After the first pledge, the
existing amendment protections apply. Competing suppliers cannot replace the
published team by republishing around funder consent.

### Campaign terms

Every published campaign identifies exactly one identity-verified, active
**lead supplier** and may identify any number of equally eligible
**co-suppliers**. The lead supplier is the single accountable contact for
campaign administration, coordinates the shared delivery, and submits it to
Bloei.me. Co-suppliers publicly confirm their participation before publication.
There is no separate supplier-quality verification or certification.

The campaign promises one combined outcome. Bloei.me does not assign scope,
work packages, prices, settlement shares, or invoices to individual suppliers;
the supplier team arranges those matters outside the platform. A campaign
records:

- One ISO-4217 currency and a maximum net price excluding tax
- Outcome and scope
- Milestones and objective acceptance criteria
- The stable, supported release in which delivery must be available
- A mandatory latest funding date
- A mandatory ultimate delivery date
- A configurable minimum pledge cap, defaulting to 1%
- A configurable review period, defaulting to 14 calendar days and restricted
  to 7–30 days
- A configurable acceptance threshold between 50% and 100%, defaulting to
  two-thirds; formal acceptance voting has no quorum

The published price ceiling, scope, criteria, dates, supplier team, and
governance settings become protected after the first pledge. They can change
only through the unanimous amendment process below.

The lead supplier is the operationally accountable party inside Bloei.me. Its
assigned supplier representatives administer the campaign, coordinate the
team, submit one combined delivery and final price, respond to funders, and
coordinate external settlement. Each co-supplier explicitly confirms before
publication that it may be named publicly, intends to participate, accepts the
combined campaign ceiling, and authorizes the lead to coordinate platform
actions. This does not make Bloei.me an arbiter of work allocation, revenue
sharing, or joint legal liability.

Before delivery submission, the lead attests for the team that it has authority
to publish the evidence, can release the result under the stated open-source
licence, has disclosed known third-party licence obligations, is not knowingly
publishing secrets or personal data, and has declared the complete combined
campaign price. Verification establishes organizational identity rather than
technical competence or platform endorsement.

Supplier representatives may be replaced by their organization without an
amendment. Replacing the lead organization requires a unanimous amendment. A
co-supplier withdrawal is handled internally only while the published team
does not change; removing or replacing it in the campaign record is material.
Disputes about work, revenue, invoicing, liability, or indemnification remain
outside Bloei.me and cannot increase funder obligations.

### Clarifications, additions, and material amendments

A clarification may explain existing terms but cannot alter scope, acceptance
criteria, price exposure, dates, supplier participation, or another obligation.
It is appended publicly with an audit trail and requires no funder consent.
Optional additional work uses a separate linked campaign so that the original
outcome and commitments remain independent.

A material change is permitted only before the first delivery submission and
uses a formal campaign amendment:

1. The lead supplier drafts a public before-and-after description, rationale,
   revised terms, and budget effect.
2. An in-scope component maintainer confirms that the proposal is a genuine
   scope or terms change rather than an ordinary supplier overrun.
3. New pledges and pledge-cap increases pause while consent is open.
4. Every existing funding organization receives a fresh consent window and
   must explicitly accept. Silence and rejection both withhold consent.
5. Bloei.me revalidates every affected budget. Any increased maximum exposure
   is reserved atomically, and changed dates must remain within budget validity.
6. The amendment becomes the canonical campaign version only if every funding
   organization consents and every reservation succeeds. Their existing
   pledges then carry to that version with the recorded consent.
7. Otherwise the amendment expires, the original version remains binding, and
   pledging resumes under its original terms.

The consent window defaults to 14 calendar days and may be set from 7–30 days.
Only one amendment may be open for consent; additional drafts do not affect the
campaign. All continuing and newly added co-suppliers confirm participation
before an in-scope component maintainer opens funder consent. An organization
may change or withdraw its position until activation. The lead may withdraw the
proposal.
The final valid consent activates the amendment immediately, so its confirmation
warns that it may be decisive and irreversible.

Increased exposure is provisionally reserved when each organization completes
consent and released if the amendment fails. Before delivery starts, a funder
may withdraw its original pledge and thereby leave the consent group; cap
reductions, new pledges, and cap increases pause. Locked pledges cannot leave.
An amendment does not pause funding or delivery deadlines: the original
campaign expires if its funding deadline passes before activation, while a
passed delivery deadline only marks the campaign overdue. A supplier or forced-
failure suspension pauses the amendment countdown.

Clarifications are public and notified to existing funders. A funder may
challenge one as material; a non-conflicted component maintainer or platform
operator then records whether it remains a clarification or must be proposed as
an amendment. Activated amendments form an immutable version chain with their
exact organization consents.

Adding or removing a co-supplier and replacing the lead supplier are material
changes. A supplier cannot use an amendment to pass on an ordinary overrun;
without changed scope, the published maximum remains the supplier team's risk.
The lead supplier may continue work at its own risk during consent but cannot
submit final delivery until the amendment closes.

Published campaigns are public in v1. Visibility and inherited access policy
remain explicit domain concepts so private campaigns can be introduced later
without redesigning the authorization model.

### Campaign lifecycle

The primary lifecycle states are `draft`, `funding`, `delivery`, `review`,
`objection open`, `acceptance vote`, `revision required`, `settled`, and
`delivered self-funded`. `expired`, `cancelled`, and `failed` are terminal
outcomes. Published campaigns never return to draft, and accepted delivery and
settlement creation occur atomically without an intermediate accepted state.

`amendment pending`, `supplier verification suspended`, `forced failure
proposed`, and `delivery overdue` are conditions on a lifecycle state rather
than combinatorial states. Holds pause only the actions and timers specified by
their policy. Missing the ultimate delivery date marks a campaign overdue but
does not automatically fail it. Terminal records remain public; archival is a
presentation property rather than another lifecycle state.

### Time, deadlines, and pauses

Bloei.me stores authoritative instants in UTC. Every campaign has one immutable
IANA timezone defaulted initially from deployment configuration. Public dates
name that timezone and may additionally show the viewer's local equivalent.
Server and database time govern actions; browser countdowns are informative
only.

Funding and delivery deadlines are exact local date-times. Interaction periods
use calendar days in the campaign timezone and close at the same local clock
time after the configured number of days, including across daylight-saving
changes. Deadlines are exclusive: an action commits only when its authoritative
timestamp is earlier than the deadline. No automatic weekend or public-holiday
adjustment applies.

The funding deadline races transactionally with pledging and automatic start.
A pledge that commits before it may start delivery at full coverage; an action
at or after it is rejected and an unstarted campaign expires. The ultimate
delivery deadline instead adds the public `overdue` condition without blocking
submission or failing the campaign.

Supplier suspension and proposed forced failure pause amendment consent,
delivery review, and acceptance voting by storing their remaining duration.
Funding deadlines, ultimate delivery dates, and budget expiry do not move; an
amendment is normally required to change them. Suspension of one funding
organization does not pause a campaign-wide timer.

Logical deadlines remain effective even if a background worker executes late.
Actions are classified by their stored timestamp, and a delayed closing job
records the result as effective at the intended deadline.

A platform operator may exceptionally correct a funding, amendment, review, or
voting deadline after verified platform or deployment-wide OIDC unavailability.
The corrected deadline is the later of the original deadline plus confirmed
outage duration and 24 hours after restoration. The old and new deadline,
outage interval, scope, operator, and reason are public and audited. Internal
organization disruption, an absent employee, or failed email does not qualify.
If a funding campaign was logically expired during that outage, this correction
is the sole exception that may restore it to funding; the expiry and restoration
both remain in history and no later lifecycle action may already have occurred.

Important interaction windows send opening, midpoint, 72-hour, 24-hour, and
result notifications, suppressing redundant reminders for short windows.
Delivery deadlines notify lead-supplier representatives and affected budget
managers before the date and periodically while overdue. In-app notice is
authoritative; email delivery failures are recorded but never pause time.

### Campaign permissions and conflicts

Component maintainers curate in-scope proposals, approve campaign publication
and official upstream claims, and confirm that a proposed amendment is
genuinely material. Lead-supplier representatives edit drafts, invite
co-suppliers, start delivery, propose amendments, submit
evidence and final price, respond to objections, request voting, declare
failure, and complete settlement notes. Co-supplier representatives confirm or
decline participation but cannot administer the campaign. Funding
representatives authorized for the backing budget create pledges and consent to
amendments; the funding organization owns one effective pledge, objection
position, and ballot.

Supplier organizations are ineligible to pledge to their own campaign and
therefore never review or vote on their own delivery. A person who represents a
campaign supplier cannot act for a funder on that campaign. Maintainer and
supplier affiliation is permitted when publicly disclosed. Steward-led
publication uses the applicable internal approval policy and names the
affiliation; v1 requires one authorized approval and future four-eyes policy may
require a distinct internal approver, but not an unrelated external reviewer. A
personally conflicted maintainer does not validate a disputed amendment.
Exceptional operator actions never impersonate an organization and require a
reason and immutable audit event.

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
- An optional allowlist of components whose formal campaign targets may use the
  budget; otherwise it is available network-wide
- Authorized funding representatives
- Lifecycle status and append-only history

Budget amounts, balances, cost centers, allocations, and authorized spenders
are visible only to authorized organization members. Budget values exclude VAT
and other taxes, matching campaign settlement values.

### Eligibility

A budget can back a pledge only when:

- The budget and campaign currencies match.
- The budget is active.
- Every formal campaign target is allowed by the budget's component scope, when
  such a scope is configured.
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
- Settlement-note completion does not alter budget consumption.

A budget total may be increased. It may only be reduced when the new total
still covers all consumed and reserved amounts. Expiration can be extended; it
can only be shortened when every active reservation remains eligible. Budgets
with financial history are archived rather than deleted. Adding a component to
a budget scope enables future use for matching campaigns. Removing one blocks
new reservations but preserves existing ones and their history.

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
- Bloei.me treats it as an organization-authorized conditional platform
  commitment. It is not money, an invoice, a purchase order, or proof that a
  legally enforceable external contract exists.
- Its worst-case monetary exposure is that percentage of the published maximum
  price, and the organization's budget reserves that complete amount.
- Confirmation explains that the campaign starts automatically at 100%
  coverage, may be started earlier by the lead supplier, and locks the
  commitment when delivery starts.
- The public record shows the organization, maximum cap, projected share,
  worst-case amount, campaign activity, and final net settlement amount.
- Representative identity, budget information, and settlement-note completion
  are private.

V1 uses a trust-based flow: the identity-verified, active organization
appoints its roles and an authorized representative confirms authority to
commit the selected budget. Bloei.me does not require or validate a signed
contract. Verification and approval do not prove statutory authority,
procurement compliance, creditworthiness, or guaranteed payment. Every
organization remains responsible for its legal, procurement, contracting, tax,
and external settlement requirements.

Before delivery starts, an organization can increase, reduce, move, or
withdraw its pledge. When aggregate caps reach 100%, the campaign atomically
starts delivery without reconfirmation.

There is one effective organization-owned pledge per campaign, regardless of
how many representatives administer it. The pledge progresses from active and
editable, to locked when delivery starts, to allocated at first delivery
submission, and to settled on acceptance. Expiry, cancellation, or failure
releases it according to the campaign state. An unrelated organization can
never receive a transferred pledge.

Below 100%, the lead supplier may manually start delivery at any coverage level,
including zero. This action is irreversible and publicly records the coverage
at which the supplier team accepted responsibility for the uncovered share.
Once delivery starts, existing pledges can no longer be reduced or withdrawn.

If the latest funding date arrives before automatic or manual start, the
campaign expires. Once delivery has started, that deadline no longer closes
pledging; new organizations may continue to join until delivery submission.

New identity-verified active organizations may pledge
throughout delivery, and existing organizations may increase their caps. Each
change updates the projected allocation and its transactional budget
reservations. Joining a campaign that is already delivering requires an
explicit acknowledgement that the new pledge locks immediately.

The selected backing budget may be replaced privately when the destination is
eligible and the acting person is authorized for both sides or is a budget
manager. New reservation and old release are atomic. Budget expiry never
silently breaks a locked commitment; an unresolved case becomes an internal
accounting exception.

An exceptional post-start reduction requires a deployment operator, a public
reason, and an immutable audit event. Any shortfall after work starts is the
supplier team's risk. A campaign started below full coverage prominently shows
the supplier team's uncovered percentage and worst-case monetary exposure.

Public campaign pricing shows the maximum price, aggregate coverage, committed
amount at the ceiling, current supplier-funded gap, and the coverage captured
at manual start. After delivery submission, it additionally shows the locked
final price and final organization allocations. The coverage indicator stops
at 100%, even if the sum of organization caps is higher.

Pledge confirmation snapshots the exact campaign version, maximum price,
scope, criteria, supplier team, deadlines, governance, cap, worst-case amount,
start and withdrawal consequences, and authorization policy. Later amendment
consents attach to their exact version.

If audited duplicate organizations both pledged before delivery starts, the
canonical organization selects one cap and backing reservation. If they merge
after start, both frozen allocation positions remain so other funders are not
recalculated, but their final values combine into one contribution for the
canonical organization. Legal succession and duplicate merges are continuity
events; ordinary pledge transfers remain prohibited.

### Fair-share calculation

Allocation uses max-min fair water filling against the campaign's final price:

1. Divide the remaining target equally among participating organizations.
2. Lock any organization whose maximum cap is below that equal share.
3. Redistribute the remaining target equally among the remaining organizations.
4. Repeat until the target is allocated or all caps are exhausted.

For caps of 10%, 30%, 100%, and 100%, the allocation is 10%, 30%, 30%, and
30%. If another organization with a cap of at least 22.5% joins, the allocation
becomes 10%, 22.5%, 22.5%, 22.5%, and 22.5%.

When combined caps reach at least 100%, water filling allocates the complete
final price. When the lead supplier starts and delivers below full coverage,
every organization reaches at most its cap and the supplier team absorbs the
unallocated remainder.

Pledge caps are stored in basis points. Monetary values are stored in currency
minor units. Rounding is deterministic and never exceeds the exact maximum
amount displayed during confirmation. The supplier team bears any unavoidable
fractional-currency shortfall and delivery overruns, and retains any delivery
efficiency margin.

## Delivery, review, and settlement

### Delivery evidence

The lead supplier publishes the supplier team's sanitized text, external links,
and raster images as evidence. V1 does not accept arbitrary document uploads.

With the first delivery submission, the lead supplier declares a final net price
from zero through the published maximum. Bloei.me does not require an itemized
cost statement or audit: the supplier team is free to charge less, while the
published ceiling remains the funders' guaranteed worst case.

The first delivery submission atomically:

- Permanently closes pledging
- Locks the final price so later evidence resubmissions cannot change it
- Freezes the final allocation
- Freezes the set of voting organizations
- Releases budget reservations above final allocated amounts
- Opens the configured review period

If no organization has pledged when delivery is submitted, Bloei.me instead
marks the campaign `delivered self-funded`. It publishes the evidence and final
price but creates no funder review, settlement, or settlement notes.

### Pledger review

Funding representatives assess the complete outcome against the published
criteria. If the review period ends without an open objection, delivery is
accepted and settlement is created atomically. No independent reviewer is
required.

Only a frozen funding organization may object. Its public organization-owned
objection must arrive before the deadline, reference at least one criterion,
and explain what is absent or insufficient; the acting employee remains
private. Additional scope, regret about accepted terms, a price within the
ceiling, internal pledge disputes, supplier arrangements, and unrelated support
requests are not valid grounds. Bloei.me does not assess supplier costs or
margin.

An objection prevents automatic acceptance but does not end the review window:
other funders retain the complete period to inspect and object. It stays open
until the organization withdraws it, a formal resubmission supersedes it, or a
vote decides it. Objector silence never withdraws it. The lead supplier may ask
for detail, respond, improve evidence, correct work and resubmit, contest it, or
declare failure. There is no separate response deadline; ordinary overdue and
forced-failure governance handles prolonged inactivity.

A formal resubmission supersedes but preserves every objection to the previous
submission and starts a complete new review period for all funders. The final
price, allocation, and voting group remain locked. A still-dissatisfied funder
must object to the revised submission again.

Several organizations may object to one criterion and one organization may
object to several. Similar items may be grouped visually, but organization
positions stay distinct. The lead must respond to every open objection before
requesting one vote on the complete outcome. Formal voting cannot begin until
the full review period ends.

If all objections are withdrawn, ordinary review resumes with its remaining
time or accepts immediately when the original deadline has passed. During a
vote, withdrawing the written objection changes that organization's ballot to
`accept`, subject to further change before closing.

A contested delivery opens a formal acceptance window equal to the configured
review period:

- The organizations frozen at first delivery submission are eligible and have
  equal voting power regardless of pledge amount.
- Each has one organization ballot with `accept` or `reject`; an open objector
  begins with `reject`.
- A new explicit rejection must reference a criterion and give a public reason.
- Taking no action is deemed acceptance. There is no quorum.
- At closing, acceptance is
  `(eligible organizations - rejecting organizations) / eligible organizations`.
  Exact equality with the campaign threshold passes.
- Organizations may change their position until closing.
- Ballots remain hidden during voting, although a public objection naturally
  reveals its organization's initial rejection. After closing, the public
  record shows explicit acceptance, deemed acceptance, or criterion-based
  rejection for every organization.
- The window closes early only when every eligible organization explicitly
  accepts.
- Bloei.me sends recorded in-app and email notices to funding representatives
  and organization administrators, plus reminders. An email delivery failure
  does not pause the window.

If the threshold passes, settlement and settlement notes are created
atomically, budget reservations are consumed, and remaining objections are
recorded as overruled by the funders. If it fails, the campaign enters
`revision required` without changing price, allocation, or pledges. The lead
may resubmit without an automatic attempt limit or declare failure; partial
acceptance and settlement do not exist.

Moderators may hide abusive, unlawful, or personal wording without silently
removing the organization's position. Obvious spam, duplicate technical
submissions, or ineligible objections may be removed with a recorded reason,
but a maintainer cannot dismiss a substantive objection merely for disagreeing.
Acceptance cannot be reopened inside Bloei.me; later support, security, legal,
or corrective work follows a separate process and preserves settlement history.

### Suspension, cancellation, and failure

Before delivery starts, the lead supplier or an in-scope component maintainer
may cancel a campaign with a public reason. All pledges and reservations release
immediately.

After delivery starts, cancellation is unavailable. The lead supplier may
publicly declare failure at any time. A non-conflicted in-scope component
maintainer or deployment operator may propose forced failure with a public
reason; this opens a seven-day lead-supplier response period and pauses new
pledges, cap increases, review, voting, and settlement. The proposer may withdraw
the proposal, but a deployment operator distinct from the proposer confirms
terminal failure afterward. A deployment operator may bypass the delay for a
legal, fraud, or security emergency. Once failure releases reservations, it
cannot be reopened.
Failure creates no settlement notes, releases reservations, and preserves the
public outcome and produced open-source work.

If any supplier organization loses verified identity or active platform
participation, the campaign is suspended. New pledges, cap increases, delivery
submission, review, voting, and settlement are blocked, and active review or
voting countdowns pause. Existing commitments remain reserved. Restoration
resumes the remaining timer duration; the original funding and delivery
deadlines do not change. An in-scope component maintainer or deployment operator
may instead use the public failure process. Verification or participation loss
after accepted settlement does not alter that settlement.

### Settlement notes

Accepted delivery creates one immutable settlement from the locked final price
and frozen allocation, then consumes the associated budget reservations. When
organization caps do not cover the complete final price, a public non-invoice
supplier-contribution line reconciles the remainder. A zero final price
produces a public zero settlement, releases all reservations, and creates no
actionable settlement notes.

Bloei.me:

- Publishes final organization shares and net amounts
- Exports authorized settlement data as CSV and JSON
- Creates one settlement note per funding organization stating its final net
  campaign contribution without naming a payee
- Lets an authorized lead-supplier representative change that note between
  `open` and `completed`, with completion time, reason on reopening, and audit
  history
- Does not collect money
- Does not generate tax invoices
- Does not calculate tax

`completed` means that the lead supplier confirms the supplier team considers
that organization's external settlement handling complete. It is not proof of
a bank payment and reveals neither recipient nor division. Co-suppliers report
their information to the lead outside Bloei.me. The funding organization can
view but not change the private completion status. Reopening is allowed with a
recorded reason and never changes settlement or consumed budget.

The supplier team arranges payees, invoices, taxes, and division externally.
Bloei.me stores no payee, bank details, invoice number or document, supplier
allocation, VAT calculation, due date, instalment, collection, or dispute. A
failed or entirely self-funded campaign creates no organization settlement
note; future split-budget allocation still produces one note per funding
organization.

An unsuccessful campaign creates no settlement note. The failure,
evidence, and produced open-source work remain visible.

### Historical integrity and redaction

Pledges and settlements snapshot the organization's legal identity at the time
of the action while linking to its current canonical profile. Renames and
audited merges therefore preserve the name and registration data under which a
commitment was made.

Published campaign terms, evidence, objections, ballots, and settlements are
immutable. Only a platform operator may exceptionally redact content for legal,
privacy, or security reasons. Redaction leaves a public tombstone and immutable
audit event rather than erasing the record.

## Legal and contracting boundary

The initial pilot relies on identity-verified, active organizations and
authorized representatives rather than platform-required signed agreements. A
pledge is described as a recorded organizational funding commitment. The
representative confirms authority, intent, budget use, and the organization's
responsibility for procurement, internal approval, and legal review. Bloei.me
does not claim to form or determine an enforceable contract. The payee-free
settlement note remains informational and external processes determine legal
counterparties, recipients, invoices, and tax treatment.

Future municipal use may require an external signed agreement before a pledge
becomes effective. V1 always uses `contract not required` and provides no
agreement persistence, upload, signing, or activation gate. A later
implementation begins from a concrete participant requirement and should
integrate a suitable trust service rather than create its own signature
mechanism. The current legal assumptions, working retention schedule, and
review questions are maintained in [legal.md](legal.md).

### Service and sustainability boundary

Bloei.me supports accounts, verification, budgets, pledges, moderation,
campaigns, evidence, and settlement records. It displays maintainer-owned
destinations for component bugs, product support, feature requests, and
vulnerability reports without proxying tickets or promising maintainer service
levels.

Public browsing and the pilot remain free. A later hosted-service business
model may charge a monthly amount per active verified organization. Pricing,
billable activity, and community waivers require pilot evidence. V1 implements
no subscription billing, campaign percentage, per-seat fee, or transaction fee.

## Technical architecture

### Application

- Kotlin on JVM 25
- Spring Boot 4
- Spring Modulith modular monolith
- Spring MVC, Thymeleaf, and HTMX
- PostgreSQL, Exposed JDBC SQL DSL, and Flyway
- Spring Security OIDC
- Dutch and English message bundles
- Locally hosted, progressively enhanced, WCAG 2.2 AA user interface

Modules cover identity, organizations, components, repositories, programs,
budgets, proposals, campaigns, pledges, delivery, settlement, moderation,
notifications, and auditing.

Core value types include:

- `Money(currency, minorUnits)`
- `PercentageCap(basisPoints)`
- `CampaignPrice(maximum, finalPrice?)`
- `CampaignSupplierTeam(leadSupplier, coSuppliers)` without work or price
  allocation
- `CampaignVisibility`
- `OrganizationIdentityStatus(provisional, verified, reviewRequired, closed,
  merged)`
- `PlatformParticipationStatus(active, suspended, closed)`
- `OpenSourceComponent` identity, hierarchy, source locations, licences, and
  versioned stewardship
- Provider-neutral `CodeRepository`, `ComponentRepositoryLink`, provider
  observations, and typed external-work references
- Proposal and campaign component targets with relationship, upstream status,
  promised release, and maintainer confirmation
- Optional programs as non-isolating curated collections
- Organization-owned membership roles
- Versioned organization authorization policies and requests, with v1 enforcing
  one immediate approval
- Future external contract requirements and protected agreement evidence, with
  v1 always using `contract not required`
- `CampaignDeadlinePolicy(timezone, fundingDeadline, deliveryDeadline)` with
  UTC instants and an immutable IANA zone
- `AcceptancePolicy(reviewDays, approvalThresholdBps)`
- `OrganizationBallot(accept, reject)` with deemed acceptance when absent
- `BudgetValidity(validFrom, expiresOn, processingBufferDays)`
- Optional explicit component scopes on budgets
- Primary campaign lifecycle states plus orthogonal hold and overdue conditions
- Settlement lines for organizations and supplier contributions
- `SettlementNoteStatus(open, completed)` controlled by the lead supplier
- Versioned campaign amendments with explicit organization consents
- Versioned pledge attestation
- Moderation cases, reports, target references, decisions, restrictions,
  appeals, notices, and append-only case events
- Provider-neutral `ModerationAssessment` values and deterministic policy
  decisions, without model access to domain commands

PostgreSQL authorization follows explicit organization, component, program,
campaign, and moderation-case scopes and is backed by application-level checks.
State-changing workflows use transactions, optimistic or explicit locking where
required, and append-only audit events.

### Evidence, jobs, and notifications

- Store v1 evidence bytes in PostgreSQL behind an object-storage port that can
  later read local-filesystem and S3-compatible backends during migration.
- Accept static JPEG and PNG only after byte-based decoding. Allow at most 20
  images per revision and 15 MiB, 24 megapixels, and 8192 pixels per axis for
  each image; require meaningful alt text.
- Apply orientation, normalize sRGB, strip metadata, and re-encode a sanitized
  full-resolution master plus a 1600-pixel preview. Reject WebP, GIF, SVG, AVIF,
  APNG, multi-frame, malformed, and disguised input.
- Process uploads asynchronously from private quarantine. Optional ClamAV
  scanning uses a generic scanner port and fails closed when enabled but
  unavailable. PDF uploads are a possible later feature, not part of v1.
- Store authored prose as versioned restricted Markdown while presenting a
  constrained WYSIWYG editor. Disable raw HTML; allow only paragraphs, H2-H4,
  quotations, lists, emphasis, code, safe links, hard breaks, and managed
  sanitized images with meaningful alt text. Render and sanitize authoritative
  HTML on the JVM and keep that projection disposable.
- Use an outbox-backed worker for email, funding deadlines, budget warnings,
  review and voting timers, reminders, paused countdowns, and automatic
  acceptance.
- Evaluate action eligibility against authoritative stored instants so delayed
  jobs and browser clocks cannot change outcomes.
- Support public audited deadline correction for verified platform outages.
- Deliver notifications through SMTP and an in-app inbox.

### Interfaces and future integrations

Stable public pages cover components, programs, proposals, campaigns,
organizations, evidence, and settlements. Private management pages cover
budgets, moderation, verification, and settlement-note completion.

V1 publishes a versioned REST API with anonymous public reads and delegated-user
OAuth parity for organization, maintainer, supplier, funder, reporting, and
appeal-submission workflows. Platform verification, moderation decisions,
exceptional operations, and security administration remain internal. Public
and authorized cursor feeds support polling; service accounts, outbound
webhooks, and dynamic OAuth client registration are deferred. The normative
interface and GitHub behavior are defined in
[api-and-integrations.md](api-and-integrations.md).

Internal ports continue to isolate organization verification, notifications,
object storage, settlement export, accounting, repository providers, and AI
moderation. The GitHub adapter validates and refreshes allowlisted public
metadata without an app installation or write permission. V1 has no MCP
endpoint; a later adapter will call application services directly after the
domain and REST contracts stabilize.

### Deployment

- Publish one OCI image for hosted and self-hosted installations.
- Provide a PostgreSQL-first Compose deployment. Include evidence bytes in
  database backup and recovery, targeting a one-hour RPO and eight-hour RTO for
  the hosted pilot.
- Keep OIDC and SMTP configurable external services.
- Keep hosted protected data in the EU/EEA. Add local-filesystem and
  S3-compatible storage adapters later without changing stable media URLs; the
  filesystem adapter is only for explicit single-node/self-hosted use.
- Include readiness and health endpoints, structured logs, metrics, database
  migrations, backup guidance, and reverse-proxy documentation.
- Keep deployment provisioning and hosted commercial agreements operator-managed
  in v1.

## Implementation sequence

1. **Foundation:** build, license, CI, changelog, database migrations, module
   boundaries, and bilingual design system.
2. **Identity and component catalog:** OIDC, organization identity verification,
   account control, platform participation, component identity, stewardship,
   roles, and auditing.
3. **Budgets:** budget administration, spender authorization, ledger,
   eligibility, transactional reservations, transfers, and inline creation.
4. **Public workflow and API:** components, repository links, GitHub public
   metadata, optional programs, private ideas, proposals,
   endorsements, campaign formation, supplier selection, comments, reporting,
   reversible moderation, optional AI assistance, appeals, and notifications.
5. **Funding:** supplier teams, campaign versions and amendments, deadlines,
   attestations, budget-backed pledges, fair allocation, and atomic campaign
   start.
6. **Delivery and settlement:** evidence, allocation freeze, review,
   objections, voting, budget consumption, exports, and settlement notes.
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
- Test campaign versioning, unanimous explicit amendment consent, non-response,
  failed budget revalidation, deadlines, operator exceptions, and overdue
  delivery.
- Test exclusive deadline boundaries, pledge/expiry races, IANA timezone and
  daylight-saving behavior, weekend neutrality, delayed jobs, paused remaining
  duration, fixed campaign dates, outage correction, and reminder suppression.
- Test lead- and co-supplier verification, confirmation, permissions, and
  material supplier-team changes without modelling work allocation.
- Test every campaign transition, illegal transition, terminal state, hold
  restoration, and overdue condition independently.
- Test organization-owned actions, authority revocation, concurrent
  representative changes, conflict exclusions, and one-approval v1 behavior
  against future multi-approval boundaries.
- Test versioned trust-based pledge confirmations and keep future contract
  evidence inaccessible and inactive in the v1 policy.
- Test automatic start at full coverage and irreversible manual start at zero,
  partial, and full coverage.
- Reject a final price above the ceiling and every attempt to alter it after
  the first delivery submission.
- Verify full, partial, and zero-price settlement, including supplier-funded
  shortfalls and released budget reservations.
- Test negative-consent acceptance, explicit and deemed positions, exact
  thresholds, changed ballots, hidden positions, and unanimous early closing.
- Test early and multiple criterion-based objections, full review before voting,
  withdrawal, supersession on resubmission, required rejection reasons,
  moderation without position loss, and atomic settlement after acceptance.
- Test authoritative-source identity verification, initial account control,
  platform activation, suspension, restoration, event-driven review, appeals,
  role replacement, administrator recovery, minimal evidence retention, and
  audited duplicate merges.
- Test component identity, hierarchy, stewardship claims, transfers, forks,
  official-release confirmation, campaign targets, and program curation.
- Test optional component-scoped budgets against single- and multi-component
  campaigns.
- Test campaign cancellation, supplier suspension with paused timers,
  voluntary failure, forced-failure notice, and emergency bypass.
- Test self-funded completion and partial settlements with a supplier-
  contribution line.
- Test settlement-note creation, lead-only completion and audited reopening
  without payees, supplier allocations, or changes to settlement and budget
  consumption.
- Test identity snapshots, personal anonymization, merge redirects, and
  exceptional redaction tombstones.
- Test reporting, target permissions, reversible restriction overlays, public
  tombstones, reasoned notices, appeals, emergency actions, and preservation of
  structured organization positions.
- Test AI assessment schema validation, prompt-injection isolation, model and
  policy versioning, temporary quarantine and restoration, human overrides,
  provider failure, disabled-AI operation, and the prohibition on model-driven
  domain commands.
- Verify object-scoped authorization, role boundaries, CSRF protection, content
  sanitization, and image validation.
- Run PostgreSQL integration and migration tests with Testcontainers.
- Run Dutch and English browser journeys and automated WCAG 2.2 AA checks.
- Contract-test OpenAPI, OAuth scopes and audience, delegated authorization,
  public/private projections, ETags, idempotency, and REST/web command parity.
- Test public and authorized event-feed visibility, ordering, opaque cursors,
  at-least-once delivery, expiry, and resynchronization.
- Test repository URL normalization, SSRF protection, GitHub refresh, rename,
  archive, provider failure, rate limiting, and the prohibition on external
  lifecycle automation.

### Pilot acceptance

The Epistola pilot must:

- Receive budget-backed pledges from at least three identity-verified, active
  organizations.
- Preserve the exact trust-based authority confirmation for each pilot pledge.
- Reject a concurrent or direct budget overcommit.
- Start automatically when coverage reaches 100%.
- Demonstrate manual early start and the public supplier-risk disclosure.
- Reallocate projected shares after a late pledge.
- Lock a lower final price, freeze allocation, and release surplus reservations
  at delivery submission.
- Complete normal review and a negative-consent acceptance vote.
- Demonstrate a report, reversible restriction, tombstone, and appeal without
  changing the underlying organization position.
- Consume final budget amounts at settlement.
- Produce reproducible CSV and JSON exports.

## Explicit boundaries

- `bloei.me` is the controlled product domain; trademark registration is out of
  scope.
- Epistola supplies the first components and pilot campaign, but the core
  contains no Epistola-specific or GitHub-only domain concepts.
- Published campaigns and limited moderation tombstones are public in v1.
  Budgets, cost centers, representatives, protected moderation case data, and
  settlement-note completion remain private.
- Every pledge requires one budget in v1; the data model prepares for several
  budgets per pledge later.
- Organizations, components, and budgets are canonical within one deployment;
  campaign and budget eligibility remain explicit.
- Bloei.me manages commitments and settlement evidence, not bank funds or
  statutory accounts.
- V1 trusts identity-verified, active organizations and authorized
  representatives without requiring signed contracts; it makes no legal,
  procurement, supplier-quality, or payment guarantee.
- Each campaign has one lead supplier and may have co-suppliers, but Bloei.me
  does not divide their work, price, settlement, or external invoices.
- Payees, payments, invoice administration, advance or milestone invoicing, tax
  calculation, debt collection, hosted subscription billing, campaign fees,
  support management, private GitHub access, GitHub writes, outbound webhooks,
  service accounts, and MCP are outside v1.
- Component support and vulnerability handling remain in maintainer-owned
  systems; Bloei.me provides routing links only.
