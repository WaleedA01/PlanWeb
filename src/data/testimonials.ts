export interface Testimonial {
  name: string;
  title: string;
  business: string;
  insuranceType: string;
  rating: number;
  quote: string;
  avatar: string;
  logo?: string; // Optional company logo URL
}

export const testimonials: Testimonial[] = [
  {
    name: 'Kareem M.',
    title: 'Franchisee',
    business: 'Dunkin\'',
    insuranceType: 'Business',
    rating: 5,
    quote: 'Great service and exceptional team at PlanLife. We started working with Gus and his team many years ago to help us insure our businesses. I highly recommend them to any business owner as the team is always available to help me out with all my insurance needs!',
    avatar: 'KM',
    logo: '/images/businesses/dunkin.png',
  },
  {
    name: 'Omar S.',
    title: 'Co-Owner',
    business: 'The Dough Show',
    insuranceType: 'Business, Auto & Home',
    rating: 5,
    quote: 'I used PlanLife for our restaurant, auto and home insurances. Oraib is extremely helpful, very professional, and provided best insurance services I have experienced in many years. Will always work with her and her company. I highly recommend her for all your insurance needs.',
    avatar: 'OS',
    logo: '/images/businesses/doughshow.png',
  },
  {
    name: 'Hardik S.',
    title: 'Franchisee',
    business: 'Foxtail Coffee',
    insuranceType: 'Business',
    rating: 5,
    quote: 'Excellent service providers and great rates. Justin and his team are exceptional in their service. We love to do business with them as they\'ve saved us lots of money!',
    avatar: 'HS',
    logo: '/images/businesses/foxtail.png',
  },
  {
    name: 'Michael R.',
    title: 'Owner',
    business: 'FIT 407',
    insuranceType: 'Business',
    rating: 5,
    quote: 'Working with PlanLife has been a game-changer for our fitness center. Their team understood our unique insurance needs and delivered comprehensive coverage at competitive rates.',
    avatar: 'MR',
    logo: '/images/businesses/fit407.png',
  },
  {
    name: 'Sophie L.',
    title: 'Owner',
    business: 'Rosalie Le French Cafe',
    insuranceType: 'Business',
    rating: 5,
    quote: 'PlanLife provided exceptional service for our café. Their attention to detail and personalized approach made the entire insurance process seamless and stress-free.',
    avatar: 'SL',
    logo: '/images/businesses/rosalie.png',
  },
  {
    name: 'Giovanni M.',
    title: 'Owner',
    business: 'Giovanni\'s',
    insuranceType: 'Business',
    rating: 5,
    quote: 'The PlanLife team has been outstanding in helping us protect our restaurant. Their expertise and dedication to finding the right coverage has been invaluable to our business.',
    avatar: 'GM',
    logo: '/images/businesses/giovannis.png',
  },
  {
    name: 'David T.',
    title: 'Owner',
    business: 'The Barber House',
    insuranceType: 'Business',
    rating: 5,
    quote: 'PlanLife made insuring our barbershop simple and affordable. Their professional team took the time to understand our needs and delivered excellent results.',
    avatar: 'DT',
    logo: '/images/businesses/thebarberhouse.png',
  },
];
