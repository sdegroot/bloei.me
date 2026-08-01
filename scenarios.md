# Bloei.me product scenarios

Last updated: 2026-08-01

These scenarios show how people and organizations use Bloei.me from initial
registration through funding, delivery, review, and settlement. They supplement
the rules in [plan.md](plan.md) and the rationale in
[decisions.md](decisions.md).

## Actors used in the scenarios

- **Community member:** submits ideas and participates in discussion.
- **Tenant administrator:** verifies organizations and administers a Bloei.me
  tenant.
- **Organization administrator:** manages an organization's identity and role
  assignments.
- **Budget manager:** creates budgets and authorizes their use.
- **Funding representative:** pledges and votes for an organization.
- **Project maintainer:** curates proposals and publishes campaigns.
- **Lead supplier:** administers a campaign, coordinates its combined outcome,
  submits delivery, and coordinates external invoicing after acceptance.
- **Co-supplier:** publicly participates in delivery without receiving a
  platform-defined work package or share of the campaign price.

One person can hold several roles. For example, the first representative of a
small organization may be its organization administrator, budget manager, and
funding representative.

## Scenario 1 — A municipality joins Bloei.me

### Starting point

Municipality Rivierenstad has never used Bloei.me. A policy adviser wants the
municipality to participate in Epistola funding campaigns.

### Flow

1. The adviser signs in through Bloei.me's configured identity provider.
2. They search for Rivierenstad to avoid creating a duplicate organization.
3. No organization exists, so they create a provisional organization profile
   containing its legal name, country, registration details, official website,
   and public description.
4. As its provisional organization administrator, they request participation
   in the Epistola tenant and provide the evidence
   needed to verify the municipality and their authority to represent it.
5. An Epistola tenant administrator reviews the request.
6. The administrator verifies the organization's enrollment in that tenant;
   it does not assign the organization's internal roles.
7. The organization administrator appoints a budget manager and one or more
   funding representatives.
8. The organization is now allowed to endorse Epistola proposals.
9. It can pledge after an eligible budget has been created.

### Existing organization variation

If Rivierenstad already exists, the adviser requests membership instead of
creating another profile. An existing organization administrator approves the
membership and assigns the appropriate roles. The organization still requires
verification in every tenant where it wants to participate.

### Visible result

The public can see Rivierenstad's verified organization profile. Its members,
evidence, roles, budgets, and cost centers remain private.

## Scenario 2 — The municipality reserves an innovation budget

### Starting point

Rivierenstad has approved €80,000 for open-source innovation during its next
budget period.

### Flow

1. Its budget manager creates a budget named `Open-source innovation 2027`.
2. They enter:
   - Cost center `ICT-INNOV-2027`
   - Currency `EUR`
   - Net amount €80,000
   - Valid-from and expiration dates
   - A 14-day processing buffer
3. The budget manager authorizes two funding representatives to use it.
4. Bloei.me shows the authorized users the total, available, reserved, and
   consumed amounts.
5. The budget is now available during pledge creation when its currency,
   balance, and validity match the campaign.

### Inline creation variation

If an organization administrator or budget manager encounters a campaign
before creating a budget, they can create the budget inside the pledge flow and
then continue the same pledge. A funding representative without budget
management permission must ask an authorized colleague to create or assign a
budget first.

### Visible result

The budget, balance, cost center, expiration date, and usage remain private to
authorized Rivierenstad members.

## Scenario 3 — A community idea becomes a campaign

### Starting point

A user believes Epistola should generate PDF/UA-compliant documents.

### Flow

1. The user submits the idea privately to the Epistola project.
2. A moderator reviews it for relevance, clarity, duplication, and appropriate
   content.
3. A project maintainer works the idea into a public outcome-focused proposal.
4. Verified organizations endorse the proposal and discuss why the outcome
   matters to them.
5. Endorsements demonstrate demand but create no financial commitment.
6. A supplier prepares a campaign for the proposal.
7. The campaign publishes:
   - A maximum net price of €100,000
   - The promised outcome and scope
   - Objective acceptance criteria
   - Milestones
   - Latest funding and ultimate delivery dates
   - Review and voting rules
