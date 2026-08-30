# Security Policy

## Scope

This policy covers the `orisan-site` codebase in this repository and the
website it deploys to orisan.org — for example XSS, dependency
vulnerabilities, exposed secrets, or hosting/configuration issues. It does
not cover other Orisan-org products (mcpscan, orisan-recorder,
orisan-witness); each of those publishes its own `SECURITY.md`.

## Reporting a Vulnerability

Please report suspected security issues privately. **Do not open a public
GitHub issue for a vulnerability.**

- **Contact:** [team@orisan.org](mailto:team@orisan.org?subject=Security) —
  published on the site's [contact page](https://www.orisan.org/contact).
- **Please include:** affected URL or page, a minimal reproduction, the
  expected versus actual behavior, and potential impact.

## Response Time

We aim to acknowledge new reports within **5 business days** of receipt.
*(Proposed default — confirm or adjust before merging.)*

## Disclosure Window

We ask for **90 days** from acknowledgment before public disclosure, to allow
time to validate, fix, and deploy. We're willing to negotiate a shorter or
longer window with the reporter depending on severity and complexity.
*(Proposed default — confirm or adjust before merging.)*

## Supported Versions

Only the version currently deployed at orisan.org (built from `main`) is
supported; there are no prior releases to maintain.
