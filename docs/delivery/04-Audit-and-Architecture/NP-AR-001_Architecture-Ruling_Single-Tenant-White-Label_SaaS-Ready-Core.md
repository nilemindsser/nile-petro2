# NILE PETRO — ARCHITECTURE RULING
## NP-AR-001 · Single-Tenant White-Label Deployment · SaaS-Ready Core

| Field | Value |
|---|---|
| Document ID | NP-AR-001 |
| Version | 1.0.0 |
| Date | 2026-09-18 |
| Ruled by | Owner, Nile Minds For Digital Technologies |
| Recorded by | CTO |
| Status | BINDING. Overrides any earlier wording in NP-MR-001 v2.0, NP-MR-001-R01, the master review document, and CD-09. |

---

## 1. THE RULING

The product is a **Single-Tenant White-Label Deployment with a SaaS-Ready Core**.

Each client receives a separate configuration, branding, environment, database and deployment. **The running deployment resolves exactly one tenant.**

This is the approved term. The product is **not** described as runtime multi-tenant SaaS in any document, design file, handoff artifact or client material.

### Kept (built now)

- `tenantId` in domain and data contracts
- the tenant configuration contract (manifest)
- feature flags
- permissions
- station scope and `activeStationId`

### Not built now

- tenant selector
- tenant switching
- runtime multi-tenant UI
- tenant administration SaaS console
- cross-tenant operations

### Resolution chains

```
NOW      Deployment → fixed tenantId → client configuration → authorized stations → operational data
FUTURE   Login / Domain → resolve tenantId → tenant configuration → authorized stations → operational data
```

Branding is loaded today from client/build configuration. In a future SaaS it may be loaded from a tenant configuration service or database. **The UI and the components must not need redesign when that changes.**

---

## 2. WHAT THIS CHANGES — AND WHAT IT DOES NOT

**Does not change:** the `tenantId` field in any contract, the manifest shape, feature and permission evaluation order, station scoping, the white-label zero-literal rule, the tenant A/B/C configuration test, or any finding in NP-MR-001-R01. None of those depended on runtime switching.

**Changes:** terminology in every document, the definition of the "White-Label" gate row, and the removal of any implied tenant-switching surface from scope.

**Reframes:** Tenant A/B/C is a **configuration parity test**, not a runtime switching test. Its purpose is to prove that nothing in the design is bound to one client's values.

---

## 3. SaaS-READINESS INVARIANTS

These are what make "SaaS-ready" a measurable claim instead of a hope. Each is verifiable now, on a single-tenant build.

| ID | Invariant |
|---|---|
| I-01 | `tenantId` exists on every domain record and every request context. The server derives it from the deployment or the session; a client-supplied `tenantId` is never trusted as authority. |
| I-02 | Every read and write is scoped by `(tenantId, stationId)` even though one tenant resolves today. Scoping is never omitted "because there is only one". |
| I-03 | The UI reads tenant values **only** through one configuration provider interface. Direct reads of build constants inside components: 0. Swapping the provider's source (bundled file → service) must require no component change. |
| I-04 | Configuration loading has designed states now: loading, loaded, failed. A failed load is a blocking application state with a recovery action — not a silent fallback to defaults. |
| I-05 | Brand assets are referenced by descriptor (key or URL), not by a fixed path inside a component. Logo and app icon have loading and fallback states, since a future source may be remote. |
| I-06 | Dark theme colours are **derived at runtime from the manifest**, not baked per tenant into components or into the design source. A hand-baked per-tenant colour table breaks SaaS readiness. (This is the open item PF-03.) |
| I-07 | The manifest carries `schemaVersion`. Required fields missing → blocking configuration error. Unknown fields → tolerated, so an older deployment's config stays readable by a newer build. |
| I-08 | Feature flags and permissions are evaluated from configuration and session, never from build-time flags or compiled variants. |
| I-09 | No tenant selector, no tenant switcher, no tenant name in navigation chrome beyond the brand slot. Station selector rules are unchanged: hidden with one authorized station, visible with several. |
| I-10 | Authentication screens carry no tenant field. Future resolution by domain or email is invisible to the layout. |
| I-11 | Copy and localization keys are tenant-neutral. Every client-specific string comes from `tenant.brand` or `tenant.company`. |
| I-12 | `tenantId` is carried in logs, exports and analytics payloads, so a future aggregated environment needs no data migration. |

---

## 4. ADDED VERIFICATION CHECKS

Appended to NP-MR-001 v2.0 §7.

| ID | Check | Expected |
|---|---|---|
| MC-13 | Direct build-constant or literal tenant reads inside reusable components | 0 |
| MC-14 | Configuration `failed` state designed in all three surfaces (web, worker, manager) | 3 of 3 |
| MC-15 | Brand assets referenced by descriptor with loading and fallback states | 100 % |
| MC-16 | Manifest contains `schemaVersion` and a required-field list | present |
| MC-17 | Dark colours derived from manifest values rather than fixed per-tenant tables in the design source | derived, 0 baked tables |
| MC-18 | Tenant-switching surfaces present in the design (selector, switcher, tenant admin) | 0 |
| MC-19 | Occurrences of "multi-tenant SaaS" or equivalent describing the **current** product, in any document or design file | 0 |

---

## 5. DOCUMENT AMENDMENTS

| Document | Amendment |
|---|---|
| Master review document (Annex A) | §01 Architecture, §05 Tenant Scope, §06 Tenant Manifest, §07 White-Label: adopt the NP-AR-001 terminology. "Multi-Tenant Branding Layer" → "White-Label Tenant Configuration Layer (single tenant per deployment)". §52 Tenant Testing → "Tenant Configuration Parity Test". |
| NP-MR-001 v2.0 | §7 gains MC-13…MC-19. The "White-Label" gate row now means: zero tenant literals + configuration-driven + invariants I-01…I-12 verified. It does not mean runtime switching. |
| NP-MR-001-R01 | No finding changes. PF-03 gains weight: an unspecified dark derivation now also breaks I-06. |
| CD-09 and successors | Header line "ONE SOURCE CODE · N TENANTS" → "ONE SOURCE CODE · ONE TENANT PER DEPLOYMENT · SaaS-READY". The tenant table is relabelled as a configuration parity test. |
| Flutter handoff | State the deployment model on the cover: one build configuration per client, one tenant resolved per deployment, configuration provider abstraction required from day one. |

---

## 6. NOTE ON THE DEPLOYMENT MODEL

Separate database and deployment per client is a sound choice for this market: it isolates client data, and it keeps a failure inside one client. It carries one cost worth naming now, because it is cheap to prepare for and expensive to retrofit:

**Every schema or configuration change fans out across N deployments.** `schemaVersion` in the manifest (I-07) plus a recorded per-deployment build version are what keep that manageable. They belong in the handoff contract, not in a later fix.

---

## 7. OPEN OWNER DECISIONS — UNCHANGED

This ruling settles the tenancy model. It does not settle G (typography), H (scope of the absent modules), J (authentication and OTP), or N (dark derivation). N is now also a SaaS-readiness item through I-06.