8. The project maintainer publishes the campaign for pledging.

### Visible result

The public campaign clearly distinguishes the maximum price from current
coverage. Its material terms become immutable as soon as the first organization
pledges.

## Scenario 4 — Organizations fund a campaign automatically

### Starting point

The PDF/UA campaign has a maximum price of €100,000. Four verified
organizations want to participate.

### Flow

1. Rivierenstad's funding representative pledges a maximum of 10%.
2. Its selected budget transactionally reserves the €10,000 worst case.
3. Organization B pledges 30% and reserves €30,000.
4. Organizations C and D each declare that they can cover up to 100%.
5. Bloei.me recalculates the fair projected shares after every pledge.
6. The combined caps reach 100%, so the campaign atomically enters delivery.
7. Existing pledges lock without a second confirmation round.
8. Bloei.me records that work started at full coverage.

### Fair-share result

Water filling produces these projected shares:

| Organization | Maximum cap | Projected share |
| --- | ---: | ---: |
| Rivierenstad | 10% | 10% |
| Organization B | 30% | 30% |
| Organization C | 100% | 30% |
| Organization D | 100% | 30% |

No organization can be charged more than its cap. The exact monetary amounts
remain projections until the lead supplier submits delivery and locks the final
price.

## Scenario 5 — The lead supplier starts before full coverage

### Starting point

A campaign has a €100,000 maximum price but currently has only 40% coverage.
The supplier team believes the work is strategically valuable and is willing
to take the remaining risk.

### Flow

1. The lead supplier reviews the pledged coverage and maximum committed amount.
2. It manually starts delivery at 40% coverage.
3. Bloei.me requires confirmation that the action is irreversible and that the
   supplier team bears every uncovered final-price share.
4. Existing pledges lock immediately.
5. The public campaign records the start coverage and displays the supplier
   team's current uncovered exposure.
6. Other organizations can still pledge until the first delivery submission.
7. Every late pledge explicitly acknowledges that it locks immediately because
   work has already started.

### Zero-coverage variation

The lead supplier may start at zero coverage and the supplier team may finance
the work entirely itself.
The public campaign remains open to later pledges during delivery. If nobody
ever pledges, the supplier team bears the complete final price.

### Deadline variation

If the lead supplier neither starts manually nor reaches full coverage before
the funding deadline, the campaign expires and all budget reservations are
released. Once delivery has started, the funding deadline no longer closes the
pledge window.

## Scenario 6 — A late funder reduces everyone's expected share

### Starting point

Delivery has already started with these projected shares: 10%, 30%, 30%, and
30%.

### Flow

1. A fifth verified organization discovers the campaign.
2. Its funding representative selects an eligible budget and pledges at least
   22.5%.
3. The budget reserves its worst-case exposure against the €100,000 maximum.
4. The representative acknowledges that the pledge locks immediately.
5. Bloei.me recalculates the projected allocation.

### Result

The new projected shares are 10%, 22.5%, 22.5%, 22.5%, and 22.5%. The late
organization reduces the eventual cost for the earlier funders without
changing the supplier's maximum price.

## Scenario 7 — The supplier charges less than the maximum

### Starting point

The campaign maximum is €100,000 and the organizations have collectively
covered 100%.

### Flow

1. The supplier team completes the outcome and the lead supplier decides to
   charge €82,000.
2. It submits the delivery evidence and declares €82,000 as the final net price.
3. Bloei.me atomically:
   - Permanently closes pledging
   - Locks the €82,000 final price
   - Freezes the organization allocation and voting group
   - Releases budget reservations above each final allocated amount
   - Opens the configured review period
4. Later evidence corrections cannot increase or decrease the final price.
5. With no objection, Bloei.me accepts delivery when the review period ends.
6. It creates the immutable settlement and consumes the final reserved amounts.
7. The supplier team arranges external invoicing and adds applicable tax.

### Result

