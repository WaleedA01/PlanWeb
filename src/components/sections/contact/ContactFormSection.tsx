'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, getPhoneLink, getEmailLink } from '@/lib/company-info';
import posthog from 'posthog-js';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactMethod: '',
    email: '',
    phone: '',
    message: '',
  });
  const [showValidation, setShowValidation] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const contactMethodRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const isValidEmail = (email: string) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (!formData.contactMethod) {
      contactMethodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (formData.contactMethod === 'email' && !isValidEmail(formData.email)) {
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailRef.current?.focus();
      return false;
    }
    if ((formData.contactMethod === 'phone' || formData.contactMethod === 'text') && !isValidPhone(formData.phone)) {
      phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      phoneRef.current?.focus();
      return false;
    }
    if (formData.contactMethod === 'either' && (!isValidEmail(formData.email) || !isValidPhone(formData.phone))) {
      if (!isValidEmail(formData.email)) {
        emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        emailRef.current?.focus();
      } else {
        phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phoneRef.current?.focus();
      }
      return false;
    }
    if (!formData.message) {
      messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    if (validateForm()) {
      console.log('Form submitted:', formData);
      
      // Track contact form submission
      posthog.capture('contact_form_submitted', {
        contact_method: formData.contactMethod,
        has_message: formData.message.length > 0,
      });
      
      // Handle form submission
    }
  };

  const hasNameError = showValidation && (!formData.firstName || !formData.lastName);
  const hasMethodError = showValidation && !formData.contactMethod;
  const hasEmailError = showValidation && formData.contactMethod && 
    ((formData.contactMethod === 'email' || formData.contactMethod === 'either') && !isValidEmail(formData.email));
  const hasPhoneError = showValidation && formData.contactMethod && 
    ((formData.contactMethod === 'phone' || formData.contactMethod === 'text' || formData.contactMethod === 'either') && !isValidPhone(formData.phone));
  const hasMessageError = showValidation && !formData.message;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2/3 of space */}
          <div className="md:col-span-2">
            <div className="bg-white border border-border rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-secondary mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div ref={nameRef}>
                  <label className={`block text-lg font-medium mb-3 ${hasNameError ? 'text-red-500' : 'text-secondary'}`}>
                    How should we greet you? {hasNameError && <span className="text-red-500">*</span>}
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        hasNameError ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        hasNameError ? 'border-red-500' : 'border-border'
                      }`}
                    />
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div ref={contactMethodRef}>
                  <label className={`block text-lg font-medium mb-3 ${hasMethodError ? 'text-red-500' : 'text-secondary'}`}>
                    How would you like us to contact you? {hasMethodError && <span className="text-red-500">*</span>}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: 'email', label: 'Email', icon: Mail },
                      { value: 'phone', label: 'Phone', icon: Phone },
                      { value: 'text', label: 'Text (SMS)', icon: Phone },
                      { value: 'either', label: 'Any', icons: [Mail, Phone] },
                    ].map((method) => {
                      const isSelected = formData.contactMethod === method.value;
                      return (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, contactMethod: method.value })}
                          className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                            isSelected
                              ? 'border-primary bg-primary text-white shadow-md'
                              : hasMethodError
                              ? 'border-red-500 hover:border-red-600'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                          <div className="flex flex-col items-center text-center space-y-2">
                            {'icons' in method && method.icons ? (
                              <div className="flex items-center gap-2">
                                {method.icons.map((Icon, i) => (
                                  <Icon key={i} className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
                                ))}
                              </div>
                            ) : (
                              <method.icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
                            )}
                            <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                              {method.label}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email and Phone - Conditional based on contact method */}
                {formData.contactMethod === 'email' && (
                  <div className="animate-in fade-in duration-500">
                    <label className={`block text-lg font-medium mb-2 ${hasEmailError ? 'text-red-500' : 'text-secondary'}`}>
                      Email {hasEmailError && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        hasEmailError ? 'border-red-500' : 'border-border'
                      }`}
                    />
                  </div>
                )}

                {(formData.contactMethod === 'phone' || formData.contactMethod === 'text') && (
                  <div className="animate-in fade-in duration-500">
                    <label className={`block text-lg font-medium mb-2 ${hasPhoneError ? 'text-red-500' : 'text-secondary'}`}>
                      Phone Number {hasPhoneError && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        hasPhoneError ? 'border-red-500' : 'border-border'
                      }`}
                    />
                  </div>
                )}

                {formData.contactMethod === 'either' && (
                  <div className="grid md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                    <div>
                      <label className={`block text-lg font-medium mb-2 ${hasEmailError ? 'text-red-500' : 'text-secondary'}`}>
                        Email {hasEmailError && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        ref={emailRef}
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          hasEmailError ? 'border-red-500' : 'border-border'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-lg font-medium mb-2 ${hasPhoneError ? 'text-red-500' : 'text-secondary'}`}>
                        Phone Number {hasPhoneError && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        ref={phoneRef}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          hasPhoneError ? 'border-red-500' : 'border-border'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className={`block text-lg font-medium mb-2 ${hasMessageError ? 'text-red-500' : 'text-secondary'}`}>
                    Message {hasMessageError && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    ref={messageRef}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                      hasMessageError ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Company Info - Takes 1/3 of space */}
          <div className="md:col-span-1">
            <div className="bg-secondary rounded-2xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href={getEmailLink()} className="text-white/90 hover:text-white transition-colors">
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href={getPhoneLink()} className="text-white/90 hover:text-white transition-colors">
                      {COMPANY_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Location</p>
                    <p className="text-white/90">
                      {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="font-semibold mb-2">Business Hours</p>
                <p className="text-white/90 text-sm">
                  {COMPANY_INFO.contact.hours.weekdays}<br />
                  {COMPANY_INFO.contact.hours.saturday}<br />
                  {COMPANY_INFO.contact.hours.sunday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
