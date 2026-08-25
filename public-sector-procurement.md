# Public-sector funding and procurement

Status: Discussion draft

Last updated: 2026-08-25

This paper explores how Dutch public-sector organizations, particularly
municipalities, could participate in Bloei.me without turning every campaign
into a slow bespoke procurement. It records a possible deviation from the
current product model for discussion; it is not an accepted decision, legal
advice, or a claim that a funding route is compliant.

The current normative direction remains in [plan.md](plan.md), accepted choices
remain in [decisions.md](decisions.md), and the broader legal boundary remains
in [legal.md](legal.md). If a direction in this paper is accepted, those
documents and the affected scenarios and architecture must be changed through
the normal decision process.

## Executive summary

Open-source publication does not generally exempt paid feature development,
support, integration, or hosting from public-procurement rules. Freely obtaining
and using software without payment or another valuable counter-performance is
different: there is then ordinarily no purchase to procure.

Running a complete competition for every Bloei.me campaign would protect market
access but would substantially weaken the spontaneous co-funding experience.
The most promising working hypothesis is therefore to front-load procurement:

1. A public organization establishes or identifies a reusable funding
   instrument before pledging.
2. Bloei.me records the instrument's declared scope and approval boundary but
   does not certify its legality.
3. A campaign that fits the instrument can receive an effective pledge without
   a new full procurement.
4. An organization without a suitable route records non-binding interest until
   it obtains one.
5. At scale, a public purchasing partner could establish a shared framework
   covering open-source development, steward review, and upstream integration.

This approach moves the slow work to onboarding or a periodic framework
procurement. It does not remove each municipality's responsibility for its
budget, authority, contract, and procurement assessment.

## Why this needs discussion

The accepted model currently assumes that a campaign already names one lead
supplier and optional co-suppliers before organizations pledge. A pledge then
reserves budget against known campaign terms, and the supplier may start after
the applicable coverage decision.

That model is straightforward for private organizations but can be difficult
for municipalities. A public funder may need competition before it can commit
to the named supplier. Requiring that competition after the campaign is
published creates a circular dependency:

- funders want a price and supplier before committing;
- suppliers want credible funding before preparing a formal offer; and
- a public buyer may not lawfully preselect the supplier before competition.

A public supplier-registration feature alone does not solve this. Public
expressions of interest can support market consultation, but a formal
competition also needs a responsible contracting authority, fixed documents,
confidential offers, predefined award criteria, a reasoned decision, and the
applicable publication and recordkeeping process.

## Legal baseline

The following points are working legal context to validate with Dutch public-
procurement specialists before a municipal pilot.

### Free software and paid services are different

An organization may ordinarily download and use genuinely free open-source
software without a procurement because it gives no payment or other valuable
counter-performance. A paid assignment for implementation, hosting, support,
maintenance, integration, or development is a service and must be assessed on
its own facts, value, and applicable organizational policy.

The fact that the resulting source code is reusable by everyone does not by
itself turn an enforceable paid feature assignment into a donation or subsidy.
Substance, rather than the label used by Bloei.me or the parties, determines
whether the arrangement is a public contract, subsidy, collaboration, or
another instrument.

### Existing use does not automatically select a supplier

A municipality that already uses a product may set objectively necessary
compatibility, continuity, security, data, and upstream-maintainability
requirements. It does not necessarily need to reconsider the product choice
for every change. Those requirements do not automatically make the current
steward the only supplier capable of implementing a feature.

Open-source licensing commonly enables other qualified suppliers to inspect,
modify, and maintain the code. Copyright ownership, trademark control,
canonical repository access, and official release authority are separate
facts. The steward may be the only party that can approve an official release,
while another supplier may still be capable of developing the contribution.

### Direct award to the steward is exceptional

A direct award may sometimes be defensible where technical reasons or exclusive
rights mean that only one supplier can provide an objectively necessary result.
The buyer must still establish that no reasonable alternative or substitute
exists, that the requirement was not artificially written around one supplier,
and that the buyer did not unnecessarily create or perpetuate the exclusivity.

Bloei.me should therefore treat stewardship and official-release authority as
factual evidence, not as an exclusive commercial right or automatic
procurement exemption. A safer structure may compete the implementation while
providing equal, transparent access to separately funded steward review and
integration.

### Existing contracts can make participation fast

A previously procured agreement may cover feature work when its original scope,
options, call-off rules, maximum value, and contract terms anticipated that
work. Adding materially different development to an incumbent agreement can be
a new procurement or an impermissible material modification. The contracting
organization must make that assessment; Bloei.me cannot infer it merely from an
active supplier relationship.

