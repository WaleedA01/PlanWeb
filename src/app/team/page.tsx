import AgentCard from '@/components/AgentCard';

export default function Team() {
  const agents = [
    { name: 'Gus Aref', image: '/agents/full/gus.png', title: 'Insurance Agent', phone: '555-0001', email: 'gus@example.com' },
    { name: 'Justin Soto', image: '/agents/full/justin.png', title: 'Insurance Agent', phone: '555-0002', email: 'justin@example.com' },
    { name: 'Oraib Aref', image: '/agents/full/oraib.png', title: 'Insurance Agent', phone: '555-0003', email: 'oraib@example.com' },
    { name: 'Sara Diaz', image: '/agents/full/sara.png', title: 'Insurance Agent', phone: '555-0004', email: 'sara@example.com' },
    { name: 'Samir Saber', image: null, title: 'Insurance Agent', phone: '555-0005', email: 'samir@example.com' },
  ];

  return (
    <main className="min-h-screen py-16 md:py-24">
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
          {agents.map((agent, index) => (
            <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <AgentCard
                name={agent.name}
                image={agent.image}
                title={agent.title}
                phone={agent.phone}
                email={agent.email}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
