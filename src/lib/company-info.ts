// Centralized company information
// Update this file to change contact info across the entire site

export const COMPANY_INFO = {
  name: 'PlanLife Insurance',
  tagline: "Don't PlanLife Without Us",
  
  contact: {
    phone: '(407) 557-3100',
    phoneRaw: '4075573100', // For tel: links
    email: 'plsupport@planlifeusa.com',
    
    // Business hours
    hours: {
      weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
      saturday: 'Saturday: Closed',
      sunday: 'Sunday: Closed',
    },
  },
  
  address: {
    street: '6735 Conroy Road, Suite 411',
    city: 'Orlando',
    state: 'FL',
    zip: '32835',
    full: '6735 Conroy Road, Suite 411, Orlando, FL 32835',
  },
  
  social: {
    facebook: 'https://www.facebook.com/planlifeusa/',
    linkedin: 'https://linkedin.com/company/planlife',
    instagram: 'https://www.instagram.com/planlifeusa/',
  },
  
  legal: {
    licenseNumber: 'FL-12345678',
    established: '2020',
  },
} as const;

// Helper functions for formatted display
export const formatPhone = (phone: string = COMPANY_INFO.contact.phone) => phone;
export const formatAddress = () => COMPANY_INFO.address.full;
export const getPhoneLink = () => `tel:+1${COMPANY_INFO.contact.phoneRaw}`;
export const getEmailLink = () => `mailto:${COMPANY_INFO.contact.email}`;
export const getMapLink = () => 
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address.full)}`;
