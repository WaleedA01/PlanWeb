import { LucideIcon, Sprout, Pickaxe, HardHat, Factory, Package, Store, Truck, Radio, DollarSign, Home, Briefcase, BarChart3, ClipboardList, GraduationCap, Hospital, Theater, UtensilsCrossed, Wrench, Landmark } from 'lucide-react';

export interface CategoryInfo {
  name: string;
  icon: LucideIcon;
  color: string;
}

export function getCategoryFromNAICS(code: string): CategoryInfo {
  const numCode = parseInt(code.substring(0, 2));
  
  if (numCode >= 11 && numCode <= 11) return { name: 'Agriculture', icon: Sprout, color: 'text-green-600' };
  if (numCode >= 21 && numCode <= 21) return { name: 'Mining', icon: Pickaxe, color: 'text-amber-700' };
  if (numCode >= 22 && numCode <= 23) return { name: 'Utilities & Construction', icon: HardHat, color: 'text-orange-600' };
  if (numCode >= 31 && numCode <= 33) return { name: 'Manufacturing', icon: Factory, color: 'text-blue-600' };
  if (numCode >= 42 && numCode <= 42) return { name: 'Wholesale Trade', icon: Package, color: 'text-indigo-600' };
  if (numCode >= 44 && numCode <= 45) return { name: 'Retail Trade', icon: Store, color: 'text-pink-600' };
  if (numCode >= 48 && numCode <= 49) return { name: 'Transportation', icon: Truck, color: 'text-cyan-600' };
  if (numCode >= 51 && numCode <= 51) return { name: 'Information', icon: Radio, color: 'text-purple-600' };
  if (numCode >= 52 && numCode <= 52) return { name: 'Finance', icon: DollarSign, color: 'text-emerald-600' };
  if (numCode >= 53 && numCode <= 53) return { name: 'Real Estate', icon: Home, color: 'text-rose-600' };
  if (numCode >= 54 && numCode <= 54) return { name: 'Professional Services', icon: Briefcase, color: 'text-slate-600' };
  if (numCode >= 55 && numCode <= 55) return { name: 'Management', icon: BarChart3, color: 'text-teal-600' };
  if (numCode >= 56 && numCode <= 56) return { name: 'Administrative', icon: ClipboardList, color: 'text-violet-600' };
  if (numCode >= 61 && numCode <= 61) return { name: 'Education', icon: GraduationCap, color: 'text-blue-700' };
  if (numCode >= 62 && numCode <= 62) return { name: 'Healthcare', icon: Hospital, color: 'text-red-600' };
  if (numCode >= 71 && numCode <= 71) return { name: 'Arts & Entertainment', icon: Theater, color: 'text-fuchsia-600' };
  if (numCode >= 72 && numCode <= 72) return { name: 'Food & Hospitality', icon: UtensilsCrossed, color: 'text-orange-500' };
  if (numCode >= 81 && numCode <= 81) return { name: 'Other Services', icon: Wrench, color: 'text-gray-600' };
  if (numCode >= 92 && numCode <= 92) return { name: 'Public Administration', icon: Landmark, color: 'text-blue-800' };
  
  return { name: 'Other', icon: ClipboardList, color: 'text-gray-500' };
}
