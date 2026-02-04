import Image from 'next/image';

interface AgentCardProps {
  name: string;
  image?: string | null;
  title?: string;
  phone?: string;
  email?: string;
}

export default function AgentCard({ name, image, title, phone, email }: AgentCardProps) {
  const fallbackImage = "/logo-square.png";
  const imgSrc = (image && image.trim().length > 0) ? image : fallbackImage;

  return (
    <div className="bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0] border border-border rounded-2xl overflow-visible hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-64 relative">
      {/* Agent Info - Top right */}
      <div className="absolute top-6 right-6 z-10 text-right">
        <h3 className="text-white drop-shadow-lg leading-tight">
          <span className="text-4xl font-bold">{name.split(' ')[0]}</span><br />
          <span className="text-2xl font-thin">{name.split(' ').slice(1).join(' ')}</span>
        </h3>
        {title && <p className="text-white/90 text-sm mt-1 drop-shadow-md">{title}</p>}
      </div>

      {/* Agent Image - Full size with overflow, shifted left */}
      {imgSrc ? (
        <div className="absolute inset-0 -top-12 -left-32">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-contain object-top rounded-2xl"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white/30">{name[0]}</span>
        </div>
      )}

      {/* Contact Buttons - Bottom right */}
      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {phone && (
          <button className="bg-[#282F57] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        )}
        {email && (
          <button className="bg-[#282F57] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
