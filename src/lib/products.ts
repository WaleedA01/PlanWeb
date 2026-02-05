import { LucideIcon, Shield, Building2, DollarSign, HardHat, Car, Briefcase, Lock, Wine, CarFront, Construction, Ship, Users, Home, Droplets, Settings, MoreHorizontal } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'general-liability',
    name: 'General Liability',
    icon: Shield,
    description: 'Protects your business from third-party claims of bodily injury, property damage, and advertising injury. Essential coverage for customer-facing businesses.'
  },
  {
    id: 'commercial-property',
    name: 'Commercial Property',
    icon: Building2,
    description: 'Covers your business buildings, equipment, inventory, and furniture against fire, theft, vandalism, and natural disasters.'
  },
  {
    id: 'business-income',
    name: 'Business Income',
    icon: DollarSign,
    description: 'Replaces lost income and covers operating expenses when your business is forced to close temporarily due to a covered loss.'
  },
  {
    id: 'workers-compensation',
    name: 'Workers\' Compensation',
    icon: HardHat,
    description: 'Provides medical benefits and wage replacement for employees who are injured or become ill on the job. Required by law in most states.'
  },
  {
    id: 'commercial-auto',
    name: 'Commercial Auto',
    icon: Car,
    description: 'Covers vehicles owned, leased, or used by your business including liability, collision, comprehensive, and medical payments coverage.'
  },
  {
    id: 'professional-liability',
    name: 'Professional Liability (E&O)',
    icon: Briefcase,
    description: 'Protects against claims of negligence, errors, omissions, or failure to deliver professional services. Critical for service-based businesses.'
  },
  {
    id: 'cyber-liability',
    name: 'Cyber Liability',
    icon: Lock,
    description: 'Covers costs associated with data breaches, cyberattacks, ransomware, and privacy violations including notification costs and legal defense.'
  },
  {
    id: 'liquor-liability',
    name: 'Liquor Liability',
    icon: Wine,
    description: 'Protects businesses that manufacture, sell, or serve alcohol from claims related to intoxication, including bodily injury and property damage.'
  },
  {
    id: 'hired-non-owned-auto',
    name: 'Hired & Non-Owned Auto',
    icon: CarFront,
    description: 'Covers liability when employees use personal vehicles for business or when your business rents/hires vehicles not owned by the company.'
  },
  {
    id: 'builders-risk',
    name: 'Builder\'s Risk',
    icon: Construction,
    description: 'Protects buildings under construction, renovation, or remodeling against fire, theft, vandalism, and weather damage until project completion.'
  },
  {
    id: 'inland-marine',
    name: 'Inland Marine',
    icon: Ship,
    description: 'Covers property in transit, mobile equipment, and valuable items that move between locations or are stored off-premises.'
  },
  {
    id: 'epli',
    name: 'Employer Practice Liability',
    icon: Users,
    description: 'Protects against employee claims of discrimination, wrongful termination, harassment, and other employment-related issues.'
  },
  {
    id: 'lessors-risk',
    name: 'Lessor\'s Risk',
    icon: Home,
    description: 'Covers property owners who lease their buildings to tenants, protecting against damage to the building structure and loss of rental income.'
  },
  {
    id: 'environmental-pollution',
    name: 'Environmental & Pollution Liability',
    icon: Droplets,
    description: 'Covers cleanup costs, legal defense, and third-party claims related to pollution incidents, contamination, and environmental damage.'
  },
  {
    id: 'equipment-breakdown',
    name: 'Equipment Breakdown',
    icon: Settings,
    description: 'Covers repair or replacement of mechanical and electrical equipment, plus business income loss due to equipment failure or breakdown.'
  },
  {
    id: 'other',
    name: 'Other / I\'m not sure',
    icon: MoreHorizontal,
    description: 'Not sure which coverage you need? Select this option and our insurance experts will help identify the right products for your business.'
  }
];
