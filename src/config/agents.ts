// src/config/agent.ts

export type AgentStatus = "available" | "unavailable" | "inactive";

export type Agent = {
  id: string;               // stable internal id (used everywhere)
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  status: AgentStatus;

  // Images
  headshotSrc: string;      // small / square image
  fullImageSrc: string;    // large / professional image
};

export const AGENTS: Agent[] = [
  {
    id: "gus-aref",
    firstName: "Gus",
    lastName: "Aref",
    title: "Agency Principal",
    email: "gus@planlifeusa.com",
    phone: "(407) 493-0049",
    status: "available",
    headshotSrc: "/images/agents/gus-headshot.png",
    fullImageSrc: "/images/agents/gus-full.png",
  },

  // example additional agent
  {
    id: "oraib-aref",
    firstName: "Oraib",
    lastName: "Aref",
    title: "Licensed Insurance Agent",
    email: "oraib@planlifeusa.com",
    phone: "(407) 555-1234",
    status: "available",
    headshotSrc: "/images/agents/oraib-headshot.png",
    fullImageSrc: "/images/agents/oraib-full.png",
  },
];