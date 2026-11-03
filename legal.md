# Bloei.me legal and compliance considerations

Status: Exploratory working document

Last updated: 2026-08-25

This document records the current product assumptions, known legal questions,
and intended review work for Bloei.me. It is not legal advice and does not claim
that a campaign, pledge, or settlement complies with the law of any particular
organization or jurisdiction.

The product direction remains normative in [plan.md](plan.md), accepted choices
and their rationale are in [decisions.md](decisions.md), and concrete journeys
are in [scenarios.md](scenarios.md). A possible procurement-backed funding
model for municipalities is evaluated in the non-normative
[public-sector procurement discussion paper](public-sector-procurement.md), and
the underlying Dutch procurement-law research is recorded in
[aanbestedingsrecht-onderzoek.md](aanbestedingsrecht-onderzoek.md).

## Initial working position

The first Bloei.me pilot uses trust-based organization commitments:

- A deployment operator verifies legal identity and initial account control once;
  the organization accepts platform terms to activate network-wide participation.
- Organization administrators appoint funding and supplier representatives.
- Budget authorization identifies who may use an organization budget.
- An authorized funding representative confirms a pledge through Bloei.me.
- Bloei.me does not require an uploaded or electronically signed contract before
  activating that pledge in v1.
- Suppliers knowingly rely on the platform commitment without Bloei.me
  guaranteeing legal enforceability or payment.

Identity verification and platform participation are distinct. Neither is legal
advice, procurement approval, proof of a representative's statutory signing
authority, credit assessment, supplier-quality certification, or a guarantee
that an expenditure is lawful. The organization remains responsible for its
internal authority and applicable process.

## Functional meaning of a pledge

Bloei.me treats a pledge as a recorded, organization-owned funding commitment
with conditions defined by the platform workflow:

- It publicly identifies the funding organization and its maximum cap.
- It reserves private organization budget.
- It is editable or withdrawable before delivery starts.
- It locks under platform rules when delivery starts.
- It grants review and voting rights after delivery submission.
- Accepted delivery calculates the organization's final net contribution.

A pledge is not money, an invoice, a purchase order, an identified supplier
allocation, or proof that a legally enforceable contract exists. The platform
does not determine whether the contribution is procurement, sponsorship,
subsidy, joint commissioning, or another legal arrangement.

The pledge confirmation should use plain wording such as:

> I confirm that I am authorized by this organization to make this commitment
> and use the selected budget. I understand when it locks and that legal,
> procurement, contracting, tax, and external settlement requirements remain
> the organization's responsibility.

Bloei.me snapshots the confirmation wording and campaign version. V1 relies on
that representation without asking the platform operator to validate the
underlying organizational decision.

## Functional meaning of supplier participation

Each supplier confirms its identity and campaign participation. The lead
supplier accepts operational responsibility inside Bloei.me and coordinates the
supplier team. These confirmations do not establish a platform-defined division
of work, revenue, invoices, payees, liability, or indemnification.

The supplier team is responsible for arranging any necessary legal relationship
with funders and among its members. Bloei.me does not guarantee that a pledge is
collectable. A supplier choosing to start below full coverage also accepts the
uncovered commercial risk already described in the product plan.

## Settlement notes

After accepted delivery, Bloei.me creates one note per funding organization
stating its final net contribution without a payee. This is an informational
campaign record, not an invoice or complete payment agreement.

The lead supplier marks the note `completed` when the supplier team considers
external handling complete. The status is not bank evidence and does not reveal
who received money. An open note is handled outside Bloei.me; the platform does
not collect, enforce, calculate interest, suspend the funder automatically, or
resolve a dispute.

## Public-sector and procurement considerations

Dutch municipalities are contracting authorities under the Aanbestedingswet
2012. Whether a particular campaign contribution is a public contract or uses
another lawful basis depends on the facts, value, parties, organizational
policy, and applicable rules. Open-source publication does not itself establish
an exemption.

