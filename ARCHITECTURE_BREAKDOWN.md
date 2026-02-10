# Lead Submission Architecture Breakdown

## Overview
This document explains how business and personal forms submit leads to Zapier, and whether business forms should reuse the existing architecture.

---

## Architecture Flow

### 1. **Frontend Form Component**
- **Business**: `src/components/forms/business/BusinessForm.tsx`
- **Personal (Auto)**: `src/components/forms/auto/AutoForm.tsx`

**What they do:**
- Collect user input across multiple steps
- Manage form state (formData)
- Handle Turnstile verification widget
- Save progress to localStorage
- Handle QR code agent attribution
- Submit to `/api/submit` endpoint

---

### 2. **Turnstile Widget** (`src/components/TurnstileWidget.tsx`)
**Purpose:** Bot protection via Cloudflare Turnstile

**What it does:**
- Renders Cloudflare verification widget
- Returns a single-use token to the form
- Token is required for submission

**Used by:** Both business and personal forms (same component)

---

### 3. **API Route** (`src/app/api/submit/route.ts`)
**Purpose:** Single unified endpoint for all form submissions

**What it does:**
1. **Origin validation** - Prevents cross-site submissions
2. **Parse request** - Extracts formType, answers, turnstileToken
3. **Verify Turnstile** - Server-side validation of bot protection
4. **Determine form type** - Routes to business or personal pipeline
5. **Resolve agent** - Server-side lookup to prevent spoofing
6. **Route & Map** - Transforms data using category-specific mapper
7. **Resolve webhook** - Gets correct Zapier URL for form type
8. **Forward to Zapier** - POSTs transformed payload

**Key insight:** This is a **shared endpoint** that handles both business and personal forms.

---

### 4. **Router** (`src/lib/submit/router.ts`)
**Purpose:** Routes requests to the correct mapper based on formType

**What it does:**
- Takes `formType` ("business" or "personal") and raw `answers`
- Calls appropriate mapper (mapBusiness or mapPersonal)
- Returns standardized result

---

### 5. **Mappers** (Transform raw form data → Zapier payload)

#### **Business Mapper** (`src/lib/submit/mappers/business.ts`)
**Transforms:**
```
Raw form data → AgencyZoom-compatible business payload
```

**Key fields:**
- businessName, streetAddress, city, state, postalCode
- contactName (built from firstName/lastName)
- email, phoneNumber
- leadOwner (agent assignment)
- yearBusinessStarted, numEmployees, nextExpirationDate
- **comments** - Contains products, businessType, and other details (since AgencyZoom lacks dedicated fields)

#### **Personal Mapper** (`src/lib/submit/mappers/personal.ts`)
**Transforms:**
```
Raw form data → AgencyZoom-compatible personal payload
```

**Key fields:**
- firstName, lastName, email, phone
- state, leadSource, notes
- tags, agent

**Note:** Personal mapper is simpler because all personal LOBs (auto/home/etc.) use the same structure.

---

### 6. **Webhook Resolver** (`src/lib/submit/webhook.ts`)
**Purpose:** Determines which Zapier webhook to use

**Environment variables:**
- `ZAPIER_WEBHOOK_BUSINESS` - For business leads
- `ZAPIER_WEBHOOK_PERSONAL` - For personal leads
- `ZAPIER_WEBHOOK_URL` - Fallback (optional)

**Security:** Webhook URLs are **never** exposed to the client.

---

### 7. **Supporting Utilities**

#### **Turnstile Verification** (`src/lib/submit/turnstile.ts`)
- Server-side verification with Cloudflare
- Validates single-use tokens

#### **Origin Validation** (`src/lib/submit/origin.ts`)
- Prevents unauthorized cross-site submissions

#### **String Utilities** (`src/lib/submit/utils/strings.ts`)
- `str()` - Safe string extraction
- `limit()` - Truncates to max length
- `firstNonEmpty()` - Finds first non-empty value from aliases

