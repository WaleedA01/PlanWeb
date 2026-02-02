"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TurnstileWidget } from "@/components/TurnstileWidget";

type PersonalLeadDraft = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  leadSource: string;
  notes: string;
};

const STORAGE_KEY = "pl_personal_test_payload";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default function PersonalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = (searchParams.get("step") ?? "info").toLowerCase();
  const isVerifyStep = step === "verify";

  const [draft, setDraft] = useState<PersonalLeadDraft>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "FL",
    leadSource: "Questionnaire Test",
    notes: "Testing Next.js → Turnstile → Zapier",
  });

  const [savedPayload, setSavedPayload] = useState<PersonalLeadDraft | null>(null);
  const [tsToken, setTsToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // When we land on the verify step, load the saved payload from sessionStorage.
  useEffect(() => {
    if (!isVerifyStep) return;

    const stored = safeJsonParse<PersonalLeadDraft>(
      typeof window !== "undefined" ? window.sessionStorage.getItem(STORAGE_KEY) : null
    );

    setSavedPayload(stored);
    setTsToken(null);
    setResult(null);
    setError(null);
  }, [isVerifyStep]);

  const canGoNext = useMemo(() => {
    const emailOk = draft.email.trim().includes("@");
    return (
      draft.firstName.trim().length > 0 &&
      draft.lastName.trim().length > 0 &&
      emailOk &&
      draft.phone.trim().length > 0
    );
  }, [draft]);

  function goToVerify() {
    setError(null);
    setResult(null);

    if (!canGoNext) {
      setError("Please fill required fields (first, last, email, phone). ");
      return;
    }

    // Persist draft between steps without putting PII in the URL.
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    router.push("/personal?step=verify");
  }

  function goBack() {
    setError(null);
    setResult(null);
    router.push("/personal?step=info");
  }

  async function handleSubmit() {
    setError(null);
    setResult(null);

    if (!savedPayload) {
      setError("Missing saved payload. Go back and re-enter the form.");
      return;
    }

    if (!tsToken) {
      setError("Please complete the verification.");
      return;
    }

    setLoading(true);

    const payload = {
      ...savedPayload,
      // hard-coded fields requested
      tags: "online",
      agent: "Oraib Aref",
      // turnstile token
      turnstileToken: tsToken,
    };

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data?.error ?? "Submit failed");
      // token is single-use; if you want, reset:
      // window.turnstile?.reset();
      return;
    }

    setResult(data);
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Personal Test Submit</h1>
      <p style={{ marginTop: 8 }}>
        Dummy page to validate Turnstile → API → Zapier.
      </p>

      {!isVerifyStep ? (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            Step 1 — Enter Personal Lead Info
          </h2>

          <div style={{ display: "grid", gap: 10 }}>
            <label>
              First Name*
              <input
                value={draft.firstName}
                onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))}
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>

            <label>
              Last Name*
              <input
                value={draft.lastName}
                onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))}
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>

            <label>
              Email*
              <input
                value={draft.email}
                onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                type="email"
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>

            <label>
              Phone*
              <input
                value={draft.phone}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                inputMode="tel"
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>

            <label>
              State
              <input
                value={draft.state}
                onChange={(e) => setDraft((d) => ({ ...d, state: e.target.value }))}
                maxLength={2}
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>

            <label>
              Lead Source
              <input
                value={draft.leadSource}
                onChange={(e) => setDraft((d) => ({ ...d, leadSource: e.target.value }))}
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>

            <label>
              Notes
              <textarea
                value={draft.notes}
                onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
                rows={3}
                style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </label>
          </div>

          <button
            onClick={goToVerify}
            disabled={!canGoNext}
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          >
            Next: Verify & Submit
          </button>

          {error && <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>}
        </section>
      ) : (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            Step 2 — Turnstile Verification (Triggers on Render)
          </h2>

          {!savedPayload ? (
            <p style={{ marginTop: 8, color: "crimson" }}>
              No saved payload found. Click Back and re-enter the form.
            </p>
          ) : (
            <>
              <div style={{ background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Payload Preview</div>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(
                    {
                      ...savedPayload,
                      tags: "online",
                      agent: "Oraib Aref",
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              <div style={{ marginTop: 16 }}>
                <TurnstileWidget onToken={setTsToken} />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  onClick={goBack}
                  disabled={loading}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                >
                  Back
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                >
                  {loading ? "Submitting..." : "Submit Test Lead"}
                </button>
              </div>

              {error && <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>}
              {result && (
                <pre style={{ marginTop: 12, background: "#f6f6f6", padding: 12 }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </>
          )}
        </section>
      )}
    </main>
  );
}