### Below-threshold work still has rules

Below the European thresholds, municipal procurement policies, the
Aanbestedingswet principles, and the Gids Proportionaliteit can still require
one or more quotations or a national procedure. Thresholds and internal rules
must not be hard-coded as universal safe harbours in Bloei.me.

### Narrow alternative characterizations exist

A genuine general-interest subsidy without a purchased counter-performance, a
qualifying public-public collaboration, in-house delivery, or certain genuine
research-and-development arrangements may follow a different legal route.
These are fact-specific exceptions or alternative regimes. Ordinary open-source
feature development must not be relabelled to avoid procurement, and any
subsidy also requires consideration of its legal basis and state-aid rules.

## Working design principles

Any alternative model should preserve the following principles:

1. **Procurement is owned by the buyer.** Bloei.me supports evidence and
   workflow but does not issue a universal compliance label.
2. **Interest is distinct from spend authority.** Unapproved public interest
   cannot silently become a supplier commitment or secured coverage.
3. **Slow work is reusable.** Prefer an existing contract, framework, or
   approved program over a new tender for each feature.
4. **Steward and supplier are distinct roles.** The steward governs upstream
   acceptance; the implementation supplier performs contracted work.
5. **One feature has one delivery path.** Multiple funders must not create
   competing municipal forks or hundreds of independently managed changes.
6. **Public and private funding can use different routes.** Procurement
   friction for one public participant should not block otherwise valid
   private or pre-cleared funding.
7. **No threshold avoidance.** Campaigns, contracts, lots, and contributions
   must not be structured to disguise the value or coherence of the work.
8. **The record is auditable.** The responsible organization can export the
   terms, approvals, versions, selection references, award, and delivery
   evidence needed for its own dossier.

## Candidate funding paths

The same public proposal may lead to different paths for different
organizations.

### Path A: existing approved instrument

The organization declares that an existing contract, framework, or other
reviewed instrument covers the campaign and supplier-selection method.

- Its authorized procurement or funding approver records the instrument,
  validity, scope, maximum usable amount, and external reference.
- A campaign pledge can become effective when the organization confirms that
  this particular use falls within that instrument.
- Bloei.me records the declaration and evidence metadata without deciding
  whether the legal conclusion is correct.
- Contracting, ordering, invoicing, and payment remain external.

This path changes the least in the current product when the instrument already
identifies the supplier or provides an objective direct call-off.

### Path B: supplier selection still required

The proposal aggregates conditional public commitments before the supplier is
selected.

1. Organizations reserve maximum amounts against a supplier-neutral proposal.
2. The participating public buyers and procurement lead are fixed before the
   formal procedure begins.
3. The procurement uses the combined assignment and an independently supported
   maximum budget.
4. Offers are submitted and evaluated through TenderNed or another approved
   procurement system.
5. The award identifies the lead supplier and final price.
6. Eligible reservations are recalculated within their approved maxima and
   become campaign pledges; unused capacity is released.

This is closer to crowdfunding than procuring first and seeking funders later,
but it requires new proposal-level concepts and careful treatment of a
conditional commitment that is not yet a campaign pledge.

### Path C: interest only

An organization with no established route may endorse the proposal and publish
or privately record its intended maximum contribution. That interest:

- does not reserve an operational budget unless internal policy allows it;
- does not count as secured campaign coverage;
- cannot be relied upon by a supplier as an award or purchase commitment; and
- may later convert through Path A or B with fresh authority confirmation.

This lets Bloei.me demonstrate demand without allowing unresolved public
procurement to delay cleared participants.

### Path D: non-procurement public support

A municipality may conclude that a general subsidy, public-public program,
in-house arrangement, or other route applies. Bloei.me should record the
organization's selected route and external approval, not decide that the facts
satisfy the relevant legal test. A contribution tied to a concrete enforceable
feature should be presumed to require procurement assessment rather than being
presented as a donation by default.

## Shared framework as the scalable direction

The strongest long-term speed mechanism appears to be a framework established
by a municipality, purchasing collaboration, or public purchasing body. Its
initial procurement could cover a bounded stream of work such as:

- open-source feature development and defect remediation;
- security, maintenance, integration, and migration work;
- contribution preparation and upstream collaboration;
- neutral steward review and official-release integration;
- defined product or service lots;
- maximum value, duration, service levels, licence requirements, and exit; and
- objective direct call-off rules or mini-competition rules.

