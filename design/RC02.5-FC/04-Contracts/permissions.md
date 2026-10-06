# PERMISSIONS & CAPABILITIES
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20

Permissions are **server-authoritative**. The UI reads capability booleans through the config/session provider and hides or blocks accordingly — it never computes authority locally.

## Capability registry (from the current canonical sources)

| Capability | Governs | Surfaces |
|---|---|---|
| `canViewShifts` | shift list + detail | Web · Manager |
| `canApproveExpense` | expense approval | Web · Manager |
| `canApproveSupply` | supply approval | Web · Manager |
| `canReviewReading` | reading variance review | Web · Manager |
| `canViewExpenses` / `canRecordExpense` | expenses | Web · Worker · Manager |
| `canViewInventory` | inventory + tanks | Web · Manager |
| `canReceiveSupply` | receive a supply load | Worker · Manager |
| `canManagePrices` | price list + change drawer | Web |
| `canConfigureNozzles` | nozzle configuration | Web |
| `canConfigureTank` | tank configuration | Manager |
| `canViewParties` | credit parties + balances | Web |
| `canManageWorkers` | worker records + access | Web |
| `canViewDevices` · `canApproveDevice` · `canRevokeDevice` · `canRequestDeviceWipe` | device lifecycle | Web · Manager |
| `canViewReports` · `canExportReports` | reports + export | Web · Manager |
| `canManageOperationalSettings` | System Settings → Operations (incl. `readingVarianceTolerancePercent`) | Web |
| `canRecordPartyPayment` | record a payment against a credit party | Web |
| `canEditOwnProfile` | own account | all |
| `authenticated` | any signed-in surface | all |
| `public` | login only | all |

## Role × Surface matrix

| Role | Web Console | Worker App | Manager App |
|---|---|---|---|
| **Owner** | ALLOWED — full capability set | NOT APPLICABLE | ALLOWED (read + approve) |
| **Manager** | ALLOWED — operational subset per granted capabilities | NOT APPLICABLE | ALLOWED — primary surface |
| **Worker** | DENIED | ALLOWED — own shift + own assigned nozzles only | DENIED |

Every cell is enforced by the capability column above, not by the surface. A worker's scope is additionally narrowed to `assignedNozzles` and `activeStationId`.

## Feature flags (gate whole modules)
`expenses` · `inventory` · `devices` · `reports` · `reportPdfExport`
A disabled feature removes its route, its nav entry and its capability checks together.

## Newly named capabilities (2026-09-20)
No existing capability governed Operational Settings or party payment recording, so two are defined **as technical contracts only**:

| Capability | Contract |
|---|---|
| `canManageOperationalSettings` | SERVER-AUTHORITATIVE. Gates `#settings`. |
| `canRecordPartyPayment` | SERVER-AUTHORITATIVE. Gates `drawer:party-payment`; the action renders only when the session boolean is true. |

**No role grant is implied.** Neither capability is assigned to Owner, Manager or any role in UI code — the session/server supplies the boolean. Owner rulings H4 and H8 are unchanged (both KEEP V1).
