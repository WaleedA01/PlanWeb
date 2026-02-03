

import type { LeadCategory } from "./types";

export type WebhookResolution = {
  key: "ZAPIER_WEBHOOK_BUSINESS" | "ZAPIER_WEBHOOK_PERSONAL";
  url?: string;
};

/**
 * Resolves the Zapier webhook URL to use based on lead category.
 *
 * IMPORTANT: webhook URLs must never come from the client.
 * They are stored as environment variables.
 */
export function resolveZapierWebhook(category: LeadCategory): WebhookResolution {
  if (category === "business") {
    return {
      key: "ZAPIER_WEBHOOK_BUSINESS",
      url: process.env.ZAPIER_WEBHOOK_BUSINESS,
    };
  }

  return {
    key: "ZAPIER_WEBHOOK_PERSONAL",
    url: process.env.ZAPIER_WEBHOOK_PERSONAL,
  };
}

/**
 * Throws a clear error if the webhook is missing.
 * Useful for callers that want a single guard line.
 */
export function requireZapierWebhook(category: LeadCategory): {
  key: WebhookResolution["key"];
  url: string;
} {
  const { key, url } = resolveZapierWebhook(category);
  if (!url) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return { key, url };
}