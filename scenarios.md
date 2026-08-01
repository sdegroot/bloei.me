# Bloei.me product scenarios

Last updated: 2026-08-01

These scenarios show how people and organizations use Bloei.me from initial
registration through funding, delivery, review, and settlement. They supplement
the rules in [plan.md](plan.md) and the rationale in
[decisions.md](decisions.md).

## Actors used in the scenarios

- **Member:** submits ideas and participates in discussion.
- **Platform operator:** verifies identity, governs platform participation, and
  performs exceptional audited actions.
- **Organization administrator:** manages an organization's identity and role
  assignments.
- **Budget manager:** creates budgets and authorizes their use.
- **Funding representative:** pledges and votes for an organization.
- **Component maintainer:** maintains an open-source component, curates its
  proposals, confirms official upstream claims, and publishes campaigns.
- **Program curator:** curates a public cross-component collection without
  controlling the included campaign records.
- **Lead supplier:** administers a campaign, coordinates its combined outcome,
  submits delivery, and coordinates external settlement after acceptance.
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
4. They provide evidence needed to verify the municipality and their control of
   its Bloei.me account through an independent official channel.
5. A deployment operator verifies Rivierenstad's legal identity and the
   claimant's control using authoritative government sources.
6. The administrator accepts the current platform terms, activating
   Rivierenstad's deployment-level participation.
7. The organization administrator appoints a budget manager and one or more
   funding representatives.
8. The organization is now allowed to endorse Epistola proposals.
9. It can pledge after an eligible budget has been created.

### Existing organization variation

If Rivierenstad already exists, the adviser requests membership instead of
creating another profile. An existing organization administrator approves the
membership and assigns the appropriate roles. No component or program requires
another organization application.

### Visible result

The public can see that Rivierenstad's identity is verified and its Bloei.me
participation is active. Its members, evidence, roles, budgets, and cost centers
remain private.

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

## Scenario 3 — An idea becomes a campaign

### Starting point

A user believes Epistola should generate PDF/UA-compliant documents.

### Flow

1. The user submits the idea privately against the Epistola and Document
   Generator components.
2. A moderator reviews it for relevance, clarity, duplication, and appropriate
   content.
3. An Epistola component maintainer works the idea into a public outcome-focused
   proposal.
4. Verified organizations endorse the proposal and discuss why the outcome
   matters to them.
5. Endorsements demonstrate demand but create no financial commitment.
6. Eligible suppliers may prepare private campaign drafts; the component
   maintainer selects a suitable draft and records the rationale.
7. The campaign publishes:
   - A maximum net price of €100,000
   - The promised outcome and scope
   - Objective acceptance criteria
   - Milestones
   - Latest funding and ultimate delivery dates
   - Review and voting rules
8. Every supplier and required component maintainer confirms its role, and the
   component maintainer publishes the campaign for pledging.

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

1. A fifth identity-verified, active organization discovers the
   campaign.
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
7. The supplier team handles the contribution externally.

### Result

The organizations benefit from the €18,000 reduction. Bloei.me does not require
the supplier team to disclose internal costs or justify why it selected €82,000.

### Zero-price variation

The lead supplier may declare a final price of zero. Bloei.me releases every
reservation, creates a public zero settlement, and produces no actionable
organization settlement notes.

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
5. After acceptance, the supplier team handles only the organization
   contributions externally and absorbs the remainder.

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
3. The public objection prevents automatic acceptance, but other funders retain
   the rest of the original period to review and object.
4. The lead supplier coordinates corrections or supplies better evidence and
   formally resubmits.
5. The old objection is preserved as superseded and a complete review period
   starts again for everyone.
6. If the organization objects again and the lead contests it after the new
   review period, Bloei.me opens formal acceptance voting.
7. Each pledging organization receives one ballot; silence is deemed acceptance
   and there is no quorum.
8. The immutable campaign approval threshold determines the result across all
   eligible organizations.
9. A successful result accepts delivery; a failed threshold returns it to
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
2. No settlement note is created.
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

## Scenario 12 — An organization funds work across components

### Starting point

Rivierenstad's identity and platform participation are active. It already funds
an Epistola campaign and now wants to fund a GZAC campaign.

### Flow

1. Its representative discovers the GZAC campaign through the global component
   and campaign catalog.
2. Rivierenstad uses its existing legal profile, members, and organization
   roles; nothing is recreated or reapproved.
3. A network-wide budget is immediately eligible, while a component-scoped
   budget requires GZAC to be in its allowed scope.
4. An authorized funding representative pledges from an eligible budget.
5. Epistola and GZAC reservations reduce the same available balance.

### Result

