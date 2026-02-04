// src/app/api/agents/route.ts

import { NextResponse } from "next/server";
import { getActiveAgents, sortAgents } from "@/lib/agents/getAgents";

export const dynamic = "force-static";

export function GET() {
  // Public-facing list for the frontend
  const agents = sortAgents(getActiveAgents());

  return NextResponse.json(
    { agents },
    {
      headers: {
        // Cache on the edge for a bit; update anytime you redeploy
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
