'use client';

import { useState } from 'react';
import { BusinessFormData, initialBusinessFormData } from './types';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import RecapScreen from '../shared/RecapScreen';
import Step1BusinessInfo from './steps/Step1BusinessInfo';
import Step2BusinessType from './steps/Step2BusinessType';
import Step3Products from './steps/Step3Products';
import Step4BusinessDetails from './steps/Step4BusinessDetails';
import Step5ContactInfo from './steps/Step5ContactInfo';

export default function BusinessForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessFormData>(initialBusinessFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (updates: Partial<BusinessFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Integrate Zapier webhook here
    console.log('Form submitted:', formData);
    
    // Placeholder for Zapier integration
    // const response = await fetch('ZAPIER_WEBHOOK_URL', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // });

    setIsSubmitted(true);
  };

  // Validation logic for each step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.streetAddress && formData.city && formData.state && formData.postalCode;
      case 2:
        return formData.businessType !== '';
      case 3:
        return formData.products.length > 0;
      case 4:
        return formData.isNewBusiness !== null && formData.numEmployees !== '';
      case 5:
        return formData.firstName && formData.lastName && formData.email && formData.phoneNumber && formData.preferredContactMethod;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return <RecapScreen data={formData} />;
  }

  return (
    <FormContainer
      currentStep={currentStep}
      totalSteps={5}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      isLastStep={currentStep === 5}
      canProceed={canProceed()}
    >
      <FormStep isActive={currentStep === 1}>
        <Step1BusinessInfo data={formData} onUpdate={updateFormData} />
      </FormStep>

      <FormStep isActive={currentStep === 2}>
        <Step2BusinessType data={formData} onUpdate={updateFormData} />
      </FormStep>

      <FormStep isActive={currentStep === 3}>
        <Step3Products data={formData} onUpdate={updateFormData} />
      </FormStep>

      <FormStep isActive={currentStep === 4}>
        <Step4BusinessDetails data={formData} onUpdate={updateFormData} />
      </FormStep>

      <FormStep isActive={currentStep === 5}>
        <Step5ContactInfo data={formData} onUpdate={updateFormData} />
      </FormStep>
    </FormContainer>
  );
}