A framework can have no minimum purchase obligation, which accommodates
uncertain campaign demand. Direct call-offs are fastest when the original
documents fixed all relevant conditions and an objective allocation mechanism.
Where price, team, approach, or planning still needs competition, a bounded
mini-competition preserves market access with less work than a new full tender.

This approach has material constraints:

- eligible contracting authorities and possible later users must be identified
  transparently from the outset;
- arbitrary municipalities cannot be added after award;
- the estimated maximum value and scope must be credible rather than unlimited;
- call-offs cannot materially expand the original framework; and
- a framework normally has a maximum four-year duration unless a longer term
  is duly justified.

Successive regional or product-focused cohorts may therefore be more credible
than attempting to cover every Dutch municipality immediately.

## Municipal operating journeys

### Municipality with a suitable contract

1. Its procurement approver registers the external instrument against a Bloei
   budget.
2. The funding representative selects that budget while pledging.
3. The organization attests that the campaign fits the instrument.
4. The pledge counts immediately under ordinary campaign rules.
5. Ordering and payment use the existing external contract.

### Municipality using a shared framework

1. The municipality is an eligible participant in the framework.
2. Its intended contribution helps a proposal reach the call-off threshold.
3. The framework's objective rule or mini-competition selects the supplier.
4. The award creates or activates the corresponding Bloei campaign.
5. One supplier team implements and the steward governs upstream acceptance.

### Municipality without a route

1. It endorses the proposal and records conditional interest.
2. Its amount remains visibly or privately unconfirmed and does not count as
   secured coverage.
3. It asks its procurement function to identify an existing route, join the
   next eligible cohort, or lead an appropriate procedure.
4. It confirms a new effective pledge only after that work succeeds.

### Municipality arriving after award

The late organization can use the released open-source feature without paying
for the completed procurement. It cannot ordinarily become a retrospective
buyer under a concluded award. It may fund a later maintenance or enhancement
campaign through its own valid route.

## Potential product consequences

The following changes are implications to discuss, not approved requirements.

### Procurement-backed funding instruments

A budget may need private, versioned links to one or more declared instruments,
including:

- route type and responsible organization;
- external reference and responsible approver;
- effective and expiry dates;
- maximum amount and currency;
- applicable component, service, supplier, or framework scope;
- whether supplier selection is already complete;
- approval status and supporting evidence metadata; and
- an explicit organization attestation for each use.

The platform should not parse a contract and infer eligibility automatically in
the first version. Matching can initially be an organization-owned confirmation
with clear warnings and audit history.

### Separate interest, conditional commitment, and pledge

The current endorsement and pledge concepts may be insufficient for public
funders. A future model may require:

- **endorsement:** supports the need without stating an amount;
- **conditional commitment:** states an intended maximum subject to a named
  procurement or approval condition; and
- **effective pledge:** reserves eligible budget and may count toward campaign
  coverage.

The public presentation must not aggregate these categories into a misleading
single funded total.

### Route-dependent supplier timing

Campaign formation may need two supported routes:

- **supplier known:** an existing instrument lawfully identifies the supplier,
  so the current supplier-first campaign can remain; or
- **supplier pending:** public demand and maximum reservations form at proposal
  level, and the awarded supplier creates or activates the campaign afterward.

This would supersede the assumption that every fundable campaign always has a
selected supplier before funding activity begins.

### Procurement authority and evidence

Potential future records include a procurement lead, participating buyers,
participant lock, procedure type, total estimated value, TenderNed or external
system reference, award decision, selected supplier, final price, and objection
or standstill status. Sensitive offers, evaluations, legal advice, and complete
contracts should remain in the authoritative procurement system unless a
validated requirement justifies protected storage in Bloei.me.

## Alternatives considered

### Require a complete competition for every campaign

This offers a clear supplier-selection moment but makes small campaigns slow,
duplicates mature procurement systems, and changes Bloei.me into an electronic
tender platform. It remains a fallback when no reusable route exists, not the
preferred default.

### Treat every public contribution as a subsidy or donation

This preserves the current crowdfunding interaction but fails when payment is
actually exchanged for an enforceable feature. It creates material procurement
and state-aid risk and should not be the default characterization.

### Treat stewardship as automatic exclusivity

This is operationally convenient but legally weak for open-source code that
other qualified suppliers can modify. Official release authority can be
relevant evidence, but it does not automatically make all implementation work
exclusive.

