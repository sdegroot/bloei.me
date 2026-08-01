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
- **Supplier:** commits to an outcome, delivers it, and invoices funders after
  acceptance.

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
4. They request participation in the Epistola tenant and provide the evidence
   needed to verify the municipality and their authority to represent it.
5. An Epistola tenant administrator reviews the request.
6. The administrator verifies the organization for that tenant and confirms
   the initial organization administrator.
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
remain projections until the supplier submits delivery and locks the final
price.

## Scenario 5 — The supplier starts before full coverage

### Starting point

A campaign has a €100,000 maximum price but currently has only 40% coverage.
The supplier believes the work is strategically valuable and is willing to
take the remaining risk.

### Flow

1. The supplier reviews the pledged coverage and maximum committed amount.
2. It manually starts delivery at 40% coverage.
3. Bloei.me requires confirmation that the action is irreversible and that the
   supplier bears every uncovered final-price share.
4. Existing pledges lock immediately.
5. The public campaign records the start coverage and displays the supplier's
   current uncovered exposure.
6. Other organizations can still pledge until the first delivery submission.
7. Every late pledge explicitly acknowledges that it locks immediately because
   work has already started.

### Zero-coverage variation

The supplier may start at zero coverage and finance the work entirely itself.
The public campaign remains open to later pledges during delivery. If nobody
ever pledges, the supplier bears the complete final price.

### Deadline variation

If the supplier neither starts manually nor reaches full coverage before the
funding deadline, the campaign expires and all budget reservations are
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

1. The supplier completes the outcome and decides to charge €82,000.
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
7. The supplier invoices each organization externally and adds applicable tax.

### Result

The organizations benefit from the €18,000 reduction. Bloei.me does not require
the supplier to disclose internal costs or justify why it selected €82,000.

### Zero-price variation

The supplier may declare a final price of zero. Bloei.me releases every
reservation, creates a public zero settlement, and produces no invoice
obligations.

## Scenario 8 — Delivery is only partially funded

### Starting point

The supplier manually started a campaign at 60% coverage and no additional
organizations joined. It declares a €90,000 final price.

### Flow

1. The first delivery submission freezes the 60% combined pledge caps.
2. The organizations collectively pay at most 60% of €90,000: €54,000.
3. Bloei.me records the €36,000 remainder as supplier-funded exposure.
4. Pledgers review the complete outcome using the same acceptance criteria as a
   fully funded campaign.
5. After acceptance, the supplier invoices only the organization settlement
   lines and absorbs the remainder.

### Result

Starting early never allows the supplier to transfer its funding risk to the
pledging organizations.

## Scenario 9 — A pledger objects to delivery

### Starting point

The supplier submits a stable release, evidence, and a locked final price.

### Flow

1. Rivierenstad identifies that one published accessibility criterion is not
   demonstrated by the evidence.
2. Its funding representative submits an objection referencing that criterion.
3. The supplier corrects the work or supplies better evidence and resubmits.
4. The complete review period starts again.
5. If the disagreement remains, the supplier opens an organization vote.
6. Each pledging organization receives one vote.
7. The immutable campaign quorum and approval thresholds determine the result.
8. A successful vote accepts delivery; a failed vote returns it to revision.

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
