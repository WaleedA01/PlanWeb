import fs from "fs";
import path from "path";

import AgentCard from '@/components/AgentCard';
import { getActiveAgents, getAgentFullName, sortAgents } from "@/lib/agents/getAgents";
import FadeInSection from '@/components/animations/FadeInSection';
import JoinTeamCTASection from '@/components/sections/about/JoinTeamCTASection';

export default function Team() {
  const agents = sortAgents(getActiveAgents());

  const fallbackImage = "/logo-square.png";

  function resolvePublicImage(src?: string | null) {
    const candidate = (src ?? "").trim();
    if (!candidate) return fallbackImage;

    // Only resolve local public assets (e.g. /agents/full/gus.png)
    if (!candidate.startsWith("/")) return fallbackImage;

    const publicPath = path.join(process.cwd(), "public", candidate);
    return fs.existsSync(publicPath) ? candidate : fallbackImage;
  }

  return (
    <main>
      <div className="min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our experienced insurance professionals are here to help you find the perfect coverage.
            </p>
          </div>

          {/* Agent Grid */}
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {agents.map((agent) => (
              <div key={agent.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <AgentCard
                  name={getAgentFullName(agent)}
                  image={resolvePublicImage(agent.fullImageSrc)}
                  title={agent.title}
                  phone={agent.phone}
                  email={agent.email}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <FadeInSection>
        <JoinTeamCTASection />
      </FadeInSection>
    </main>
  );
}
