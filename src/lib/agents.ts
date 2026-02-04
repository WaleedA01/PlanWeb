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
    headshotSrc: "/agents/headshot/gus.png",
    fullImageSrc: "/agents/full/gus.png",
  },

  // example additional agent
  {
    id: "oraib-aref",
    firstName: "Oraib",
    lastName: "Aref",
    title: "Licensed Agent",
    email: "oraib@planlifeusa.com",
    phone: "(407) 555-1234",
    status: "available",
    headshotSrc: "/agents/headshot/oraib.png",
    fullImageSrc: "/agents/full/oraib.png",
  },

   {
    id: "justin-soto",
    firstName: "Justin",
    lastName: "Soto",
    title: "Senior Licensed Agent",
    email: "justin@planlifeusa.com",
    phone: "(407) 555-1234",
    status: "available",
    headshotSrc: "/agents/headshot/justin.png",
    fullImageSrc: "/agents/full/justin.png",
  },
  {
    id: "sara-diaz",
    firstName: "Sara",
    lastName: "Diaz",
    title: "Licensed Agent",
    email: "sara@planlifeusa.com",
    phone: "(407) 555-1234",
    status: "available",
    headshotSrc: "/agents/headshot/sara.png",
    fullImageSrc: "/agents/full/sara.png",
  },

  {
    id: "samir-saber",
    firstName: "Samir",
    lastName: "Saber",
    title: "Licensed Agent",
    email: "samir@planlifeusa.com",
    phone: "(407) 555-1234",
    status: "available",
    headshotSrc: "/agents/headshot/samir.png",
    fullImageSrc: "/agents/full/samir.png",
  }
];