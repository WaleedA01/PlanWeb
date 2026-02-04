

// src/lib/agents/getAgents.ts

import { AGENTS, type Agent, type AgentStatus } from "@/config/agents";

/**
 * Returns a shallow-copied list of agents.
 * Use this as the single read-access point for agent data.
 */
export function getAgents(): Agent[] {
  // Shallow copy so callers don't accidentally mutate the source of truth.
  return [...AGENTS];
}

/**
 * Returns agents that should be selectable/visible in most UI contexts.
 * By default we treat `inactive` as hidden, while `available` and `unavailable`
 * remain active (e.g., show in directory, may be disabled in dropdown).
 */
export function getActiveAgents(): Agent[] {
  return getAgents().filter((a) => a.status !== "inactive");
}

/**
 * Finds an agent by stable id.
 */
export function getAgentById(id: string | null | undefined): Agent | undefined {
  if (!id) return undefined;
  return AGENTS.find((a) => a.id === id);
}

/**
 * Convenience helpers for common UI needs.
 */
export function getAgentFullName(agent: Pick<Agent, "firstName" | "lastName">): string {
  return `${agent.firstName} ${agent.lastName}`.trim();
}

export function isAgentAvailable(status: AgentStatus): boolean {
  return status === "available";
}

/**
 * A consistent sort order for agents.
 * Currently sorts by last name then first name; adjust later if you add `order`.
 */
export function sortAgents(agents: Agent[]): Agent[] {
  return [...agents].sort((a: Agent, b: Agent) => {
    const last = a.lastName.localeCompare(b.lastName);
    if (last !== 0) return last;
    return a.firstName.localeCompare(b.firstName);
  });
}