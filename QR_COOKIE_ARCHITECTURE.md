# QR Cookie Architecture for Agent Attribution

## Overview
The QR cookie system allows agents to share personalized links that lock their attribution to leads, ensuring proper commission tracking even if users navigate away and return later.

---

## Current Architecture (Business Form)

### 1. **QR Link Generation** (`/src/app/q/business/[agentId]/route.ts`)

**URL Pattern:** `/q/business/{agentId}`

**What it does:**
1. Validates agent exists and is active
2. Creates signed token with agent attribution
3. Sets HttpOnly cookie (`pl_qr`) for 7 days
4. Redirects to `/business?qr={token}`

**Token Structure:**
```typescript
{
  formType: "business",
  agentId: "agent-123",
  iat: 1234567890  // timestamp
}
```

**Token Format:** `{base64url_payload}.{hmac_signature}`

**Cookie Settings:**
- Name: `pl_qr`
- HttpOnly: `true` (prevents JavaScript access)
- SameSite: `lax` (allows navigation)
- Secure: `true` (production only)
- Path: `/` (available site-wide)
- MaxAge: 7 days

---

### 2. **QR Token Resolution** (`/src/app/api/qr/resolve/route.ts`)

**Endpoint:** `GET /api/qr/resolve?qr={token}` (optional query param)

**What it does:**
1. Checks for token in URL query param OR HttpOnly cookie
2. Verifies HMAC signature (prevents tampering)
3. Validates agent exists and is active
4. Returns lock status and agent info

**Response (locked):**
```json
{
  "locked": true,
  "agentId": "agent-123",
  "agentName": "John Doe",
  "formType": "business",
  "status": "available"
}
```

**Response (not locked):**
```json
{
  "locked": false
}
```

---

### 3. **Frontend Integration** (`BusinessForm.tsx`)

**Lines 72-110:**

```typescript
useEffect(() => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const qr = params.get('qr');

  // Store token for submission
  if (qr) setQrToken(qr);

  (async () => {
    try {
      // Call resolver (with or without URL token)
      const url = qr
        ? `/api/qr/resolve?qr=${encodeURIComponent(qr)}`
        : `/api/qr/resolve`;  // Falls back to cookie

      const res = await fetch(url);
      const data = await res.json().catch(() => null);

      if (data?.locked && data?.agentId) {
        // Lock agent selection
        setAgentLocked(true);
        setLockedAgentName(data?.agentName ?? null);

        // Override form data with locked agent
        setFormData((prev) => ({
          ...prev,
          selectedAgentId: data.agentId,
        }));
      } else {
        // Clear lock state if not locked
        setAgentLocked(false);
        setLockedAgentName(null);
      }
    } catch (e) {
      console.error('Failed to resolve QR context:', e);
    }
  })();
}, []);
```

**Lines 175-182 (Prevent agent override):**

```typescript
const updateFormData = (updates: Partial<BusinessFormData>) => {
  // If QR locked, ignore any attempts to change agent selection
  if (agentLocked && 'selectedAgentId' in updates) {
    const next = { ...(updates as any) };
    delete (next as any).selectedAgentId;
    updates = next;
  }
  
  setFormData((prev) => ({ ...prev, ...updates }));
};
```

---

## Architecture Flow Diagram

```
Agent shares link: /q/business/agent-123
         ↓
[QR Generation Route]
  - Validates agent
  - Signs token
  - Sets pl_qr cookie (7 days)
  - Redirects to /business?qr=token
         ↓
[Business Form Loads]
  - Reads qr from URL
  - Calls /api/qr/resolve
         ↓
[QR Resolver API]
  - Checks URL param OR cookie
  - Verifies signature
  - Returns lock status
         ↓
[Form State Updated]
  - agentLocked = true
  - selectedAgentId = agent-123
  - Agent dropdown disabled
         ↓
[User Navigates Away]
  - Cookie persists
         ↓
[User Returns to /business/form]
  - No qr in URL
  - Calls /api/qr/resolve (no param)
  - Resolver reads pl_qr cookie
  - Agent still locked! ✅
```

---

## Key Security Features

1. **HMAC Signature** - Prevents token tampering
2. **HttpOnly Cookie** - Prevents XSS attacks
3. **Server-side Validation** - Agent lookup on every request
4. **Time-based Tokens** - Includes timestamp (optional expiry)
5. **Secure Flag** - HTTPS-only in production
6. **SameSite=lax** - CSRF protection

---

## Why This Architecture Works

### ✅ **Persistence Across Navigation**
- Cookie survives page refreshes and navigation
- User can browse site and return to form

### ✅ **Security**
- Token cannot be forged (HMAC signature)
- Cookie cannot be read by JavaScript (HttpOnly)
- Agent validation happens server-side

### ✅ **Flexibility**
- Works with URL token (initial visit)
- Falls back to cookie (subsequent visits)
- Gracefully handles missing/invalid tokens

### ✅ **User Experience**
- Seamless attribution
- No manual agent selection needed
- Clear UI indication (locked agent display)

---

## Current Gap: AutoForm

**AutoForm currently has:**
- ❌ No QR generation route (`/q/auto/[agentId]`)
- ⚠️ Basic QR validation (URL only, no cookie fallback)
- ⚠️ Uses deprecated `/api/qr/validate` endpoint

**AutoForm.tsx Lines 73-85:**
```typescript
useEffect(() => {
  if (qrToken) {
    fetch(`/api/qr/validate?token=${qrToken}`)  // ❌ Wrong endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.agentId) {
          setAgentLocked(true);
          setLockedAgentName(data.agentName || 'Your Agent');
          setFormData((prev) => ({ ...prev, selectedAgentId: data.agentId }));
        }
      })
      .catch(() => {});
  }
}, [qrToken]);
```