Bloei.me must not display a claim that a campaign or pledge is “procurement
compliant.” Each organization makes its own assessment and records a versioned
confirmation of responsibility for its procurement route, internal approvals,
and legal review. One organization's legal basis does not automatically cover
another organization in the same campaign.

Before broader municipal use, specialist counsel and public procurement
professionals should review at least:

- Campaign and pledge formation under Dutch contract law
- Authority of organization representatives
- Public procurement and aggregation of related expenditure
- Sponsorship, subsidy, state-aid, and joint-commissioning characterizations
- Multi-supplier contracting and the absence of a platform-defined payee
- VAT, invoicing, and cross-border supplier implications
- Remedies for non-performance and non-completion

### Component stewardship and campaign formation

Bloei.me verifies factual evidence that an organization maintains an open-source
component and records campaign-specific upstream confirmations. Stewardship is
not a grant of exclusive commercial rights, a supplier certification, or proof
that another supplier cannot lawfully deliver compatible work.

Component maintainers may curate proposals, compare private supplier drafts,
lead campaigns themselves, and publish a concise selection rationale. That
workflow is product curation, not a platform claim that a public procurement
procedure or competitive award occurred. Selecting the primary maintainer,
choosing a lower or higher maximum price, encouraging a joint supplier team, or
publishing a third-party extension may each have different procurement and
conflict implications for a funding organization. Every funder remains
responsible for determining its lawful external basis before pledging.

Official, extension, fork, and unconfirmed upstream labels describe the promised
technical relationship. They do not determine intellectual-property ownership,
trademark permission, contributor licence requirements, warranty, support, or
legal responsibility. Component and campaign confirmations must therefore use
careful factual language and retain versioned evidence.

## Future signed-contract capability

A later release may let the platform, an organization, or a budget require an
external signed agreement before a pledge becomes effective. V1 always uses
`contract not required`; it adds no agreement persistence, upload, signature,
or activation gate. Implementation begins only from a concrete participant
requirement that identifies parties, procurement route, signing system,
precedence, and evidence.

The future policy should support:

- `contract not required` for the initial trust-based flow
- `external contract required` for a particular organization or budget
- A pending pledge that does not become public or count toward coverage until
  the requirement is satisfied
- Private metadata for external reference, parties, scope, campaign or budget,
  maximum amount and currency, effective and expiry dates, signature status,
  signing method, and a document hash or protected location
- Versioning so an amendment can determine whether renewed signatures are
  required
- Audit history without publishing the agreement by default

Bloei.me should integrate with an appropriate trust or signature service rather
than implement cryptographic signing itself. EU eIDAS rules recognize the legal
effect and evidential admissibility of electronic signatures and give qualified
electronic signatures the equivalent legal effect of handwritten signatures,
but applicable form and authority requirements still require legal review.

A future contract may identify actual counterparties and payees even though the
public Bloei.me settlement note remains payee-free. The platform must not infer
those parties from the supplier list.

## Financial-regulation boundary

Bloei.me is intended to fund delivered open-source outcomes. It does not offer
loans, transferable securities, investment returns, custody, deposit taking, or
payment services. EU Regulation 2020/1503 defines its crowdfunding service
around facilitating loans or placing and transmitting orders for transferable
securities and admitted instruments. The current product appears materially
different, but qualified counsel should confirm the regulatory classification
before public launch.

Bloei.me must continue to avoid holding or routing funds unless a separately
reviewed and appropriately regulated payment model is deliberately introduced.

## Privacy and public records

Bloei.me's working privacy position is transparency at the organization level
and data minimization at the person level. Public campaign records identify
legal organizations and their commitments, amendments, objections, ballots,
deliveries, and final contributions. Acting employees, memberships, budgets,
verification evidence, settlement-note completion, and security data are not
public merely because they support a public organization action.

The GDPR applies to information about identified or identifiable natural
persons. It generally does not cover information concerning legal persons as
such, but organization records may still contain personal data, particularly
for sole proprietors, named representatives, free-text objections, and small
organizations. Bloei.me therefore cannot treat every organization-associated
field as non-personal.

The product should apply purpose limitation, data minimization, storage
limitation, and privacy by design and default. In practice this means:

