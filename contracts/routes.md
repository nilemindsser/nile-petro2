# ROUTE REGISTRY
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20

## Web Console — **17 routes + 6 drawers** (source: `04 · Web Console` routeIndex · re-measured)

| Path | Screen | Parent | Feature | Capability |
|---|---|---|---|---|
| `#login` | تسجيل الدخول — W01 | — | — | `public` |
| `#home` | لوحة المعلومات | Sidebar | — | `authenticated` |
| `#shifts` | الورديات | Sidebar | — | `canViewShifts` |
| `#shift-detail` | تفاصيل وردية | `#shifts` | — | `canViewShifts` |
| `#approvals` | الموافقات والتصاديق | Sidebar | — | `canApproveExpense` · `canApproveSupply` · `canReviewReading` |
| `#expenses` | المصروفات | Sidebar | `expenses` | `canViewExpenses` |
| `#expense-new` | مصروف جديد | `#expenses` | `expenses` | `canRecordExpense` |
| `#inventory` | المخزون والخزانات | Sidebar | `inventory` | `canViewInventory` |
| `#prices` | الأسعار | Sidebar | — | `canManagePrices` |
| `#nozzles` | تهيئة المسدسات | Sidebar | — | `canConfigureNozzles` |
| `#parties` | الجهات والأرصدة | Sidebar | — | `canViewParties` |
| `#workers` | العاملون والوصول | Sidebar | — | `canManageWorkers` |
| `#devices` | الأجهزة | Sidebar | `devices` | `canViewDevices` · `canApproveDevice` · `canRevokeDevice` · `canRequestDeviceWipe` |
| `#reports` | التقارير والتصدير | Sidebar | `reports` · `reportPdfExport` | `canViewReports` · `canExportReports` |
| `#support` | الدعم | Sidebar | — | `authenticated` |
| `#settings` | إعدادات النظام (التشغيل · القراءات والفروقات) | Sidebar | — | `canManageOperationalSettings` |
| `#account` | حسابي (الملف · الأمان · الجلسات) | Account menu | — | `canEditOwnProfile` |
| `drawer:worker` | درج تفاصيل عامل | `#workers` | — | `canManageWorkers` |
| `drawer:device` | درج تفاصيل جهاز | `#devices` | `devices` | `canViewDevices` |
| `drawer:nozzle` | درج تعديل مسدس | `#nozzles` | — | `canConfigureNozzles` |
| `drawer:price` | درج تغيير سعر | `#prices` | — | `canManagePrices` |
| `drawer:party-statement` | درج كشف حساب الجهة | `#parties` | — | `canViewParties` |
| `drawer:party-payment` | درج تسجيل دفعة | `#parties` | — | `canRecordPartyPayment` |

## Worker App — 4 tabs, 54 frames (source: `05 · Worker App`)

| Tab | Internal states | Capability |
|---|---|---|
| الرئيسية | splash · login · OTP · success · 04b enrolment offer · 04c biometric login · home | `public` → `authenticated` |
| ورديتي | start · readings · **15 close start · 16 closing reading · 16b close checklist** · review · closed | `authenticated` + own `assignedNozzles` |
| التنبيهات | list · filtered · empty | `authenticated` |
| حسابي | profile · **W50/W51 security** · devices & sessions · **W53 change access code** · preferences · support | `canEditOwnProfile` |

Expense and supply recording live inside ورديتي, gated by `canRecordExpense` / `canReceiveSupply`.

## Manager App — 98 frames, one canonical source (source: `06 · Manager App`)

| Section | Capability |
|---|---|
| home · station centre · nozzle assignment · worker shifts · station shift | `canViewShifts` · `canManageWorkers` |
| approvals · returns · conflicts | `canApproveExpense` · `canApproveSupply` · `canReviewReading` |
| inventory · tanks · supply | `canViewInventory` · `canReceiveSupply` · `canConfigureTank` |
| reports · devices · account · security · settings | `canViewReports` · `canViewDevices` · `canEditOwnProfile` |

**No orphan routes:** every entry above resolves to a frame in its canonical source, and every frame is reachable from a tab or a parent screen.

## F-02 / F-03 resolution (2026-09-20)

- **`#settings`** was already a rendered screen reached from the sidebar (`goSettings`); it is now a **registered** route governed by `canManageOperationalSettings`. No new sidebar item, no redesign. `readingVarianceTolerancePercent` resolves through this legal route: System Settings → Operations → Readings & Variance.
- **Payments & Statement (H4, KEEP V1)** resolve inside the canonical `#parties` parent using the existing drawer pattern — no new module, no standalone page. «عرض كشف الحساب» → `drawer:party-statement`; «تسجيل دفعة» → `drawer:party-payment`. Both verified reachable in the live DOM with **0 dead ends**.
