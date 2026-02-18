import { COMPANY_INFO } from './company-info';

const baseUrl = 'https://planlifeusa.com';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'PlanLife Insurance',
  image: `${baseUrl}/logo-full.png`,
  '@id': baseUrl,
  url: baseUrl,
  telephone: COMPANY_INFO.contact.phone,
  email: COMPANY_INFO.contact.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.state,
    postalCode: COMPANY_INFO.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4585,
    longitude: -81.4738,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    COMPANY_INFO.social.facebook,
    COMPANY_INFO.social.instagram,
    COMPANY_INFO.social.linkedin,
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlanLife Insurance',
  alternateName: 'PlanLife',
  url: baseUrl,
  logo: `${baseUrl}/logo-full.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: COMPANY_INFO.contact.phone,
    contactType: 'customer service',
    areaServed: 'US-FL',
    availableLanguage: ['en'],
  },
  sameAs: [
    COMPANY_INFO.social.facebook,
    COMPANY_INFO.social.instagram,
    COMPANY_INFO.social.linkedin,
  ],
};

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`,
  })),
});