- Avoid raw identity documents when authoritative registry references suffice
- Separate public organization projections from protected operational records
- Restrict and audit access to verification, recovery, actor, fraud, and
  security evidence
- Define retention periods by record category rather than retaining all private
  data with the permanent public campaign history
- Sanitize free text and evidence before publication and strip image metadata
- Anonymize personal profiles on deletion while preserving organization-owned
  history where there is a documented lawful basis
- Leave a public tombstone when exceptional redaction is necessary

The hosted pilot's working position treats the deployment operator as controller
for core platform purposes, participating organizations as independent
controllers for their own purposes, and instructed infrastructure providers as
processors. It does not assume blanket joint controllership. A self-hosted
operator assumes deployment-level controller responsibilities. Component
stewardship, supplier, funder, moderator, and future program-curator labels do
not assign those legal roles by themselves. Specialist review must confirm the
actual purposes, means, contracts, lawful bases, privacy notices, data-subject
request handling, processor agreements, breach procedures, and whether a data-
protection impact assessment is required.

### Working retention schedule

The pilot applies category-specific defaults while specialist review remains
open:

- public campaign, proposal, component, and organization-attributed history:
  service lifetime, with review when the hosted service closes;
- core campaign, pledge, budget-allocation, settlement, and audit records: seven
  years after terminal state;
- organization identity decisions and snapshots: active life plus five years;
- raw identity-verification evidence: no more than 90 days after the decision;
- membership and authority history: two years after the relationship ends;
- dismissed low-risk moderation material: six months; ordinary decided cases:
  two years; serious, appealed, fraud, or safety cases: five years;
- raw authentication, access, and security logs: 90 days; derived security
  summaries: one year; confirmed incident records: five years;
- notification delivery diagnostics: 90 days; idempotency records: 24 hours;
  and rolling backups: 35 days.

Successful and rejected raw image uploads are deleted immediately after
terminal processing. Abandoned chunks expire after 24 hours. Sanitized accepted
evidence and public moderation tombstones follow their parent public record.
A documented legal hold suspends deletion only for its recorded scope and
reason. Backup expiry eventually applies deletions without selectively editing
immutable backup sets.

## Content moderation and AI assistance

Bloei.me hosts organization and user-supplied ideas, comments, campaign text,
evidence, and objections. Its exact status and obligations under the Digital
Services Act must be reviewed rather than inferred from the product label or
size. The product nevertheless prepares accessible illegal-content notices,
timely and non-arbitrary handling, reasoned restriction notices, protected
reporter information, internal review, and auditable use of automated means.

Platform terms must distinguish illegal-content decisions from enforcement of
Bloei.me rules and clearly describe grounds, restrictions, algorithmic tools,
human review, and redress. Any applicable transparency reporting must account
for reports, actions, automation, accuracy, error rates, safeguards, complaints,
and reversals. Campaign tombstones and aggregate reporting must not expose
reporters, protected originals, personal actors, or fraud and security evidence.

AI moderation remains a future assistive capability and is not implemented in
v1. A future model may warn, classify, prioritize, highlight, summarize, or
draft private moderator text, but it cannot impose restrictions, final
organization sanctions, appeals, or funding and delivery decisions. Staff who
operate and review it need appropriate policy, language, safety, and AI
literacy. Provider contracts, processing locations, retention, training use,
security, model changes, performance testing, and incident handling require
review before enabling a classifier.

The AI Act classification and duties applicable to Bloei.me as a deployer or
possible provider must be assessed against the actual selected model,
integration, intended purpose, and deployment. The current design does not
claim that moderation assistance is high-risk or exempt. AI-generated public
decision text receives human editorial review; automated involvement is
disclosed to affected users in moderation notices.

## Service-support boundary

Bloei.me supports accounts, verification, budgets, pledges, moderation,
campaigns, evidence, and settlement records within its own workflow. Component
product questions, bugs, feature support, and vulnerability reports are routed
to maintainer-owned systems displayed by Bloei.me. The platform does not proxy
those tickets, inspect private vulnerability reports, or promise a maintainer's
response time.