One identity and budget portfolio can support several ecosystems without
repeated community enrollment or overcommitment.

## Scenario 13 — A component stewardship claim is disputed and corrected

### Starting point

A verified organization claims to be the primary maintainer of a component, but
the submitted source-control evidence does not establish official authority.

### Flow

1. A platform operator marks the stewardship claim `disputed` with a protected
   reason; the organization's verified identity and platform participation stay
   unchanged.
2. The claimant supplies confirmation through the component's established
   official channel.
3. The operator verifies the relationship, scope, evidence category, and
   effective date.
4. The claim becomes `verified`, and authorized people may receive component-
   maintainer roles.
5. The public component page shows factual stewardship metadata without private
   evidence or reviewer identity.

### Result

Organization identity, platform participation, and component stewardship remain
separate questions with their own evidence and review history.

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
a replacement's authority and performs an audited recovery. Component
maintainers and program curators cannot appoint an organization administrator.

## Scenario 15 — A funding organization is suspended

### Before delivery starts

1. A platform operator suspends Rivierenstad's platform participation with
   notice and an appeal route.
2. Its active pledge is deactivated and its budget reservation releases.
3. Campaign coverage recalculates and may drop below 100%.
4. Restoration does not recreate the pledge; a funding representative must
   knowingly pledge again.

### After delivery starts

1. The locked pledge and reservation remain because the supplier relied on
   them.
2. Rivierenstad may replace its representative, transfer the reservation, review
   delivery, and vote on that existing commitment.
3. It cannot endorse, create another pledge, or increase a cap until restored.

### Result

Suspension blocks new authority without silently erasing a commitment on which
work has already started.

## Scenario 16 — Two campaigns compete for one budget

### Starting point

Rivierenstad has €20,000 available in a network-wide innovation budget. Two
funding representatives submit €15,000 maximum commitments at nearly the same
time against different components.

### Flow

1. The first pledge and reservation commit atomically.
2. The second transaction sees only €5,000 available and is rejected.
3. Bloei.me explains the insufficient balance without exposing budget details
   publicly.
4. The budget manager may increase the budget, choose another eligible budget,
   or reduce the proposed pledge before retrying.

### Result

Component and campaign boundaries never permit the same organization budget to
be overcommitted.

## Scenario 17 — Campaign terms must change after pledging

### Starting point

The supplier discovers that a required external standard changed after several
organizations pledged but before delivery started.

### Flow

1. The lead supplier drafts an amendment showing the old and new standard,
   acceptance criteria, delivery date, maximum price, and reason for the change.
2. A component maintainer confirms that this is a genuine scope change rather
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

The lead supplier or an in-scope component maintainer cancels a campaign with a
public reason. All pledges and reservations release immediately.

### Supplier failure after start

The lead supplier concludes that the supplier team cannot deliver. It declares
the campaign failed, publishes the reason and produced work, releases
reservations, and creates no settlement notes.

### Maintainer-initiated forced failure

1. A non-conflicted in-scope component maintainer publishes a proposed failure
   and reason.
2. New pledges, cap increases, review, voting, and settlement pause for seven
   days.
3. The lead supplier responds with evidence of progress or accepts failure.
4. The administrator withdraws or confirms failure after the response period.
5. A deployment operator may bypass the delay only for a legal, fraud, or
   security emergency.

## Scenario 19 — A supplier loses participation eligibility

### Starting point

A co-supplier's platform participation is suspended while delivery review has
five days remaining.

### Flow

1. Bloei.me suspends the campaign and freezes the five remaining review days.
2. New pledges, cap increases, evidence submission, review, voting, and
   settlement are blocked.
3. Existing organization commitments remain reserved.
4. A platform operator restores active participation after resolving the issue.
5. Review resumes with the original five days remaining; the delivery deadline
   is not extended retroactively.

### Failure variation

If participation cannot be restored, an in-scope component maintainer or
deployment operator uses the public failure process. Participation loss after
settlement never rewrites that settlement.

## Scenario 20 — An objection triggers negative-consent voting

### Starting point

Ten organizations funded a campaign with a two-thirds acceptance threshold.
Rivierenstad maintains a criterion-based objection after the lead supplier
responds and the full review period ends.

### Flow

1. Bloei.me opens a fresh formal window equal to the campaign review period.
2. Rivierenstad begins with an explicit `reject` position.
3. All funding representatives and organization administrators receive in-app
   and email notices plus reminders.
4. Two organizations explicitly accept. Seven organizations take no action.
   Any organization newly rejecting must reference a criterion and publish a
   reason.
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
4. Bloei.me creates no organization settlement notes.

### Partial-funding variation