The organizations benefit from the €18,000 reduction. Bloei.me does not require
the supplier team to disclose internal costs or justify why it selected €82,000.

### Zero-price variation

The lead supplier may declare a final price of zero. Bloei.me releases every
reservation, creates a public zero settlement, and produces no invoice
obligations.

## Scenario 8 — Delivery is only partially funded

### Starting point

The lead supplier manually started a campaign at 60% coverage and no additional
organizations joined. It declares a €90,000 final price.

### Flow

1. The first delivery submission freezes the 60% combined pledge caps.
2. The organizations collectively pay at most 60% of €90,000: €54,000.
3. Bloei.me records the €36,000 remainder as supplier-funded exposure.
4. Pledgers review the complete outcome using the same acceptance criteria as a
   fully funded campaign.
5. After acceptance, the supplier team invoices only the organization
   settlement lines and absorbs the remainder.

### Result

Starting early never allows the supplier team to transfer its funding risk to
the pledging organizations.

## Scenario 9 — A pledger objects to delivery

### Starting point

The lead supplier submits a stable release, evidence, and a locked final price.

### Flow

1. Rivierenstad identifies that one published accessibility criterion is not
   demonstrated by the evidence.
2. Its funding representative submits an objection referencing that criterion.
3. The lead supplier coordinates corrections or supplies better evidence and
   resubmits.
4. The complete review period starts again.
5. If the disagreement remains, Bloei.me opens a fresh formal acceptance
   window.
6. Each pledging organization receives one ballot; silence is deemed acceptance
   and there is no quorum.
7. The immutable campaign approval threshold determines the result across all
   eligible organizations.
8. A successful result accepts delivery; a failed threshold returns it to
   revision.

### Boundaries

An objection cannot introduce new scope. A final price within the previously
accepted ceiling is not itself grounds for objection, and evidence resubmission
cannot change that price.

## Scenario 10 — Delivery fails

### Starting point

The supplier cannot meet the published acceptance criteria after revision.

### Flow

1. The campaign is marked failed with a public explanation.
2. No settlement or invoice is created.
3. Remaining budget reservations are released.
4. Produced open-source work, evidence, and lessons remain publicly visible.

### Result

Funders do not pay for an unaccepted outcome, while the community retains the
value and transparency of the work that was attempted.

## Scenario 11 — Delivery threatens a municipal budget deadline

### Starting point

Delivery is overdue and Rivierenstad's original innovation budget is nearing
its expiration date.

### Flow

1. Bloei.me marks the campaign overdue and alerts affected budget managers.
2. Rivierenstad's budget manager creates or selects a newer eligible budget.
3. They transfer the private reservation to the replacement budget.
4. Bloei.me records the transfer in the append-only budget history.
5. The public pledge, percentage cap, and organization identity remain
   unchanged.

### No replacement variation

If no eligible replacement exists, the original budget becomes `expired with
active commitment`. Bloei.me does not withdraw the locked pledge or block a
later settlement; Rivierenstad handles the accounting exception externally.

## Scenario 12 — An organization joins a second tenant

### Starting point

Rivierenstad is already registered and verified in the Epistola tenant. It now
wants to fund a campaign in another open-source community on Bloei.me.

### Flow

1. An organization administrator requests enrollment in the second tenant.
2. The second tenant administrator reviews and verifies that relationship.
3. Rivierenstad keeps its existing legal profile, members, and organization
   roles; nothing is recreated.
4. Its budget manager adds the second tenant to an existing innovation budget's
   allowlist.
5. An authorized funding representative can now use that budget in either
   tenant.
6. Reservations from both tenants reduce the same available balance.

### Result

Bloei.me prevents cross-tenant overcommitment while each tenant independently
controls whether Rivierenstad may participate there.

## Scenario 13 — Tenant enrollment is rejected and corrected

### Starting point

An organization requests tenant enrollment but supplies incomplete legal
evidence.

### Flow

1. The tenant administrator rejects the request with a private explanation.
2. The organization's global profile and participation in other tenants remain
   unaffected.
