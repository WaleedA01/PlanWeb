export const CAR_DATA = {
  brands: {
    tesla: { name: 'Tesla', logo: 'tesla.png', defaultType: 'sedan' },
    ford: { name: 'Ford', logo: 'ford.png', defaultType: 'truck' },
    toyota: { name: 'Toyota', logo: 'toyota.png', defaultType: 'sedan' },
    honda: { name: 'Honda', logo: 'honda.png', defaultType: 'sedan' },
    bmw: { name: 'BMW', logo: 'bmw.png', defaultType: 'sedan' },
    jeep: { name: 'Jeep', logo: 'jeep.png', defaultType: 'suv' },
    porsche: { name: 'Porsche', logo: 'porsche.png', defaultType: 'sport' },
    chevrolet: { name: 'Chevrolet', logo: 'chevrolet.png', defaultType: 'truck' },
    nissan: { name: 'Nissan', logo: 'nissan.png', defaultType: 'sedan' },
    mercedes: { name: 'Mercedes-Benz', logo: 'mercedes-benz.png', defaultType: 'sedan' },
    audi: { name: 'Audi', logo: 'audi.png', defaultType: 'sedan' },
    volkswagen: { name: 'Volkswagen', logo: 'volkswagen.png', defaultType: 'sedan' },
    hyundai: { name: 'Hyundai', logo: 'hyundai.png', defaultType: 'sedan' },
    kia: { name: 'Kia', logo: 'kia.png', defaultType: 'sedan' },
    mazda: { name: 'Mazda', logo: 'mazda.png', defaultType: 'sedan' },
    subaru: { name: 'Subaru', logo: 'subaru.png', defaultType: 'suv' },
    lexus: { name: 'Lexus', logo: 'lexus.png', defaultType: 'sedan' },
    gmc: { name: 'GMC', logo: 'gmc.png', defaultType: 'truck' },
    ram: { name: 'Ram', logo: 'ram.png', defaultType: 'truck' },
    dodge: { name: 'Dodge', logo: 'dodge.png', defaultType: 'sedan' },
  },
  models: {
    sedan: 'Car.glb',
    suv: 'Car.glb',
    truck: 'PickupTruck.glb',
    hatchback: 'Car.glb',
    sport: 'SportsCar.glb',
    van: 'Car.glb',
    cybertruck: 'CyberTruck.glb',
  },
  paints: {
    white: '#F0F0F0',
    black: '#1A1A1A',
    silver: '#C0C0C0',
    gray: '#575757',
    red: '#D40000',
    blue: '#0047AB',
    green: '#006400',
  },
};

export function getCarType(make: string): string {
  const normalized = make.toLowerCase();
  const brand = CAR_DATA.brands[normalized as keyof typeof CAR_DATA.brands];
  return brand?.defaultType || 'sedan';
}

export function getBrandLogo(make: string): string | null {
  const normalized = make.toLowerCase();
  const brand = CAR_DATA.brands[normalized as keyof typeof CAR_DATA.brands];
  return brand?.logo || null;
}
