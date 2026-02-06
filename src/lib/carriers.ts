// src/lib/carriers.ts

export type Carrier = {
  id: string;
  name: string;
  logoSrc: string;
  alt: string;
};

export const CARRIERS: Carrier[] = [
  {
    id: 'amtrust',
    name: 'AmTrust',
    logoSrc: '/carriers/amtrust.png',
    alt: 'AmTrust',
  },
  {
    id: 'berkshire',
    name: 'Berkshire',
    logoSrc: '/carriers/berkshire.png',
    alt: 'Berkshire',
  },
  {
    id: 'bristolwest',
    name: 'Bristol West',
    logoSrc: '/carriers/bristolwest.png',
    alt: 'Bristol West',
  },
  {
    id: 'citizens',
    name: 'Citizens',
    logoSrc: '/carriers/citizens.png',
    alt: 'Citizens',
  },
  {
    id: 'geico',
    name: 'Geico',
    logoSrc: '/carriers/geico.png',
    alt: 'Geico',
  },
  {
    id: 'hartford',
    name: 'Hartford',
    logoSrc: '/carriers/hartford.png',
    alt: 'Hartford',
  },
  {
    id: 'libertymutual',
    name: 'Liberty Mutual',
    logoSrc: '/carriers/libertymutual.png',
    alt: 'Liberty Mutual',
  },
  {
    id: 'progressive',
    name: 'Progressive',
    logoSrc: '/carriers/progressive.png',
    alt: 'Progressive',
  },
  {
    id: 'safeco',
    name: 'Safeco',
    logoSrc: '/carriers/safeco.png',
    alt: 'Safeco',
  },
];