3. Its administrator corrects the details and uploads better evidence.
4. The organization resubmits the enrollment request.
5. The tenant administrator verifies the corrected request.

### Result

Rejection is recoverable and tenant-local. There is no platform-level appeal or
automatic verification expiry in v1.

## Scenario 14 — A funding representative leaves

### Starting point

The employee who created Rivierenstad's pledge changes jobs during delivery.

### Flow

1. An organization administrator removes the employee's membership or funding
   role.
2. The pledge, reservation, and any submitted organization ballot remain owned
   by Rivierenstad.
3. The administrator assigns the funding role to another member.
4. The replacement representative can review delivery and alter Rivierenstad's
   position while an acceptance window remains open.

### No-administrator variation

If no active organization administrator remains, a platform operator verifies
a replacement's authority and performs an audited recovery. Tenant
administrators cannot appoint a global organization administrator.

## Scenario 15 — A funding organization is suspended

### Before delivery starts

1. The tenant administrator suspends Rivierenstad's tenant enrollment.
2. Its active pledge is deactivated and its budget reservation releases.
3. Campaign coverage recalculates and may drop below 100%.
4. Restoration does not recreate the pledge; a funding representative must
   knowingly pledge again.

### After delivery starts

1. The locked pledge and reservation remain because the supplier relied on
   them.
2. Rivierenstad may replace its representative, transfer the reservation, review
   delivery, and vote on that existing commitment.
3. It cannot endorse, create a pledge, increase its cap, or join another
   campaign in that tenant until restored.

### Result

Suspension blocks new authority without silently erasing a commitment on which
work has already started.

## Scenario 16 — Two campaigns compete for one budget

### Starting point

Rivierenstad has €20,000 available in a cross-tenant innovation budget. Two
funding representatives submit €15,000 maximum commitments at nearly the same
time in different tenants.

### Flow

1. The first pledge and reservation commit atomically.
2. The second transaction sees only €5,000 available and is rejected.
3. Bloei.me explains the insufficient balance without exposing budget details
   publicly.
4. The budget manager may increase the budget, choose another eligible budget,
   or reduce the proposed pledge before retrying.

### Result

Tenant separation never permits the same organization budget to be
overcommitted.

## Scenario 17 — Campaign terms must change after pledging

### Starting point

The supplier discovers that a required external standard changed after several
organizations pledged but before delivery started.

### Flow

1. The lead supplier drafts an amendment showing the old and new standard,
   acceptance criteria, delivery date, maximum price, and reason for the change.
2. A project maintainer confirms that this is a genuine scope change rather
   than an ordinary cost overrun.
3. Bloei.me pauses new pledges and cap increases.
4. Every funding organization receives a consent deadline and must explicitly
   approve; silence does not count as consent.
5. The revised price requires additional reservations, and the later date is
   revalidated against every backing budget.
6. All organizations consent and every reservation succeeds atomically.
7. The revised version becomes canonical and the consented pledges carry
   forward. Pledging resumes under the amended terms.

### Result

No organization is silently moved to commercial or acceptance terms it did not
approve, and the supplier does not have to abandon a viable campaign merely
because its genuine scope changed.

## Scenario 18 — Cancellation and failure are different

### Cancellation before start

The lead supplier, project maintainer, or tenant administrator cancels a
campaign with a public reason. All pledges and reservations release immediately.

### Supplier failure after start

The lead supplier concludes that the supplier team cannot deliver. It declares
the campaign failed, publishes the reason and produced work, releases
reservations, and creates no settlement or invoices.

### Tenant-forced failure

1. A tenant administrator publishes a proposed failure and reason.
2. New pledges, cap increases, review, voting, and settlement pause for seven
   days.
3. The lead supplier responds with evidence of progress or accepts failure.
4. The administrator withdraws or confirms failure after the response period.
5. A deployment operator may bypass the delay only for a legal, fraud, or
   security emergency.

## Scenario 19 — A supplier's verification is suspended

### Starting point

A co-supplier loses tenant verification while delivery review has five days
remaining.

### Flow

