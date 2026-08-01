# Bloei.me legal and compliance considerations

Status: Exploratory working document

Last updated: 2026-08-01

This document records the current product assumptions, known legal questions,
and intended review work for Bloei.me. It is not legal advice and does not claim
that a campaign, pledge, or settlement complies with the law of any particular
organization or jurisdiction.

The product direction remains normative in [plan.md](plan.md), accepted choices
and their rationale are in [decisions.md](decisions.md), and concrete journeys
are in [scenarios.md](scenarios.md).

## Initial working position

The first Bloei.me pilot uses trust-based organization commitments:

- A tenant verifies the identity of participating organizations.
- Organization administrators appoint funding and supplier representatives.
- Budget authorization identifies who may use an organization budget.
- An authorized funding representative confirms a pledge through Bloei.me.
- Bloei.me does not require an uploaded or electronically signed contract before
  activating that pledge in v1.
- Suppliers knowingly rely on the platform commitment without Bloei.me
  guaranteeing legal enforceability or payment.

Verification confirms organizational identity and tenant participation. It is
not legal advice, procurement approval, proof of a representative's statutory
signing authority, credit assessment, or a guarantee that an expenditure is
lawful. The organization remains responsible for its internal authority and
applicable process.

## Functional meaning of a pledge

Bloei.me treats a pledge as an organization-owned, conditional platform
commitment:

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
compliant.” Each organization makes its own assessment. One organization's
legal basis does not automatically cover another organization in the same
campaign.

Before broader municipal use, specialist counsel and public procurement
professionals should review at least:

- Campaign and pledge formation under Dutch contract law
- Authority of organization representatives
- Public procurement and aggregation of related expenditure
- Sponsorship, subsidy, state-aid, and joint-commissioning characterizations
- Multi-supplier contracting and the absence of a platform-defined payee
- VAT, invoicing, and cross-border supplier implications
- Remedies for non-performance and non-completion

## Future signed-contract capability

A later release may let an organization, tenant, or budget require an external
signed agreement before a pledge becomes effective. This is prepared for but is
not built in v1.

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

## Platform terms and records needed before launch

The pilot should have proportionate, reviewed documents for:

- Platform and acceptable-use terms
- Organization representation and role assignment
- Campaign and supplier participation
- Pledge and amendment confirmations
- Privacy, data processing, retention, and public records
- Tenant/operator responsibilities
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
   operator, tenant, maintainers, funders, lead supplier, and co-suppliers?
8. What retention and access rules apply to public commitments, verification
   evidence, audit records, and future signed agreements?

## Primary references

- [Dutch Civil Code, Book 6](https://wetten.overheid.nl/BWBR0005289/), including
  Article 217 on agreement through offer and acceptance
- [Aanbestedingswet 2012](https://wetten.overheid.nl/BWBR0032203/), including
  the definitions of contracting authorities and public service contracts
- [EU Regulation 2020/1503](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32020R1503)
  on European crowdfunding service providers
- [EU Regulation 910/2014, eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32014R0910),
  especially Article 25 on electronic signatures
- [PIANOo: Open Source Aanbesteden](https://www.pianoo.nl/nl/actueel/agenda/open-source-aanbesteden-hoe-werkt-dat)
  as public-procurement practice context

These references are starting points, not a legal opinion. They must be checked
again when legal terms or signed-contract support are designed.