If organizations cover only part of the final price, the settlement contains
their contribution lines plus a public supplier-contribution line. The lines
reconcile exactly to the final price.

## Scenario 22 — The lead completes a settlement note

### Starting point

Delivery was accepted and the immutable settlement allocated €12,000 to
Rivierenstad. Bloei.me created an `open` settlement note without a payee.

### Flow

1. The supplier team handles its invoices, recipients, taxes, and payment
   arrangements outside Bloei.me.
2. Its members tell the lead supplier that they consider Rivierenstad's
   external settlement handling complete.
3. An authorized lead-supplier representative marks the note `completed`.
4. Rivierenstad can privately see the status but cannot change it.
5. If the status was premature, the lead reopens it with a reason; the complete
   history remains available.

### Result

Completion never proves a bank payment or reveals a payee. It does not alter
the settlement or Rivierenstad's consumed budget.

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
2. A component maintainer confirms that no obligation changes.
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

1. The lead supplier and component maintainer leave the original campaign
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
2. All three organizations must have verified identities and active platform
   participation.
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

## Scenario 29 — Suppliers arrange settlement externally

### Starting point

Accepted settlement records that Rivierenstad owes €20,000 toward a campaign
delivered by one lead supplier and two co-suppliers.

### Flow

1. Bloei.me creates one note saying that Rivierenstad's final net campaign
   contribution is €20,000; it names no payee.
2. The supplier team decides externally how to arrange recipients, invoices,
   taxes, and division.
3. Bloei.me stores none of those arrangements.
4. When the team considers the external handling complete, the lead supplier
   marks the note `completed`.

### Boundaries

Bloei.me records only which pledger contributes what and whether the lead says
external handling is complete. It does not decide who receives money, how
suppliers share revenue, or how they resolve a disagreement.

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

## Scenario 31 — A delivery deadline passes without automatic failure

### Starting point

Delivery is active and fully funded, but the ultimate delivery date passes
before the lead supplier submits the result.

### Flow

1. Bloei.me keeps the primary state as `delivery` and adds the `overdue`
   condition.
2. The campaign publicly shows the missed date and sends notifications.
3. Pledges stay locked and reservations remain intact.
4. The lead supplier may still submit delivery, propose an amendment, or
   declare failure.
5. An in-scope component maintainer may use the formal forced-failure process
   rather than relying on an automatic transition.

### Result

An administrative delay remains transparent without destroying a viable
campaign. Holds and warnings do not multiply the primary lifecycle states.

## Scenario 32 — A representative loses authority during an open action

### Starting point

Rivierenstad has two funding representatives. One consented to an amendment and
then lost budget authorization before the organization's future multi-approval
request was complete.

### Flow

1. Bloei.me preserves every completed pledge and earlier organization action.
2. It invalidates the removed person's approval on the still-pending request.
3. The provisional reservation remains while another authorized representative
   is invited, subject to the request deadline.
4. A second representative reviews the current terms and supplies a replacement
   approval.
5. The public record ultimately attributes consent to Rivierenstad, while the
   private audit identifies both actors and the revocation.

### V1 variation

V1 completes a valid one-person action immediately, so later role removal does
not undo it. The pending behavior is prepared for future four-eyes policies.

## Scenario 33 — A municipality later enables four-eyes approval

### Starting point

A future Rivierenstad policy requires two distinct people to approve pledges
from its innovation budget.

### Flow

1. The first funding representative submits a 20% pledge request.
2. Bloei.me privately reserves its worst-case exposure but does not publish the
   pledge or count it toward campaign coverage.
3. A different authorized representative reviews and approves it.
4. The pledge becomes public and effective only after the second approval.
5. Rejection, expiry, or loss of authority before completion would release the
   provisional reservation.

### V1 boundary

The first release stores actions through authorization boundaries compatible
with this flow but offers only immediate one-person approval.

## Scenario 34 — A supplier representative or lead organization disappears

### Representative leaves

The individual managing a lead-supplier campaign leaves their employer. The
supplier organization administrator assigns another supplier representative.
No amendment is needed because the supplier organization and campaign terms
did not change.

### Lead organization cannot continue

1. The campaign pauses.
2. A verified co-supplier agrees to become lead and confirms the operational
   responsibility and attestations.
3. The supplier team proposes the replacement as a material amendment.
4. Every funder explicitly consents and affected budgets remain eligible.
5. The replacement becomes lead; otherwise the original terms remain and the
   campaign must eventually deliver or fail.

### Result

Bloei.me distinguishes ordinary staffing continuity from changing the publicly
promised supplier organization.

## Scenario 35 — A supplier cannot fund or accept its own campaign

