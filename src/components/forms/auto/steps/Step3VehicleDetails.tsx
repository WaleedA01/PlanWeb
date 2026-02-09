'use client';

import { AutoFormData, Vehicle } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox';
import { getMakes, getModels, getYears, decodeVin } from '@/lib/nhtsaApi';

interface Step3Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
}

export default function Step3VehicleDetails({ data, onUpdate }: Step3Props) {
  const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(
    data.vehicles.length > 0 ? data.vehicles[0].id : null
  );
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<Record<string, string[]>>({});
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState<Record<string, boolean>>({});
  const [decodingVin, setDecodingVin] = useState<Record<string, boolean>>({});

  const years = getYears();

  useEffect(() => {
    setLoadingMakes(true);
    getMakes().then(data => {
      setMakes(data);
      setLoadingMakes(false);
    });
  }, []);

  useEffect(() => {
    data.vehicles.forEach(vehicle => {
      if (vehicle.make && vehicle.year && !models[vehicle.id]) {
        setLoadingModels(prev => ({ ...prev, [vehicle.id]: true }));
        getModels(vehicle.make, vehicle.year).then(data => {
          setModels(prev => ({ ...prev, [vehicle.id]: data }));
          setLoadingModels(prev => ({ ...prev, [vehicle.id]: false }));
        });
      }
    });
  }, [data.vehicles.map(v => `${v.id}-${v.make}-${v.year}`).join(',')]);

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      vin: '',
      make: '',
      model: '',
      year: '',
    };
    const updatedVehicles = [...data.vehicles, newVehicle];
    onUpdate({ vehicles: updatedVehicles });
    setExpandedVehicleId(newVehicle.id);
  };

  const removeVehicle = (id: string) => {
    const updatedVehicles = data.vehicles.filter((v) => v.id !== id);
    onUpdate({ vehicles: updatedVehicles });
    if (expandedVehicleId === id && updatedVehicles.length > 0) {
      setExpandedVehicleId(updatedVehicles[0].id);
    }
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    const updatedVehicles = data.vehicles.map((v) =>
      v.id === id ? { ...v, ...updates } : v
    );
    onUpdate({ vehicles: updatedVehicles });
    
    if (updates.make || updates.year) {
      const vehicle = data.vehicles.find(v => v.id === id);
      const newMake = updates.make || vehicle?.make;
      const newYear = updates.year || vehicle?.year;
      
      if (newMake && newYear) {
        setLoadingModels(prev => ({ ...prev, [id]: true }));
        getModels(newMake, newYear).then(data => {
          setModels(prev => ({ ...prev, [id]: data }));
          setLoadingModels(prev => ({ ...prev, [id]: false }));
        });
      }
    }
  };

  const handleVinChange = async (id: string, vin: string) => {
    const vinUpper = vin.toUpperCase();
    updateVehicle(id, { vin: vinUpper });
    
    if (vinUpper.length === 17) {
      setDecodingVin(prev => ({ ...prev, [id]: true }));
      const decoded = await decodeVin(vinUpper);
      setDecodingVin(prev => ({ ...prev, [id]: false }));
      
      if (decoded) {
        updateVehicle(id, { vin: vinUpper, make: decoded.make, model: decoded.model, year: decoded.year });
      }
    }
  };

  useEffect(() => {
    if (data.vehicles.length === 0) {
      addVehicle();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Vehicle Details</h2>
        <p className="text-base md:text-lg text-primary">Add your vehicle information</p>
      </div>

      <div className="space-y-4">
        {data.vehicles.map((vehicle, index) => {
          const isExpanded = expandedVehicleId === vehicle.id;

          return (
            <div
              key={vehicle.id}
              className="border-2 border-border rounded-xl overflow-visible transition-all"
            >
              <button
                type="button"
                onClick={() => setExpandedVehicleId(isExpanded ? null : vehicle.id)}
                className="w-full p-4 flex items-center justify-between bg-secondary/5 hover:bg-secondary/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-secondary">
                    Vehicle {index + 1}
                  </span>
                  {vehicle.make && vehicle.model && (
                    <span className="text-sm text-muted-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {data.vehicles.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeVehicle(vehicle.id);
                      }}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 space-y-6 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor={`vin-${vehicle.id}`} className="text-lg">
                      VIN <span className="text-sm text-primary font-normal">(Recommended)</span>
                    </Label>
                    <Input
                      id={`vin-${vehicle.id}`}
                      value={vehicle.vin}
                      onChange={(e) => handleVinChange(vehicle.id, e.target.value)}
                      placeholder="Enter 17-character VIN to auto-populate"
                      maxLength={17}
                      className="font-mono"
                      disabled={decodingVin[vehicle.id]}
                    />
                    {decodingVin[vehicle.id] && (
                      <p className="text-sm text-muted-foreground mt-1">Decoding VIN...</p>
                    )}
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    or enter manually
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`year-${vehicle.id}`} className="text-lg">Year</Label>
                      <Combobox
                        value={vehicle.year}
                        onValueChange={(value: string) => updateVehicle(vehicle.id, { year: value })}
                        options={years.map(y => ({ value: y, label: y }))}
                        placeholder="Select year..."
                      />
                    </div>
                    <div>
                      <Label htmlFor={`make-${vehicle.id}`} className="text-lg">Make</Label>
                      <Combobox
                        value={vehicle.make}
                        onValueChange={(value: string) => updateVehicle(vehicle.id, { make: value, model: '' })}
                        options={makes.map(m => ({ value: m, label: m }))}
                        placeholder={loadingMakes ? "Loading..." : "Select make..."}
                        disabled={loadingMakes}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`model-${vehicle.id}`} className="text-lg">Model</Label>
                      <Combobox
                        value={vehicle.model}
                        onValueChange={(value: string) => updateVehicle(vehicle.id, { model: value })}
                        options={(models[vehicle.id] || []).map(m => ({ value: m, label: m }))}
                        placeholder={loadingModels[vehicle.id] ? "Loading..." : vehicle.make && vehicle.year ? "Select model..." : "Select make & year first"}
                        disabled={!vehicle.make || !vehicle.year || loadingModels[vehicle.id]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={addVehicle}
          className="w-full p-4 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-primary"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Another Vehicle</span>
        </button>
      </div>
    </div>
  );
}
