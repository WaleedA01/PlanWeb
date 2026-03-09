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
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          "timeout-callback"?: () => void;
          retry?: "auto" | "never";
          "refresh-expired"?: "auto" | "manual";
          appearance?: "always" | "execute" | "interaction-only";
          execution?: "render" | "execute";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove?: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({
  onToken,
  onInvalidate,
  onStatusChange,
}: {
  onToken: (token: string) => void;
  onInvalidate?: () => void;
  onStatusChange?: (status: "loading" | "ready" | "verified" | "expired" | "error") => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);
  const retryTimeoutRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const clearRetryTimeout = useCallback(() => {
    if (retryTimeoutRef.current !== null) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const cleanupWidget = useCallback(() => {
    const id = widgetIdRef.current;

    try {
      if (id) {
        if (window.turnstile?.remove) window.turnstile.remove(id);
        else window.turnstile?.reset(id);
      }
    } catch {
      // ignore cleanup failures
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    widgetIdRef.current = null;
    renderedRef.current = false;
  }, []);

  const scheduleRerender = useCallback(
    (delay = 800) => {
      if (!mountedRef.current) return;
      clearRetryTimeout();
      retryTimeoutRef.current = window.setTimeout(() => {
        if (!mountedRef.current) return;
        cleanupWidget();
        onStatusChange?.("loading");
        window.requestAnimationFrame(() => {
          renderWidget();
        });
      }, delay);
    },
    [clearRetryTimeout, cleanupWidget, onStatusChange]
  );

  const handleInvalidation = useCallback(
    (status: "expired" | "error") => {
      onInvalidate?.();
      onStatusChange?.(status);
      scheduleRerender(status === "expired" ? 250 : 800);
    },
    [onInvalidate, onStatusChange, scheduleRerender]
  );

  const renderWidget = useCallback(() => {
    if (!mountedRef.current) return;
    if (renderedRef.current) return;
    if (!containerRef.current) return;
    if (!window.turnstile) return;

    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) {
      onStatusChange?.("error");
      return;
    }

    containerRef.current.innerHTML = "";
    onStatusChange?.("loading");

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        retry: "auto",
        "refresh-expired": "auto",
        appearance: "always",
        execution: "render",
        callback: (token: string) => {
          if (!mountedRef.current) return;
          clearRetryTimeout();
          onToken(token);
          onStatusChange?.("verified");
        },
        "expired-callback": () => {
          if (!mountedRef.current) return;
          handleInvalidation("expired");
        },
        "error-callback": () => {
          if (!mountedRef.current) return;
          handleInvalidation("error");
        },
        "timeout-callback": () => {
          if (!mountedRef.current) return;
          handleInvalidation("error");
        },
      });
      renderedRef.current = true;
      onStatusChange?.("ready");
    } catch {
      renderedRef.current = false;
      widgetIdRef.current = null;
      onStatusChange?.("error");
      scheduleRerender(1000);
    }
  }, [clearRetryTimeout, handleInvalidation, onStatusChange, onToken, scheduleRerender]);

  useEffect(() => {
    mountedRef.current = true;
    renderWidget();

    if (renderedRef.current) return;

    const start = Date.now();
    const interval = window.setInterval(() => {
      renderWidget();
      if (renderedRef.current || Date.now() - start > 10000) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [renderWidget]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearRetryTimeout();
      cleanupWidget();
    };
  }, [clearRetryTimeout, cleanupWidget]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}