## Platform terms and records needed before launch

The pilot should have proportionate, reviewed documents for:

- Platform and acceptable-use terms
- Organization representation and role assignment
- Campaign and supplier participation
- Pledge and amendment confirmations
- Privacy, data processing, retention, and public records
- Platform/operator and component-role responsibilities
- A clear procurement and legal-responsibility disclaimer

Bloei.me should version material terms and preserve the exact version associated
with organization enrollment, supplier confirmation, pledging, amendment
consent, and delivery submission.

## Questions reserved for legal review

1. At what point, if any, does the platform interaction itself create a contract?
2. Can a payee-free pledge be enforceable, and who would be entitled to enforce
   it?
3. What external agreement is appropriate for a municipal campaign with several
   suppliers and funders?
4. When must related campaign contributions be aggregated for procurement?
5. Which representative authority and evidence are sufficient per organization?
6. Which terms govern cross-border funders or suppliers?
7. What liability and limitation terms are appropriate for the platform
   operator, component maintainers, program curators, funders, lead supplier,
   and co-suppliers?
8. What retention and access rules apply to public commitments, verification
   evidence, audit records, and future signed agreements?
9. Which party is controller, joint controller, or processor for each processing
   purpose in hosted and self-hosted deployments?
10. Which lawful basis supports each public and protected record, and how should
    access, rectification, objection, erasure, and restriction requests affect
    immutable organization history?
11. Do the scale, public-sector participation, identity checks, or other risks
    require a data-protection impact assessment?
12. Which DSA service category, obligations, exemptions, reporting rules, and
    redress mechanisms apply to hosted and self-hosted Bloei.me deployments?
13. Which moderation records must be submitted to authorities or transparency
    systems, and which information must remain protected?
14. How does the AI Act classify each configured moderation integration, and
    which provider, deployer, transparency, literacy, and oversight duties apply?
15. When could component curation or supplier selection be treated as part of a
    procurement, joint commissioning, subsidy, or other regulated award process,
    and which conflict and transparency safeguards would then be required?

## Primary references

- [Dutch Civil Code, Book 6](https://wetten.overheid.nl/BWBR0005289/), including
  Article 217 on agreement through offer and acceptance
- [Aanbestedingswet 2012](https://wetten.overheid.nl/BWBR0032203/), including
  the definitions of contracting authorities and public service contracts
- [EU Regulation 2020/1503](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32020R1503)
  on European crowdfunding service providers
- [EU Regulation 910/2014, eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32014R0910),
  especially Article 25 on electronic signatures
- [EU Regulation 2016/679, GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj),
  especially Articles 5, 17, 25, and 32 and Recitals 14 and 26 on personal data,
  erasure, security, data minimization, and privacy by design and default
- [EU Regulation 2022/2065, DSA](https://eur-lex.europa.eu/eli/reg/2022/2065),
  especially Articles 14–17 and 20 on terms, moderation transparency, notices,
  reasons, automated means, and complaints
- [EU Regulation 2024/1689, AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj),
  including Articles 2, 4, and 50 on scope, AI literacy, and transparency
- [PIANOo: Open Source Aanbesteden](https://www.pianoo.nl/nl/actueel/agenda/open-source-aanbesteden-hoe-werkt-dat)
  as public-procurement practice context

Verification implementation should also consult:

- [KVK Handelsregister API](https://developers.kvk.nl/nl/documentation/zoeken-api)
  for Dutch registration lookup and active-status data
- [Register van Overheidsorganisaties](https://organisaties.overheid.nl/) and
  its government-domain register for Dutch public bodies
- [European Commission VIES](https://ec.europa.eu/taxation_customs/vies/technicalInformation.html)
  as supplementary VAT-status evidence, not proof of general authority
- [eHerkenning authorization](https://www.eherkenning.nl/en/authorisation) for a
  possible future organization-control integration

These references are starting points, not a legal opinion. They must be checked
again when legal terms or signed-contract support are designed.