### Ask every municipality to procure independently

This avoids joint-procurement design but creates duplicate contracts, divergent
requirements, fragmented delivery, and excessive administrative cost. It is
incompatible with the intended shared outcome.

### Create a steward-controlled general fund

Municipalities could support a general roadmap without entitlement to a named
feature. This may align with a genuine subsidy or membership model in some
cases, but it changes the campaign promise and requires separate procurement,
subsidy, state-aid, governance, and accounting analysis.

## Questions requiring a decision

1. May public conditional commitments be shown publicly, and how are they kept
   distinct from secured coverage?
2. Which organization role may register, approve, suspend, or revoke a funding
   instrument?
3. Does an effective pledge require only the organization's attestation, or
   must pilot operators inspect supporting evidence?
4. When supplier selection is pending, does an award create a new campaign or
   activate a supplier-neutral campaign shell?
5. How are winning-price reductions allocated across conditional maximum
   contributions, and must participants reconfirm?
6. Which campaign terms may change through an award without creating an
   impermissible difference from the competed specification?
7. Who could credibly establish and operate a shared framework for the first
   municipal cohort?
8. How are a bidding steward's specification, review, and acceptance conflicts
   separated and disclosed?
9. Which procurement metadata must Bloei.me retain, and which records must stay
   exclusively in TenderNed or the buyer's authoritative system?
10. Should subsidies, public-public cooperation, and direct-award exceptions be
    first-class route types or initially an `other reviewed route` declaration?
11. How are new municipalities supported when they were not eligible under an
    existing framework?
12. Which existing accepted decisions and scenarios must be superseded if this
    direction is adopted?

## Proposed validation

Before accepting a product change:

1. Select one real open-source product and a small group of interested
   municipalities.
2. Ask their procurement teams to inventory existing ICT, development, support,
   and framework agreements before designing a new instrument.
3. Map one representative campaign through each applicable funding path.
4. Have a Dutch procurement specialist review the public-contract, joint-
   procurement, framework, subsidy, state-aid, and contract-modification
   assumptions.
5. Test whether the minimum evidence can be recorded without exposing contracts,
   legal advice, personal data, or confidential procurement material.
6. Measure the expected time and staff effort for initial setup and each later
   campaign call-off.
7. Only then create an ADR or accepted product decision and update the normative
   model.

## References

- [PIANOo: Open source software gebruiken zonder aanbesteding](https://www.pianoo.nl/nl/actueel/nieuws/open-source-software-gebruiken-zonder-aanbesteding-wat-mag-wel-en-wat-niet)
- [PIANOo: Open source software inkopen](https://www.pianoo.nl/nl/sectoren/ict/inkopen-van-ict/open-source-software-inkopen)
- [PIANOo: Onderhandelingsprocedure zonder aankondiging](https://www.pianoo.nl/nl/inkoopproces/aanbestedingsprocedures/onderhandelingsprocedure-zonder-voorafgaande-aankondiging)
- [PIANOo: Raamovereenkomsten](https://www.pianoo.nl/nl/inkoopproces/aanbestedingsprocedures/raamovereenkomsten)
- [PIANOo: Samenwerken met gemeenten en markt](https://www.pianoo.nl/nl/sectoren/sociaal-domein/checklist-inkoop/samenwerken-met-gemeenten-en-markt-bij-sociaal-domein)
- [PIANOo: (Niet-)wezenlijke wijziging](https://www.pianoo.nl/nl/inkoopproces/fase-2-doorlopen-aanbestedingsprocedure/aankondigen/niet-wezenlijke-wijziging)
- [PIANOo: Subsidie of overheidsopdracht?](https://www.pianoo.nl/nl/visie-subsidie-overheidsopdracht)
- [PIANOo: Onderzoek en ontwikkeling inkopen](https://www.pianoo.nl/nl/themas/innovatie/over-innovatie/onderzoek-en-ontwikkeling-inkopen)
- [TenderNed: Aankondigingen publiceren](https://www.tenderned.nl/cms/nl/voor-aanbestedende-diensten/publiceren-op-tenderned)
- [VNG: Gemeentelijke Inkoop bij IT Toolbox](https://vng.nl/projecten/gibit)
- [Directive 2014/24/EU](https://eur-lex.europa.eu/eli/dir/2014/24/oj/eng)
- [Court of Justice, C-578/23](https://eur-lex.europa.eu/legal-content/EN/CASE/?uri=CELEX:62023CJ0578)