1. Bloei.me suspends the campaign and freezes the five remaining review days.
2. New pledges, cap increases, evidence submission, review, voting, and
   settlement are blocked.
3. Existing organization commitments remain reserved.
4. The tenant administrator restores verification after resolving the issue.
5. Review resumes with the original five days remaining; the delivery deadline
   is not extended retroactively.

### Failure variation

If verification cannot be restored, the tenant administrator uses the public
failure process. Verification loss after settlement never rewrites that
settlement.

## Scenario 20 — An objection triggers negative-consent voting

### Starting point

Ten organizations funded a campaign with a two-thirds acceptance threshold.
Rivierenstad maintains a criterion-based objection after the lead supplier
responds.

### Flow

1. Bloei.me opens a fresh formal window equal to the campaign review period.
2. Rivierenstad begins with an explicit `reject` position.
3. All funding representatives and organization administrators receive in-app
   and email notices plus reminders.
4. Two organizations explicitly accept. Seven organizations take no action.
5. Positions remain hidden and can change until closing.
6. At closing, the two explicit accepts and seven deemed accepts produce 90%
   acceptance, so delivery passes.
7. Bloei.me publishes every organization as explicit accept, deemed accept, or
   reject.

### Variations

- An email bounce is recorded but does not stop the deadline.
- Exact equality with the configured threshold passes.
- The window closes early only if all ten organizations explicitly accept.
- If rejection exceeds the allowed threshold, delivery returns to revision.
  The price, allocation, and pledges remain locked, and there is no automatic
  limit on further submissions.

## Scenario 21 — Delivery is entirely self-funded

### Starting point

The lead supplier started at zero coverage and no organization pledged before
delivery submission.

### Flow

1. The lead supplier publishes the combined evidence and final price.
2. Bloei.me marks the campaign `delivered self-funded`.
3. No funding organization exists to review or vote.
4. Bloei.me creates no settlement or invoice obligations.

### Partial-funding variation

If organizations cover only part of the final price, the settlement contains
their invoice lines plus a public, non-invoice supplier-contribution line. The
lines reconcile exactly to the final price.

## Scenario 22 — An external invoice is disputed

### Starting point

Delivery was accepted and the immutable settlement allocated €12,000 to
Rivierenstad. The supplier team issued its invoices externally.

### Flow

1. The lead supplier changes the aggregate private line from `fully invoiced`
   to `disputed`.
2. It records a private note and the relevant external references.
3. The settlement and Rivierenstad's consumed budget remain unchanged.
4. After external resolution, the lead supplier records `paid` or
   `closed unpaid`.

### Result

Bloei.me provides operational visibility but does not manage partial payments,
credit notes, collection, or dispute resolution.

## Scenario 23 — Historical identity must be preserved

### Organization rename or merge

Rivierenstad changes its legal name or is merged with a duplicate profile. Old
pledges and settlements continue to show the legal-identity snapshot used at
the time, with a link or redirect to the current canonical organization.

### Personal account deletion

An employee deletes their account. Bloei.me anonymizes their personal profile
while preserving actions performed for Rivierenstad and the internal audit
identifier.

### Exceptional redaction

A published evidence image accidentally exposes personal information. A
platform operator redacts it for privacy reasons. The page retains a public
tombstone explaining that an exceptional redaction occurred, and the immutable
audit history records who performed it and why.

## Scenario 24 — An amendment does not receive unanimous consent

### Starting point

Five organizations have pledged. The lead supplier proposes a larger scope and
a higher maximum price, but one organization rejects and another does not
respond before the consent deadline.

### Flow

1. Bloei.me records three consents, one rejection, and one non-response.
2. The amendment expires because explicit unanimity was not reached.
3. Any provisional additional reservations are released.
4. The original campaign version and pledges remain binding.
5. Pledging and cap increases resume under the original terms.
6. The supplier team may deliver the original outcome, propose another
   amendment, or declare failure if it cannot deliver.

### Result

Silence can accept an already-promised delivery after notice, but it can never
authorize a new financial or delivery obligation.

