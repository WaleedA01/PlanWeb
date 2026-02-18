// src/lib/carriers.ts

export type LOB = 'auto' | 'home' | 'business' | 'other';

export type Carrier = {
  id: string;
  name: string;
  logoSrc: string;
  alt: string;
  lob: LOB[];
  excludeFromAnimation?: boolean;
};

export const CARRIERS: Carrier[] = [
  {
    id: 'allstate',
    name: 'Allstate',
    logoSrc: '/carriers/allstate.png',
    alt: 'Allstate',
    lob: ['auto', 'home'],
    excludeFromAnimation: true,
  },
  {
    id: 'amtrust',
    name: 'AmTrust',
    logoSrc: '/carriers/amtrust.png',
    alt: 'AmTrust Insurance - Business Insurance Partner',
    lob: ['business'],
  },
  {
    id: 'berkshire',
    name: 'Berkshire',
    logoSrc: '/carriers/berkshire.png',
    alt: 'Berkshire Insurance - Business Insurance Partner',
    lob: ['business'],
  },
  {
    id: 'bristolwest',
    name: 'Bristol West',
    logoSrc: '/carriers/bristolwest.png',
    alt: 'Bristol West Insurance - Auto Insurance Partner',
    lob: ['auto'],
  },
  {
    id: 'citizens',
    name: 'Citizens',
    logoSrc: '/carriers/citizens.png',
    alt: 'Citizens Insurance - Home Insurance Partner',
    lob: ['home'],
  },
  {
    id: 'geico',
    name: 'Geico',
    logoSrc: '/carriers/geico.png',
    alt: 'Geico Insurance - Auto Insurance Partner',
    lob: ['auto'],
  },
  {
    id: 'hartford',
    name: 'Hartford',
    logoSrc: '/carriers/hartford.png',
    alt: 'Hartford Insurance - Auto, Home & Business Insurance Partner',
    lob: ['auto', 'home', 'business'],
  },
  {
    id: 'libertymutual',
    name: 'Liberty Mutual',
    logoSrc: '/carriers/libertymutual.png',
    alt: 'Liberty Mutual Insurance - Full Coverage Insurance Partner',
    lob: ['auto', 'home', 'business', 'other'],
  },
  {
    id: 'progressive',
    name: 'Progressive',
    logoSrc: '/carriers/progressive.png',
    alt: 'Progressive Insurance - Full Coverage Insurance Partner',
    lob: ['auto', 'home', 'business', 'other'],
  },
  {
    id: 'safeco',
    name: 'Safeco',
    logoSrc: '/carriers/safeco.png',
    alt: 'Safeco Insurance - Auto & Home Insurance Partner',
    lob: ['auto', 'home'],
  },
  {
    id: 'nationwide',
    name: 'Nationwide',
    logoSrc: '/carriers/nationwide.png',
    alt: 'Nationwide Insurance - Full Coverage Insurance Partner',
    lob: ['auto', 'home', 'business', 'other'],
  },
  {
    id: 'kemper',
    name: 'Kemper',
    logoSrc: '/carriers/kemper.png',
    alt: 'Kemper',
    lob: ['auto', 'home'],
  },
  {
    id: 'edison',
    name: 'Edison',
    logoSrc: '/carriers/edison.png',
    alt: 'Edison',
    lob: ['home'],
  },
  {
    id: 'floridafamily',
    name: 'Florida Family',
    logoSrc: '/carriers/floridafamily.png',
    alt: 'Florida Family',
    lob: ['home'],
  },
  {
    id: 'floridapeninsula',
    name: 'Florida Peninsula',
    logoSrc: '/carriers/floridapeninsula.png',
    alt: 'Florida Peninsula',
    lob: ['home'],
  },
  {
    id: 'hagerty',
    name: 'Hagerty',
    logoSrc: '/carriers/hagerty.jpg',
    alt: 'Hagerty',
    lob: ['auto'],
  },
  {
    id: 'nationalgeneral',
    name: 'National General',
    logoSrc: '/carriers/nationalgeneral.png',
    alt: 'National General',
    lob: ['auto', 'home'],
  },
  {
    id: 'olympus',
    name: 'Olympus',
    logoSrc: '/carriers/olympus.png',
    alt: 'Olympus',
    lob: ['home'],
  },
  {
    id: 'ovation',
    name: 'Ovation',
    logoSrc: '/carriers/ovation.png',
    alt: 'Ovation',
    lob: ['home'],
  },
  {
    id: 'securityfirst',
    name: 'Security First',
    logoSrc: '/carriers/securityfirst.png',
    alt: 'Security First',
    lob: ['home'],
  },
  {
    id: 'slide',
    name: 'Slide',
    logoSrc: '/carriers/slide.png',
    alt: 'Slide',
    lob: ['home'],
  },
  {
    id: 'southernoak',
    name: 'Southern Oak',
    logoSrc: '/carriers/southernoak.png',
    alt: 'Southern Oak',
    lob: ['home'],
  },
  {
    id: 'statefarm',
    name: 'State Farm',
    logoSrc: '/carriers/statefarm.png',
    alt: 'State Farm',
    lob: ['auto', 'home'],
    excludeFromAnimation: true,
  },
  {
    id: 'usaa',
    name: 'USAA',
    logoSrc: '/carriers/usaa.png',
    alt: 'USAA',
    lob: ['auto', 'home'],
    excludeFromAnimation: true,
  },
];

/**
 * Filter carriers by line of business
 */
export function getCarriersByLOB(lob: LOB): Carrier[] {
  return CARRIERS.filter(carrier => carrier.lob.includes(lob));
}

/**
 * Get carrier names for dropdown (filtered by LOB if provided)
 */
export function getCarrierNames(lob?: LOB): string[] {
  const carriers = lob ? getCarriersByLOB(lob) : CARRIERS;
  const names = carriers.map(c => c.name).sort();
  return [...names, 'Other'];
}

/**
 * Get carriers for animation (excludes carriers with excludeFromAnimation flag)
 */
export function getAnimationCarriers(): Carrier[] {
  return CARRIERS.filter(carrier => !carrier.excludeFromAnimation);
}