### Starting point

A co-supplier also has a funding budget and attempts to pledge to the campaign
it helps deliver.

### Flow

1. Bloei.me rejects the pledge because supplier organizations are ineligible.
2. Any amount the supplier team chooses to bear remains supplier-funded
   exposure rather than a pledge.
3. The co-supplier receives no review ballot and does not count toward the
   acceptance threshold.
4. If there are no independent pledgers at submission, the campaign follows the
   self-funded path without review or voting.

### Result

Suppliers cannot manufacture funding coverage or vote to accept their own
delivery.

## Scenario 36 — Consent changes while an amendment is open

### Starting point

Four organizations fund a campaign. One amendment is open for a 14-day consent
period while another possible change remains a private draft.

### Flow

1. Three organizations consent and provisionally reserve any additional
   exposure.
2. One consenting organization changes its position to reject before
   activation; its provisional increase is released.
3. The fourth organization later consents, but unanimity is still absent.
4. The amendment expires at the deadline and the original terms remain.
5. The private competing draft never affected pledging or consent.

### Decisive-consent variation

If the rejecting organization changes back to valid consent before the
deadline, its final consent completes unanimity and activates the amendment
immediately. The confirmation warns that this action may be decisive.

## Scenario 37 — Duplicate funding organizations merge after delivery starts

### Starting point

Two accidentally duplicated Rivierenstad profiles each pledged before their
duplicate registration was discovered. Delivery has already started.

### Flow

1. A platform operator verifies and audits the duplicate merge.
2. Both frozen pledge positions remain in the fair allocation so other
   organizations' projected shares do not increase unexpectedly.
3. Representatives administer the commitments through the canonical profile.
4. At delivery, Bloei.me combines both allocated values into one Rivierenstad
   settlement contribution and one settlement note.
5. Public history explains the identity merge without exposing personal data.

### Pre-start variation

Before delivery starts, the canonical organization selects one cap and backing
budget instead because no supplier has yet relied on the duplicate positions.

## Scenario 38 — An early objection does not shorten review

### Starting point

Rivierenstad objects on day two of a 14-day review. Another organization finds
a different criterion problem on day eleven.

### Flow

1. Rivierenstad's public objection immediately prevents automatic acceptance.
2. The review deadline remains day fourteen so every other funder keeps its
   original opportunity.
3. The second organization submits its separate criterion-based objection.
4. The lead supplier responds to both but cannot request formal voting before
   the review period ends.
5. At day fourteen, the lead either resubmits, requests one vote covering the
   complete outcome, or eventually declares failure.

### Result

An early objector cannot shorten everybody else's review, and the supplier
cannot force an early contested decision.

## Scenario 39 — Every objection is withdrawn after review ends

### Starting point

The review period has ended with two open objections. The lead supplier answers
both without changing the delivered result.

### Flow

1. Each objecting organization decides that the response demonstrates its
   criterion and withdraws its own objection.
2. When the final objection is withdrawn, no contested issue remains.
3. Because every funder already received the complete review period, Bloei.me
   accepts delivery immediately without opening a vote.
4. Settlement and settlement notes are created atomically.

### Vote variation

If formal voting had already opened, withdrawal changes the objector's ballot
to `accept`; the ordinary voting rules still determine when the window closes.

## Scenario 40 — Moderation changes wording but not a funder's position

### Starting point

A valid criterion-based objection includes a personal accusation against a
supplier employee.

### Flow

1. A moderator hides the abusive personal wording and records the moderation
   reason.
2. The funding organization's underlying objection and initial reject position
   remain active.
3. The lead supplier responds to the substantive criterion issue.
4. The organization may withdraw, the lead may resubmit, or the issue may go to
   formal voting.

### Result

Moderation protects people and public discussion without becoming a hidden
technical acceptance decision.

## Scenario 41 — The final pledge races the funding deadline

### Starting point

A campaign is at 90% coverage. Rivierenstad submits a 10% pledge while the
exclusive funding deadline approaches.

### Flow

1. Bloei.me uses database time and one serialized transaction for pledge,
   reservation, coverage, start, and expiry decisions.
2. If the pledge commits one instant before the deadline, it is valid and the
   campaign starts delivery atomically at 100%.
3. If it commits at or after the deadline, it is rejected and the unstarted
   campaign expires.
4. The representative's browser countdown and network request-start time do not
   determine the result.

### Result

The system cannot both accept the last pledge and expire the same campaign.

## Scenario 42 — A review crosses a daylight-saving change

### Starting point

A 14-day review opens at 15:30 in the campaign's `Europe/Amsterdam` timezone
shortly before a daylight-saving transition.

