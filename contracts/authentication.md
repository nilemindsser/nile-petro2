# AUTHENTICATION CONTRACT
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20

## Worker (current, closed)

| | |
|---|---|
| Primary | **Personal Access Code** |
| Routine password | **NO** |
| Routine OTP preference | **NO** |
| Exceptional verification | policy-driven only (new device · recovery) |
| Worker biometric | **CONDITIONAL — policy-gated** |
| Sessions / devices | YES |
| Change Access Code | **W53** canonical flow (exactly one) |
| Manager biometric | **UNCHANGED** |

### Biometric eligibility — all three required
```
device.status = ACTIVE
AND deviceMode = DEDICATED_WORKER
AND security policy allows biometric
⇒ workerBiometricAllowed = true      (server-derived; the client never infers it)
```

Shared station device ⇒ biometric **disabled**: no login button, no enrolment CTA, no preference row.
Reason: OS biometric proves an enrolled *device* user, not which station worker is currently using a shared device. Individual fingerprints are never mapped to worker accounts.

### Flows
```
First login   Access Code → exceptional verification if policy requires → session
              → if eligible: OPTIONAL enrolment offer (frame 04b) → Home
Returning     eligible + enabled → frame 04c → OS biometric prompt → Home
Fallback      "الدخول برمز الدخول" — ALWAYS present; biometric is never the only method
Ineligible    no disabled biometric button is shown; normal Access Code login
```

### Ownership & privacy
Verification is owned by iOS/Android. The app never receives, uploads or stores a fingerprint image or template — only the secure local credential that unlocks the authenticated device session.

### Invalidation
device revoked · capability disabled by policy · credential invalidated · security reset · OS biometric set changed (platform invalidates the protected key) · server invalidates the trusted-device/session relationship.
Recovery = Access Code + exceptional verification where required. **No silent bypass.**

### Failure states to implement
success · cancelled · failed · temporarily unavailable · OS lockout · credential invalidated · policy disabled → safe return to login with the Access Code fallback. Do **not** build an app-level attempt counter; the OS owns that policy.

**Supersession:** NP-WORKER-BIOMETRIC-01 supersedes exactly one clause of NP-WORKER-SECURITY-ALIGNMENT-01 ("Worker biometric = NO"). Everything else in that ruling stands. Archived documents that still say *Code + Password + OTP* are **SUPERSEDED — history only**.
