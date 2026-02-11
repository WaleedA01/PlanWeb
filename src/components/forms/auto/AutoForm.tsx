'use client';

import { useState, useEffect } from 'react';
import { AutoFormData } from './types';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2VehicleStatus from './steps/Step2VehicleStatus';
import Step3VehicleDetails from './steps/Step3VehicleDetails';
import Step4Documents from './steps/Step4Documents';
import Step5ContactInfo from './steps/Step5ContactInfo';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import PersonalMap from '../personal/PersonalMap';
import SuccessAnimation from '../shared/SuccessAnimation';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { Car } from 'lucide-react';

export default function AutoForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [agentLocked, setAgentLocked] = useState(false);
  const [lockedAgentName, setLockedAgentName] = useState<string | null>(null);

  const [formData, setFormData] = useState<AutoFormData>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: null,
    longitude: null,
    coverageUrgency: '',
    numVehicles: '',
    numDrivers: '',
    vehicles: [],
    uploadedFiles: [],
    preferredContactMethod: '',
    email: '',
    phoneNumber: '',
    additionalNotes: '',
    selectedAgentId: '',
    leadSource: 'Auto Questionnaire',
  });

  useEffect(() => {
    const saved = localStorage.getItem('autoFormProgress');
    if (saved) {
      try {
        const { formData: savedData, currentStep: savedStep } = JSON.parse(saved);
        setFormData(savedData);
        setCurrentStep(savedStep);
      } catch (e) {
        console.error('Failed to load saved progress:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem('autoFormProgress', JSON.stringify({ formData, currentStep }));
    }
  }, [formData, currentStep, isSubmitted]);

  const [qrToken, setQrToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const qr = params.get('qr');

    if (qr) setQrToken(qr);

    (async () => {
      try {
        const url = qr
          ? `/api/qr/resolve?qr=${encodeURIComponent(qr)}`
          : `/api/qr/resolve`;

        const res = await fetch(url);
        const data = await res.json().catch(() => null);

        if (data?.locked && data?.agentId) {
          setAgentLocked(true);
          setLockedAgentName(data?.agentName ?? null);

          setFormData((prev) => ({
            ...prev,
            selectedAgentId: data.agentId,
          }));
        } else {
          setAgentLocked(false);
          setLockedAgentName(null);
        }
      } catch (e) {
        console.error('Failed to resolve QR context:', e);
      }
    })();
  }, []);

  const updateFormData = (updates: Partial<AutoFormData>) => {
    if (agentLocked && 'selectedAgentId' in updates) {
      const next = { ...(updates as any) };
      delete (next as any).selectedAgentId;
      updates = next;
    }

    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const hasVehicleDetails = formData.vehicles?.length > 0 && formData.vehicles[0] && 
    formData.vehicles[0].make && formData.vehicles[0].model && formData.vehicles[0].year;
  const showMap = formData.latitude && formData.longitude;
  const firstVehicle = formData.vehicles?.[0] || { make: '', model: '', year: '' };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitError(null);
    setSubmitResult(null);

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const answers = {
        ...formData,
        agentId: formData.selectedAgentId,
      };

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'auto',
          answers,
          turnstileToken,
          qr: qrToken,
        }),
      });

      const data = await res.json().catch(() => null);
      setSubmitResult(data);

      if (!res.ok) {
        setSubmitError(data?.error || `Submit failed (HTTP ${res.status})`);
        setTurnstileToken(null);
        setTurnstileKey((k) => k + 1);
        return;
      }

      setIsSubmitted(true);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
      localStorage.removeItem('autoFormProgress');
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error submitting lead.');
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.streetAddress && formData.city && formData.state && formData.postalCode;
      case 2:
        return formData.coverageUrgency && formData.numVehicles && formData.numDrivers;
      case 3:
        return formData.vehicles.length > 0 && formData.vehicles.every(v => 
          (v.vin && v.vin.length === 17) || (v.make && v.model && v.year)
        );
      case 4:
        return true;
      case 5:
        const emailRequired = formData.preferredContactMethod === 'email' || formData.preferredContactMethod === 'either';
        const phoneRequired = formData.preferredContactMethod === 'phone' || formData.preferredContactMethod === 'text' || formData.preferredContactMethod === 'either';
        return (
          formData.preferredContactMethod &&
          !!turnstileToken &&
          (emailRequired ? !!formData.email : true) &&
          (phoneRequired ? !!formData.phoneNumber : true)
        );
      default:
        return false;
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isSubmitted]);

  if (isSubmitted) {
    return <SuccessAnimation data={formData as any} />;
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
      <div className="hidden lg:flex lg:flex-col bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white p-12 sticky top-0 h-screen overflow-y-auto relative">
        {showMap && (
          <div 
            className="absolute top-0 right-0 w-3/4 h-1/2 opacity-80 animate-[mapFadeIn_0.8s_ease-out_0.3s_forwards] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%), linear-gradient(to top, transparent 0%, black 80%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%), linear-gradient(to top, transparent 0%, black 80%, black 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          >
            <PersonalMap 
              latitude={formData.latitude!} 
              longitude={formData.longitude!}
              show3DObject={true}
              objectType="car"
              carMake={hasVehicleDetails ? firstVehicle.make : undefined}
              carModel={hasVehicleDetails ? firstVehicle.model : undefined}
              carYear={hasVehicleDetails ? firstVehicle.year : undefined}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center space-y-8 -mt-40 relative z-20">
          <div>
            <Car className="w-16 h-16 text-primary mb-6" />
            <h1 className="text-7xl font-medium mb-4">Auto Insurance</h1>
            <p className="text-white/40 text-lg font-light">Get the coverage you need for your vehicle</p>
          </div>
        </div>
      </div>

      <div className="bg-background py-12">
        <FormContainer
          currentStep={currentStep}
          totalSteps={5}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isLastStep={currentStep === 5}
          canProceed={!!canProceed() && !isSubmitting}
          turnstileWidget={
            !turnstileToken ? (
              <TurnstileWidget
                key={turnstileKey}
                onToken={(token: string) => setTurnstileToken(token)}
              />
            ) : null
          }
        >
          <FormStep isActive={currentStep === 1}>
            <Step1PersonalInfo data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 2}>
            <Step2VehicleStatus data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 3}>
            <Step3VehicleDetails data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 4}>
            <Step4Documents data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 5}>
            <Step5ContactInfo 
              data={formData} 
              onUpdate={updateFormData}
              agentLocked={agentLocked}
              lockedAgentName={lockedAgentName ?? undefined}
            />

            {submitError && (
              <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {submitResult && (
              <pre className="mt-6 max-h-64 overflow-auto rounded-md border bg-gray-50 p-3 text-xs">
{JSON.stringify(submitResult, null, 2)}
              </pre>
            )}

            {isSubmitting && (
              <div className="mt-6 text-sm text-gray-600">Submitting…</div>
            )}
          </FormStep>
        </FormContainer>
      </div>
    </div>
  );
}