### Flow

1. Bloei.me stores the opening and closing instants in UTC and the immutable
   campaign timezone separately.
2. The public deadline is 15:30 local time fourteen calendar days later.
3. The absolute elapsed hours may differ by one, but the promised local clock
   time remains stable.
4. Pages name the campaign timezone and may additionally show the viewer's
   local equivalent.

### Weekend variation

If the calculated deadline is a weekend or public holiday, it does not move.
Campaign authors must choose suitable dates; Bloei.me has no universal business
calendar.

## Scenario 43 — A suspension pauses review but not fixed dates

### Starting point

Review has five days remaining when a supplier loses identity verification. The
fixed ultimate delivery date passes during the suspension.

### Flow

1. Bloei.me stores the five remaining review days and pauses interaction.
2. It does not move the campaign delivery date or any backing budget expiry.
3. The campaign gains the public `overdue` condition while suspended.
4. After identity verification is restored, review resumes with five days
   remaining.
5. Changing a fixed date still requires an amendment and budget revalidation.

### Result

A hold preserves a fair action window without unilaterally rewriting the
commercial dates funders accepted.

## Scenario 44 — A platform outage affects a closing window

### Starting point

Bloei.me and its deployment-wide identity provider are unavailable across the
last two hours of an amendment consent window.

### Flow

1. The operator verifies and records the deployment outage.
2. Bloei.me calculates both the original deadline plus two hours and 24 hours
   after restoration.
3. It selects the later instant as the corrected deadline.
4. The public audit shows the outage interval, old and new deadline, scope,
   operator, and reason.
5. Notifications announce the correction to every affected organization.

### Funding-expiry variation

If an unstarted campaign logically expired during a qualifying outage, the
operator may restore it to funding only when no later lifecycle action occurred.
Both the expiry and exceptional restoration remain visible.

### Non-qualifying variation

A bounced email, forgotten password, absent employee, or one organization's
internal outage does not change the deadline.

## Scenario 45 — A closing job runs late

### Starting point

A review deadline is 15:30, but the automatic acceptance worker runs at 15:34.

### Flow

1. An objection committed at 15:29 is valid and prevents acceptance.
2. An objection attempted at 15:31 is rejected as late.
3. If no timely objection exists, the worker records acceptance as effective at
   15:30 even though processing occurred four minutes later.
4. Settlement creation remains idempotent if the worker retries.

### Result

Worker scheduling never extends a governance window or changes its outcome.

## Scenario 46 — An active organization joins the trust-based pilot

### Starting point

Rivierenstad's identity is verified, its platform participation is active, and
it has authorized a funding representative to use an eligible innovation budget.
V1 does not require a signed expenditure contract in Bloei.me.

### Flow

1. The representative reviews the exact campaign version, cap, worst-case
   amount, locking rule, and legal-responsibility notice.
2. They confirm that they are authorized by Rivierenstad to make the commitment
   and use the selected budget.
3. Bloei.me records the versioned confirmation and activates the pledge and
   reservation atomically.
4. Bloei.me does not inspect a procurement file or claim that verification
   proves statutory signing authority or procurement compliance.
5. The supplier team chooses whether to rely on the operational commitment.
6. After accepted delivery, Bloei.me calculates Rivierenstad's payee-free
   contribution note and external handling occurs outside the platform.

### Result

The pilot can operate through organizational trust while making its legal and
procurement limitations explicit rather than presenting assumptions as facts.

## Scenario 47 — A municipality later requires a signed agreement

### Starting point

In a future release, Rivierenstad configures its innovation budget so that an
external signed agreement is required before any pledge becomes effective.

### Flow

1. A funding representative submits a pledge request.
2. Bloei.me keeps it private and outside campaign coverage while the contract
   requirement is pending, with its worst-case exposure provisionally reserved.
3. Rivierenstad and the appropriate external counterparties complete their
   procurement and signing process outside Bloei.me.
4. An authorized person records protected agreement metadata, parties, scope,
   maximum amount, validity, signature status, external reference, and document
   hash or protected location.
5. Bloei.me validates the configured requirement and then activates the pledge,
   subject to its normal approvals, converting the provisional reservation.
6. A later campaign amendment determines against the versioned policy whether
   renewed agreement evidence is required.

### V1 boundary

The first release prepares domain boundaries only. It does not upload contracts,
provide electronic signatures, determine counterparties, or validate legal
enforceability.

## Scenario 48 — A Dutch organization proves identity and account control

### Starting point

An employee claims a Dutch organization that does not yet exist in the
deployment.

### Flow