## Scenario 25 — The supplier clarifies scope without changing it

### Starting point

A criterion says that an export must use an open standard, but funders ask
which published version of that standard the existing wording refers to.

### Flow

1. The lead supplier drafts a clarification that does not alter the promised
   behavior, price, date, supplier team, or acceptance test.
2. A project maintainer confirms that no obligation changes.
3. Bloei.me appends the clarification publicly with its author and timestamp.
4. Delivery and pledging continue without a consent window.

### Boundary

A supposed clarification that narrows compatibility or changes an acceptance
test is a material amendment instead.

## Scenario 26 — Optional additional work becomes a linked campaign

### Starting point

During delivery, funders suggest a useful dashboard that is not required for
the original promised outcome.

### Flow

1. The lead supplier and project maintainer leave the original campaign
   unchanged.
2. They create a linked proposal and campaign for the dashboard.
3. Organizations decide independently whether to fund it.
4. Acceptance or failure of either campaign does not determine the other.

### Result

Useful additions do not become scope creep or force existing funders into a
larger commitment.

## Scenario 27 — A campaign is delivered by several suppliers

### Starting point

Supplier A leads a campaign and wants Suppliers B and C to participate in the
combined outcome.

### Flow

1. Supplier A is recorded as the lead supplier and adds B and C as
   co-suppliers while the campaign is still a draft.
2. All three organizations must be verified in the tenant.
3. B and C confirm that they may be shown publicly as participants.
4. The campaign publishes one outcome, maximum price, set of criteria, and
   supplier team; it publishes no supplier work packages or price shares.
5. Supplier A administers the campaign and submits the combined delivery.
6. Funders review and accept the outcome as a whole.

### Result

Bloei.me gives funders one accountable campaign while leaving collaboration
inside the supplier team.

## Scenario 28 — A co-supplier leaves during delivery

### Starting point

A co-supplier withdraws after pledges have locked, but the lead supplier can
still deliver the original outcome with another partner.

### Flow

1. The lead supplier proposes removing the co-supplier and, if appropriate,
   adding the replacement through a material amendment.
2. Bloei.me pauses new pledges and obtains explicit consent from every funding
   organization.
3. If all consent and all supplier organizations are verified, the supplier
   team changes and delivery continues.
4. If unanimity is not reached, the original supplier terms remain. The lead
   supplier must still deliver under them or declare failure.

### Lead-supplier variation

Replacing the lead supplier follows the same unanimous process and explicitly
transfers campaign administration. A co-supplier cannot take control on its own.

## Scenario 29 — Suppliers arrange invoicing themselves

### Starting point

Accepted settlement records that Rivierenstad owes €20,000 toward a campaign
delivered by one lead supplier and two co-suppliers.

### Flow

1. The supplier team decides externally that the lead will invoice €15,000 and
   one co-supplier will invoice €5,000.
2. Bloei.me continues to show one €20,000 settlement obligation for
   Rivierenstad and does not store either supplier allocation.
3. The lead supplier records the aggregate status as `partially invoiced` and
   adds the available external references.
4. After all agreed invoices have been issued, it records `fully invoiced`.
5. Rivierenstad ultimately pays the externally agreed invoices, and the lead
   records the aggregate obligation as `paid`.

### Boundaries

The combined net invoices cannot exceed €20,000. Bloei.me does not decide who
invoices, how suppliers share revenue, or how they resolve a disagreement.

## Scenario 30 — An amendment exceeds one funder's available budget

### Starting point

Every funding organization supports a proposed scope increase, but one backing
budget cannot reserve the organization's increased maximum exposure.

### Flow

1. The organization gives consent but Bloei.me cannot activate the amendment.
2. Before the deadline, its budget manager may increase the budget or move the
   pledge to another eligible budget.
3. If all reservations then succeed, the amendment activates atomically.
4. Otherwise it expires without changing the original campaign or consuming
   any provisional reservation.

### Result

Verbal agreement never creates an unfunded commitment, and amendment activation
cannot partially update the funding organizations.
