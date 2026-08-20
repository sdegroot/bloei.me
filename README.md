# Bloei.me

Bloei.me is a public co-funding network where organizations reserve innovation
budgets and collectively fund concrete open-source outcomes. This repository
contains the product design and the executable application foundation.

## Architecture

The production build deliberately has two Gradle projects:

- `modules/core` contains business feature packages, feature-owned persistence,
  Flyway migrations, and concrete DBOS workflows as those capabilities arrive.
- `apps/app` contains the Spring Boot composition root, Thymeleaf/HTMX interface,
  OIDC security, database/session configuration, and operational endpoints.

Spring Modulith verifies feature-package boundaries. There are no global
adapter projects and no empty projects for planned REST or MCP interfaces.

## Prerequisites

- Docker or Podman with Compose support
- [mise](https://mise.jdx.dev/) for the pinned Java 25 and Gradle toolchain, or
  a compatible Java 25 installation

Install the pinned tools with `mise install`.

## Run locally

The shortest path runs the development-only persona login and PostgreSQL:

```shell
docker compose up --build
```

Open <http://localhost:8080/dev/personas>. The yellow banner identifies the
non-production authentication artifact. The standard production JAR and OCI
image are automatically checked to contain none of these classes.

To run the application from Gradle while PostgreSQL is available locally:

```shell
mise run dev
```

Optional local services are isolated behind Compose profiles:

```shell
docker compose --profile oidc up authentik-server authentik-worker
docker compose --profile object-storage up s3mock
docker compose --profile mail up mailpit
```

Authentik is available at <http://localhost:9000/if/flow/initial-setup/> on its
first start. Configure an OAuth2/OIDC provider with callback
`http://localhost:8080/login/oauth2/code/bloei`; the automated OIDC contract
test uses a protocol stub and does not depend on this manual instance. S3Mock
listens on port 9090, Mailpit SMTP on 1025, and its UI on 8025. No application
storage or mail client is added until a business feature requires it.

## Verification

```shell
mise run format
mise run check
mise run browser-install
mise run full-check
```

`check` covers formatting, compilation, Spring Modulith boundaries, unit and
PostgreSQL integration tests, OIDC behavior, Flyway, Exposed transaction
rollback, DBOS restart recovery, and production-artifact isolation.
`full-check` additionally runs Playwright Chromium and axe-core accessibility
checks. Tests requiring Docker are skipped only when Docker is unavailable.

Create the production OCI image with:

```shell
./gradlew :apps:app:bootBuildImage
```

The build uses Buildpacks, targets JVM 25, and produces a non-root image. CI
also creates a CycloneDX SBOM and scans the image and dependencies.

## Production configuration

The default `oidc` profile requires these variables:

- `BLOEI_DATABASE_URL`, `BLOEI_DATABASE_USERNAME`, `BLOEI_DATABASE_PASSWORD`
- `BLOEI_OIDC_ISSUER_URI`, `BLOEI_OIDC_CLIENT_ID`, `BLOEI_OIDC_CLIENT_SECRET`
- `BLOEI_DBOS_EXECUTOR_ID`, a stable logical executor identity
- `BLOEI_VERSION`, the deployed application/workflow version

Production uses secure, HTTP-only, same-site PostgreSQL-backed sessions.
Readiness and liveness are exposed below `/actuator/health`; Prometheus metrics
are available at `/actuator/prometheus` but must be protected by the deployment
network.

DBOS Core runs with one stable executor in v1. Do not overlap application
replicas with the same executor identity. Active-active recovery requires a
separate architecture and deployment decision.

## Contribution workflow

Update `CHANGELOG.md` for every notable change, apply local formatting, run the
relevant checks, and commit meaningful units using Conventional Commits. Do not
push changes without explicit permission.