1. Bloei.me searches normalized names and registration identifiers for an
   existing profile before allowing creation.
2. The claimant enters the KVK number and an official organization domain.
3. A deployment operator checks legal name, form, address, and active status
   against the Handelsregister.
4. Bloei.me confirms account control through an independently obtained official
   organization channel; possession of a matching email address alone is not
   enough.
5. The operator records source, reference, observed values, timestamp, reviewer,
   and decision without retaining a raw identity document by default.
6. The organization becomes `verified`, and the claimant becomes its initial
   administrator.
7. Its administrator accepts the current platform terms, making participation
   `active` without another component-specific application.

### Government variation

A Dutch public body uses the Register van Overheidsorganisaties and its official
domain register. A foreign organization uses an appropriate national register;
VIES may supplement but not replace legal-identity evidence.

## Scenario 49 — A maintainer confirms an official component release

### Starting point

A third-party supplier proposes a campaign that promises a new feature in an
official Epistola supported release.

### Flow

1. The supplier is identity-verified and active but is not Epistola's primary
   maintainer.
2. An authorized Epistola component maintainer reviews the exact target,
   acceptance criteria, and promised release.
3. The maintainer confirms that official integration is intended and the
   campaign snapshots that confirmation.
4. If confirmation is withheld, the supplier may revise the campaign to an
   accurately labelled extension, fork, or unconfirmed contribution.

### Result

Supplier eligibility does not by itself authorize an official upstream promise;
component stewardship and campaign participation answer different questions.

## Scenario 50 — An eligible supplier is not quality-certified

### Starting point

A verified, active organization is proposed as a campaign's lead supplier but
has no previous delivery history on Bloei.me.

### Flow

1. The campaign clearly shows “organization identity verified,” “active
   Bloei.me participant,” and its campaign-specific supplier confirmation.
2. It does not display “certified,” “trusted supplier,” or another competence
   endorsement.
3. The supplier representative confirms participation and attestations.
4. An in-scope component maintainer decides whether the campaign is suitable to
   publish and confirms only the upstream claims within their authority.
5. Future successful and failed campaigns form transparent history without
   changing the meaning of identity verification.

### Result

Funders can distinguish verified identity from delivery reputation and make
their own assessment.

## Scenario 51 — A material identity change triggers review

### Starting point

A registry signal indicates that a supplier changed legal form and official
domain during an active campaign.

### Flow

1. Bloei.me changes the global identity status to `review required` and records
   the trigger.
2. Existing locked commitments and history remain intact while new sensitive
   organization actions pause.
3. Because an active supplier no longer has verified identity, its campaign
   follows the supplier-suspension rules and stores remaining timers.
4. A deployment operator verifies whether this is an ordinary profile update,
   legal succession, or a different organization.
5. Successful re-verification resumes the campaign; succession may require an
   audited continuity action or supplier amendment.

### Minor-change variation

A simple address correction updates the profile with history and does not
automatically suspend participation. Identity verification has no scheduled
expiry; review is triggered by meaningful events.

## Scenario 52 — A visitor inspects a publicly funded campaign

### Starting point

A person who is not signed in wants to understand who funded a delivered
campaign and how acceptance was reached.

### Flow

1. The public campaign page shows its supplier team, terms, version history,
   evidence, lifecycle events, and final price.
2. It names each pledging organization and shows its maximum exposure,
   projected share, and final contribution.
3. It shows organization-owned amendment consents, objections, and final ballot
   classification, including deemed acceptance.
4. It does not show acting employees, organization memberships, budgets, cost
   centers, reservations, settlement-note completion, or verification evidence.
5. The visitor can follow an organization link to its minimal legal profile and
   factual verification and platform-participation status.

### Result

The funding and governance record is independently understandable without
publishing internal financial or personal data.

## Scenario 53 — An employee performs an official organization action

### Starting point

An authorized municipal funding representative consents to a material campaign
amendment.

### Flow

1. Bloei.me validates the employee's active membership, role, budget authority,
   and applicable approval policy.
2. The protected audit event records the employee, authority result, time, and
   exact amendment version.
3. The public campaign history records the municipality's consent and not the
   employee's name.
4. If that employee later leaves or deletes the account, the municipality's
   decision remains unchanged and the personal profile is anonymized according
   to retention rules.

### Result

The organization remains publicly accountable while Bloei.me retains only the
restricted personal evidence needed to operate and audit authorization.

## Scenario 54 — Unsuccessful supplier formation stays private

### Starting point

Two eligible supplier teams submit private drafts for the same public proposal.

### Flow

1. Authorized component maintainers compare scope, criteria, feasibility,
   maximum price, timing, licensing, history, capacity, and risk.
