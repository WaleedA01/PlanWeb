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
    name: 'Sarah Mitchell',
    title: 'Marketing Director',
    business: 'TechCorp Inc.',
    insuranceType: 'Auto & Home',
    rating: 5,
    quote: 'PlanLife saved me over $800 a year on my auto insurance! The process was incredibly easy and my agent was so helpful in explaining all my options.',
    avatar: 'SM',
  },
  {
    name: 'Michael Chen',
    title: 'Small Business Owner',
    business: 'Chen Consulting',
    insuranceType: 'Business',
    rating: 5,
    quote: 'As a small business owner, finding the right coverage was overwhelming. PlanLife made it simple and found me comprehensive coverage at a great price.',
    avatar: 'MC',
  },
  {
    name: 'Jennifer Rodriguez',
    title: 'Homeowner',
    business: 'Miami Real Estate',
    insuranceType: 'Home',
    rating: 5,
    quote: 'After a hurricane scare, I needed better home coverage fast. PlanLife got me protected within 24 hours. Their service is outstanding!',
    avatar: 'JR',
  },
  {
    name: 'David Thompson',
    title: 'CEO',
    business: 'Thompson Industries',
    insuranceType: 'Business',
    rating: 5,
    quote: 'Exceptional service and great rates. PlanLife helped us save thousands on our business insurance while improving our coverage.',
    avatar: 'DT',
  },
  {
    name: 'Emily Watson',
    title: 'Operations Manager',
    business: 'Watson Logistics',
    insuranceType: 'Commercial',
    rating: 5,
    quote: 'The team at PlanLife was professional and efficient. They found us the perfect policy that fit our budget and needs.',
    avatar: 'EW',
  },
  {
    name: 'Robert Kim',
    title: 'Financial Advisor',
    business: 'Kim Financial Group',
    insuranceType: 'Life',
    rating: 5,
    quote: 'I recommend PlanLife to all my clients. Their expertise and customer service are unmatched in the insurance industry.',
    avatar: 'RK',
  },
  {
    name: 'Amanda Foster',
    title: 'Restaurant Owner',
    business: 'Foster\'s Bistro',
    insuranceType: 'Business',
    rating: 5,
    quote: 'PlanLife made getting business insurance so easy. They understood my needs and delivered exactly what I was looking for.',
    avatar: 'AF',
  },
  {
    name: 'James Wilson',
    title: 'IT Director',
    business: 'Wilson Tech Solutions',
    insuranceType: 'Business',
    rating: 5,
    quote: 'Outstanding experience from start to finish. PlanLife saved us money and gave us better coverage than our previous provider.',
    avatar: 'JW',
  },
  {
    name: 'Lisa Anderson',
    title: 'Retail Manager',
    business: 'Anderson Boutique',
    insuranceType: 'Auto & Home',
    rating: 5,
    quote: 'The best insurance experience I\'ve ever had. Quick, easy, and they found me amazing rates on my home and auto insurance.',
    avatar: 'LA',
  },
  {
    name: 'Carlos Martinez',
    title: 'Construction Manager',
    business: 'Martinez Construction',
    insuranceType: 'Commercial',
    rating: 5,
    quote: 'PlanLife understands the construction industry. They got us comprehensive coverage at competitive rates.',
    avatar: 'CM',
  },
  {
    name: 'Rachel Green',
    title: 'Dental Practice Owner',
    business: 'Green Dental Care',
    insuranceType: 'Business',
    rating: 5,
    quote: 'Professional, knowledgeable, and always available. PlanLife has been a game-changer for our practice insurance needs.',
    avatar: 'RG',
  },
  {
    name: 'Thomas Brown',
    title: 'Real Estate Agent',
    business: 'Brown Realty',
    insuranceType: 'Life',
    rating: 5,
    quote: 'I\'ve worked with many insurance providers, but PlanLife stands out. They truly care about finding the best solution.',
    avatar: 'TB',
  },
  {
    name: 'Nicole Parker',
    title: 'Fitness Studio Owner',
    business: 'Parker Fitness',
    insuranceType: 'Business',
    rating: 5,
    quote: 'PlanLife made insuring my fitness studio stress-free. Great rates and even better customer service!',
    avatar: 'NP',
  },
  {
    name: 'Kevin Lee',
    title: 'Software Engineer',
    business: 'Lee Development',
    insuranceType: 'Auto & Home',
    rating: 5,
    quote: 'Fast, efficient, and transparent. PlanLife helped me bundle my policies and save significantly on my premiums.',
    avatar: 'KL',
  },
];
