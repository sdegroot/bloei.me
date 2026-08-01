# Changelog

All notable changes to Bloei.me will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial product and implementation plan.
- Initial product and architecture decision register.
- End-to-end product scenarios covering organization onboarding, budgeting,
  funding, delivery, review, and settlement.
- Edge-case scenarios for tenant enrollment, organizational continuity,
  suspension, failure, negative consent, and historical integrity.
- Scope-change scenarios covering clarification, linked additions, unanimous
  amendments, non-response, and budget revalidation.
- Multi-supplier scenarios covering supplier-team creation, replacement,
  combined delivery, and externally arranged invoicing.

### Changed

- Replaced fixed campaign prices with an immutable maximum-price ceiling and a
  supplier-declared final price.
- Allowed suppliers to start delivery below full coverage while accepting the
  uncovered funding risk.
- Clarified global organizations, tenant-specific enrollment, organization-
  owned roles, and explicitly scoped cross-tenant budgets.
- Replaced quorum-based acceptance voting with notified negative consent.
- Added supplier suspension, cancellation and failure safeguards, self-funded
  delivery, supplier-contribution settlement lines, and private invoice-dispute
  states.
- Defined historical identity snapshots, personal anonymization, duplicate
  recovery, and exceptional audited redaction.
- Replaced mandatory re-pledging after every material change with explicit
  unanimous campaign amendments backed by successful budget revalidation.
- Allowed one lead supplier and optional co-suppliers per campaign while
  keeping work, price, and invoice allocation outside Bloei.me.
- Made invoice administration aggregate per funding organization so several
  external supplier invoices do not create platform-level supplier allocations.