2. They select one team and record a concise rationale for the eventual public
   campaign.
3. The other team's identity, draft, price, and rejection reasoning remain
   private unless that supplier chose to show its interest publicly.
4. The rejected team may request review of an undisclosed conflict,
   discrimination, policy breach, or misrepresentation, but has no right to
   campaign publication.

### Result

Bloei.me supports fair, reviewable formation without operating a public auction
or exposing commercially sensitive unsuccessful drafts.

## Scenario 55 — A future public export cannot reveal private fields

### Starting point

A later release adds a public campaign API or downloadable transparency export.

### Flow

1. The interface reads from the same explicit public projection used by the
   public website.
2. Automated tests assert that budgets, memberships, actor identifiers,
   verification evidence, private moderation data, and settlement-note status
   are absent.
3. An authenticated organization export uses a separate permission-scoped
   projection and records access to protected data.
4. Images in public evidence have already been decoded, re-encoded, and stripped
   of metadata.

### Result

Adding another interface does not silently expand what Bloei.me publishes.

## Scenario 56 — Harmful wording does not erase an objection

### Starting point

A funding organization submits a valid criterion-based rejection whose
explanation includes an employee's telephone number and abusive wording.

### Flow

1. A user reports the explanation for personal information and harassment.
2. A moderator hides the wording and records both grounds, the affected text,
   and a reasoned decision while preserving the protected original.
3. The public campaign continues to show the organization, criterion, and
   `reject` position with a moderation tombstone.
4. The moderator cannot convert the ballot, dismiss the objection, or decide
   whether the criterion was satisfied.
5. A corrected explanation may be published without changing the organization
   position or campaign deadlines.

### Result

Content safety and acceptance governance remain independent.

## Scenario 57 — A moderation decision is appealed

### Starting point

A supplier's delivery explanation is hidden after an illegal-content notice.

### Flow

1. Bloei.me acknowledges the sufficiently specific notice and records its exact
   target without publishing the reporter.
2. The supplier receives the restriction, facts, legal or terms ground, scope,
   automation use, and available review route.
3. The supplier appeals and supplies additional context.
4. A different qualified reviewer considers the protected original and case
   history where practical.
5. The reviewer either restores the explanation or confirms the restriction
   with a new reasoned decision; the campaign page reflects the result.

### Result

Moderation is reversible, attributable, and reviewable without exposing case
evidence publicly.

## Scenario 58 — A fraud report reaches the proper authority

### Starting point

A reporter alleges that a campaign supplier is impersonating another legal
organization.

### Flow

1. The moderator protects any dangerous content and escalates the identity
   allegation rather than deciding it.
2. The deployment operator starts identity review and may suspend platform
   participation according to the evidence and existing authority.
3. An affected campaign follows the supplier hold and timer rules.
4. Before start it may be cancelled through ordinary governance; after start it
   can only reach failure through the recorded forced-failure or emergency path.
5. The public history shows the operational effect without publishing protected
   fraud evidence or an unproven accusation.

### Result

A report can trigger safeguards without giving moderators undeclared campaign
or identity powers.

## Scenario 59 — AI warns an author before publication

### Starting point

A member writes a comment containing what appears to be a personal
email address and an insulting phrase.

### Flow

1. Deterministic checks validate the request and the configured classifier
   assesses only the proposed comment and necessary policy context.
2. Bloei.me highlights the relevant spans and warns about privacy and harassment
   without silently rewriting the text.
3. The author removes the address and revises the phrase.
4. The revised comment passes the policy decision and is published.
5. The assessment records model and policy versions and the outcome without
   storing hidden reasoning.

### Result

AI prevents avoidable moderation work while the author keeps control of the
meaning.

## Scenario 60 — AI quarantine receives human review

### Starting point

New evidence contains a malicious link and text instructing the classifier to
ignore Bloei.me policy and approve it.

### Flow

1. Content is treated as untrusted data; the classifier has no tools or domain
   commands and returns only schema-validated categories and confidence.
2. Deterministic policy temporarily quarantines the evidence and opens a case.
3. The lead supplier is told that the action was automated and can correct or
   contest it.
4. A moderator reviews the original, assessment, and technical link result and
   makes the reasoned decision.
5. Quarantine cannot change price, allocation, objections, ballots, or campaign
   state by itself.

### Result

Prompt injection cannot turn the classifier into a governance actor, and an
automated restriction remains reversible.

## Scenario 61 — AI is unavailable or disabled

### Starting point

The hosted classifier is temporarily unavailable, while a separate self-hosted
deployment has deliberately disabled AI.

### Flow