#### **Business Comments Builder** (`src/lib/submit/comments/businessComments.ts`)
- Formats products, business type, and questionnaire details into comments field
- Necessary because AgencyZoom lacks dedicated fields for these items

---

## Comparison: Business vs Personal Forms

| Aspect | Business Form | Personal Form (Auto) |
|--------|--------------|---------------------|
| **Form Component** | BusinessForm.tsx | AutoForm.tsx |
| **API Endpoint** | ✅ `/api/submit` (shared) | ✅ `/api/submit` (shared) |
| **Turnstile Widget** | ✅ Same component | ✅ Same component |
| **Router** | ✅ Uses routeAndMap() | ✅ Uses routeAndMap() |
| **Mapper** | mapBusiness() | mapPersonal() |
| **Webhook** | ZAPIER_WEBHOOK_BUSINESS | ZAPIER_WEBHOOK_PERSONAL |
| **QR Attribution** | ✅ Supported | ✅ Supported |
| **Agent Resolution** | ✅ Server-side | ✅ Server-side |
| **localStorage Progress** | ✅ Yes | ✅ Yes |

---

## Answer: Should Business Forms Reuse the Architecture?

### ✅ **YES - The architecture is already shared!**

The business form **already uses** the same architecture as personal forms:

### What's Shared (Reused):
1. ✅ **API endpoint** - `/api/submit` handles both
2. ✅ **Turnstile widget** - Same component
3. ✅ **Router logic** - Same routing system
4. ✅ **Webhook resolver** - Same resolution logic
5. ✅ **Origin validation** - Same security
6. ✅ **Agent resolution** - Same server-side lookup
7. ✅ **QR code attribution** - Same mechanism
8. ✅ **Form patterns** - Similar step-based UI

### What's Different (Category-Specific):
1. ❌ **Mapper** - Business has its own mapper (mapBusiness)
2. ❌ **Webhook URL** - Different environment variable
3. ❌ **Form fields** - Different data collected
4. ❌ **Validation rules** - Different requirements

---

## Key Architectural Decisions

### ✅ **Good Design Choices:**

1. **Single API endpoint** - Easier to maintain, consistent security
2. **Category-specific mappers** - Flexible for different data structures
3. **Server-side agent resolution** - Prevents client spoofing
4. **Environment-based webhooks** - Secure, never exposed to client
5. **Shared utilities** - DRY principle (string utils, validation)
6. **Type safety** - TypeScript types for all data structures

### 🎯 **Why This Works:**

The architecture uses **composition over duplication**:
- Shared infrastructure (API, security, routing)
- Pluggable mappers for different form types
- Easy to add new form types (just add a new mapper)

---

## Adding a New Form Type

If you wanted to add a new form type (e.g., "life insurance"), you would:

1. Create a new mapper: `src/lib/submit/mappers/life.ts`
2. Add to router: Update `routeAndMap()` to handle "life" category
3. Add webhook: Set `ZAPIER_WEBHOOK_LIFE` environment variable
4. Update webhook resolver: Add "life" case
5. Create form component: Similar to BusinessForm/AutoForm
6. **No changes needed** to API route, Turnstile, or security

---

## File Reference

### Core Files:
```
src/app/api/submit/route.ts          # Single API endpoint
src/lib/submit/router.ts             # Routes to correct mapper
src/lib/submit/mappers/business.ts   # Business data transformation
src/lib/submit/mappers/personal.ts   # Personal data transformation
src/lib/submit/webhook.ts            # Webhook resolution
src/lib/submit/turnstile.ts          # Bot protection
src/lib/submit/types.ts              # TypeScript types
src/components/TurnstileWidget.tsx   # Verification widget
```

### Form Components:
```
src/components/forms/business/BusinessForm.tsx
src/components/forms/auto/AutoForm.tsx
```

---

## Conclusion

**The business form already reuses the architecture.** The system is well-designed with:
- Shared infrastructure for security, routing, and submission
- Category-specific mappers for flexibility
- Clean separation of concerns
- Easy extensibility for new form types

**Recommendation:** Continue using this architecture. It's scalable, maintainable, and follows best practices.
