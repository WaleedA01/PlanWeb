import { LucideIcon, Shield, Building2, HardHat, Briefcase, Car, Lock, PauseCircle, Settings, Umbrella, Users } from 'lucide-react';

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
    description: 'Protection against third-party claims'
  },
  {
    id: 'property',
    name: 'Property Insurance',
    icon: Building2,
    description: 'Coverage for buildings and contents'
  },
  {
    id: 'workers-comp',
    name: 'Workers Compensation',
    icon: HardHat,
    description: 'Employee injury and illness coverage'
  },
  {
    id: 'professional-liability',
    name: 'Professional Liability',
    icon: Briefcase,
    description: 'Errors and omissions protection'
  },
  {
    id: 'commercial-auto',
    name: 'Commercial Auto',
    icon: Car,
    description: 'Vehicle and driver coverage'
  },
  {
    id: 'cyber-liability',
    name: 'Cyber Liability',
    icon: Lock,
    description: 'Data breach and cyber attack protection'
  },
  {
    id: 'business-interruption',
    name: 'Business Interruption',
    icon: PauseCircle,
    description: 'Lost income and operating expenses'
  },
  {
    id: 'equipment-breakdown',
    name: 'Equipment Breakdown',
    icon: Settings,
    description: 'Mechanical and electrical failure coverage'
  },
  {
    id: 'umbrella',
    name: 'Umbrella Insurance',
    icon: Umbrella,
    description: 'Additional liability coverage'
  },
  {
    id: 'employment-practices',
    name: 'Employment Practices',
    icon: Users,
    description: 'Workplace discrimination and harassment'
  }
];