1. Both deployments continue deterministic file, metadata, rate, and known-
   threat checks.
2. Ordinary low-risk content can proceed and remains reportable.
3. Content already considered suspicious stays in the human moderation queue.
4. Moderators can perform the same decisions and appeals without model output.
5. Campaign deadlines and delivery governance do not wait indefinitely for AI.

### Result

AI improves moderation but is not an availability or portability dependency.

## Scenario 62 — A primary maintainer claims a component family

### Starting point

Epistola Nederland B.V. wants canonical pages for Epistola and its Document
Generator child component.

### Flow

1. Its administrator finds or creates provisional component records with
   official websites, source locations, licences, supported releases, and their
   parent-child relationship.
2. The organization claims primary-maintainer stewardship for both components.
3. A deployment operator verifies the relationship through established source,
   release, governance, and official-channel evidence.
4. Bloei.me records versioned stewardship scope and effective dates while
   protecting raw evidence and reviewer identity.
5. The component pages show Epistola Nederland as primary maintainer without
   describing it as an exclusive, certified, or guaranteed supplier.

### Result

Component and stewardship identity are canonical across the deployment and can
be reused by every proposal and campaign.

## Scenario 63 — A primary maintainer leads a campaign directly

### Starting point

An endorsed proposal targets an official Epistola component, and Epistola
Nederland is prepared to deliver it.

### Flow

1. The primary maintainer prepares a private campaign draft without Bloei.me
   requiring a supplier competition.
2. Its authorized supplier representative confirms the lead role, maximum
   price, dates, licensing, attestations, and external allocation boundary.
3. The campaign records the official component target and promised release.
4. An authorized component maintainer completes the v1 publication approval;
   future four-eyes policy may require a distinct internal approver, but no
   unrelated external technical reviewer.
5. The public page discloses that Epistola Nederland is both primary maintainer
   and lead supplier.

### Result

An ordinary upstream-maintainer delivery path stays efficient while funders see
the inherent affiliation before pledging.

## Scenario 64 — A campaign changes several official components

### Starting point

A supplier team proposes an official integration between Epistola and GZAC.

### Flow

1. The campaign targets both components and a newly created integration
   component without introducing another site or duplicating component records.
2. It states exactly which components are modified, their promised releases,
   and who will maintain the new integration.
3. Authorized maintainers for Epistola and GZAC each confirm only their own
   official upstream claims.
4. Every supplier confirms participation; one is recorded as lead.
5. The canonical campaign becomes discoverable from both component pages and
   may also appear in a Common Ground program.

### Result

Cross-component work has one funding record while every upstream promise retains
the correct authority.

## Scenario 65 — A third party offers an independent extension

### Starting point

A third-party supplier can deliver an Epistola extension but has no confirmation
that it will enter the official Epistola release.

### Flow

1. The supplier may form a campaign because it is verified and active.
2. It cannot mark the target as an official supported release without an
   authorized component-maintainer confirmation.
3. It accurately labels the outcome as an independently maintained extension
   and names its own source and maintenance commitment.
4. Funders assess that upstream status, supplier history, scope, and criteria
   before pledging.

### Result

Bloei.me remains open to third-party innovation without allowing misleading
claims about official component inclusion.

## Scenario 66 — One website presents a curated program

### Starting point

Several organizations want a public overview of Common Ground document-service
work across multiple components and suppliers.

### Flow

1. Program curators create a Common Ground document-services page on
   `bloei.me/programs/common-ground-document-services`.
2. They curate relevant canonical components, proposals, and campaigns into the
   page without copying or taking ownership of them.
3. Each campaign retains one canonical URL, public history, supplier team, and
   funding record and may appear in other programs as well.
4. Organizations use the same verified identity, roles, budgets, and dashboard
   throughout Bloei.me.
5. A vanity subdomain may later redirect to the program but creates no separate
   login, terms, moderation policy, or data boundary.

### Result

Local narrative and discovery do not fragment the funding network.

## Scenario 67 — A component target changes after pledging

### Starting point

A campaign originally promised an official component release, but the supplier
now proposes delivery as an independent fork after organizations pledged.

### Flow

1. Bloei.me treats the changed component target, upstream status, source, and
   maintenance promise as material rather than a clarification.
2. The lead drafts a before-and-after amendment with the exact acceptance,
   budget, schedule, and risk effects.
3. Required suppliers and component maintainers confirm their continuing roles.
4. Every funding organization must explicitly consent and every affected budget
   must revalidate.
5. Without unanimous valid consent, the original official-release promise
   remains binding or the supplier uses the failure process.

### Result

Component metadata cannot be changed to evade the outcome that funders agreed
to finance.
