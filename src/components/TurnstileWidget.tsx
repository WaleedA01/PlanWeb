"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove?: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);

  const renderWidget = useCallback(() => {
    if (renderedRef.current) return;
    if (!containerRef.current) return;
    if (!window.turnstile) return;

    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) {
      // Fail silently in UI; server will block submission if token missing.
      return;
    }

    // Ensure the container is empty before rendering.
    containerRef.current.innerHTML = "";

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        callback: (token: string) => onToken(token),
      });
      renderedRef.current = true;
    } catch {
      // If render fails for any reason, allow retry on next effect tick.
      renderedRef.current = false;
      widgetIdRef.current = null;
    }
  }, [onToken]);

  useEffect(() => {
    // Try immediately (in case the script is already loaded).
    renderWidget();

    // If Turnstile isn't available yet, poll briefly until it is.
    if (renderedRef.current) return;

    const start = Date.now();
    const interval = window.setInterval(() => {
      renderWidget();
      // Stop polling once rendered or after ~3s.
      if (renderedRef.current || Date.now() - start > 3000) {
        window.clearInterval(interval);
      }
    }, 50);

    return () => {
      window.clearInterval(interval);
    };
  }, [renderWidget]);

  useEffect(() => {
    // Cleanup on unmount: reset/remove widget so it can be re-rendered cleanly.
    return () => {
      const id = widgetIdRef.current;
      try {
        if (id) {
          if (window.turnstile?.remove) window.turnstile.remove(id);
          else window.turnstile?.reset(id);
        }
      } catch {
        // ignore
      }
      widgetIdRef.current = null;
      renderedRef.current = false;
    };
  }, []);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        // When the script finishes loading, render immediately.
        onLoad={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}