---

## Implementation Plan for AutoForm

### **Phase 1: Create QR Generation Route**

**File:** `/src/app/q/auto/[agentId]/route.ts`

```typescript
import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAgentById } from "@/lib/agents/getAgents";

const QR_SECRET = process.env.QR_SIGNING_SECRET;

function signPayload(payload: object) {
  if (!QR_SECRET) throw new Error("QR_SIGNING_SECRET is not set");
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString("base64url");
  const sig = crypto.createHmac("sha256", QR_SECRET).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

export async function GET(req: Request, { params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const origin = new URL(req.url).origin;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? origin;

  const agent = getAgentById(agentId);

  if (!agent || agent.status === "inactive") {
    const fallback = new URL("/personal/auto/form", appUrl);
    return NextResponse.redirect(fallback);
  }

  const token = signPayload({
    formType: "auto",
    agentId: agent.id,
    iat: Date.now(),
  });

  const redirectUrl = new URL("/personal/auto/form", appUrl);
  redirectUrl.searchParams.set("qr", token);

  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set({
    name: "pl_qr",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
```

---

### **Phase 2: Update AutoForm.tsx**

**Replace Lines 73-85 with:**

```typescript
// Resolve QR context (URL token if present, otherwise HttpOnly cookie via the API) and lock agent attribution
useEffect(() => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const qr = params.get('qr');

  // Store token for submission
  if (qr) setQrToken(qr);

  (async () => {
    try {
      const url = qr
        ? `/api/qr/resolve?qr=${encodeURIComponent(qr)}`
        : `/api/qr/resolve`;  // Falls back to cookie

      const res = await fetch(url);
      const data = await res.json().catch(() => null);

      if (data?.locked && data?.agentId) {
        setAgentLocked(true);
        setLockedAgentName(data?.agentName ?? null);

        // Override any saved/local selection with the locked agent
        setFormData((prev) => ({
          ...prev,
          selectedAgentId: data.agentId,
        }));
      } else {
        // If not locked, ensure we don't keep stale lock state
        setAgentLocked(false);
        setLockedAgentName(null);
      }
    } catch (e) {
      console.error('Failed to resolve QR context:', e);
    }
  })();
}, []);
```

**Add agent lock protection to updateFormData:**

```typescript
const updateFormData = (updates: Partial<AutoFormData>) => {
  // If QR locked, ignore any attempts to change agent selection
  if (agentLocked && 'selectedAgentId' in updates) {
    const next = { ...(updates as any) };
    delete (next as any).selectedAgentId;
    updates = next;
  }

  setFormData((prev) => ({ ...prev, ...updates }));
};
```

---

### **Phase 3: Update AutoFormPage.tsx**

**Current code passes qrToken as prop - this is fine, but not needed:**

```typescript
// BEFORE (current)
function AutoFormContent() {
  const searchParams = useSearchParams();
  const qrToken = searchParams.get('qr') || undefined;
  return <AutoForm qrToken={qrToken} />;
}

// AFTER (simplified - AutoForm reads URL internally)
function AutoFormContent() {
  return <AutoForm />;
}
```

**Remove qrToken prop from AutoForm interface:**

```typescript
// BEFORE
interface AutoFormProps {
  qrToken?: string;
}

export default function AutoForm({ qrToken }: AutoFormProps) {

// AFTER
export default function AutoForm() {
```

---

### **Phase 4: Testing Checklist**

1. ✅ Generate QR link: `/q/auto/agent-123`
2. ✅ Verify redirect to `/personal/auto/form?qr=token`
3. ✅ Verify cookie is set (check DevTools → Application → Cookies)
4. ✅ Verify agent is locked in form
5. ✅ Navigate away and return (without qr param)
6. ✅ Verify agent is still locked (cookie fallback)
7. ✅ Try to change agent in form (should be blocked)
8. ✅ Submit form and verify agentId is included
9. ✅ Test with invalid/expired token
10. ✅ Test with inactive agent

---

## Files to Create/Modify

### Create:
- ✅ `/src/app/q/auto/[agentId]/route.ts` (new QR generation route)

### Modify:
- ✅ `/src/components/forms/auto/AutoForm.tsx` (update QR resolution logic)
- ✅ `/src/app/personal/auto/form/page.tsx` (simplify - remove qrToken prop)

### No Changes Needed:
- ✅ `/src/app/api/qr/resolve/route.ts` (already supports all form types)
- ✅ `/src/lib/agents/getAgents.ts` (already has agent lookup)

---

## Benefits of This Implementation

1. **Consistent Architecture** - Same pattern as BusinessForm
2. **Cookie Persistence** - Attribution survives navigation
3. **Security** - HMAC signatures, HttpOnly cookies
4. **Reusable** - Same resolver API for all forms
5. **Minimal Code** - Leverage existing infrastructure

---

## Future Enhancements

1. **Token Expiry** - Add TTL validation in resolver
2. **Analytics** - Track QR link usage per agent
3. **Multi-form Support** - Single QR for all form types
4. **Admin Dashboard** - Generate QR codes via UI
5. **Deep Links** - Pre-fill form data via QR payload

---

## Example Agent Links

```
Business: https://planlife.com/q/business/agent-123
Auto:     https://planlife.com/q/auto/agent-123
Home:     https://planlife.com/q/home/agent-123
```

All use the same cookie (`pl_qr`) and resolver API!
