'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, getPhoneLink, getEmailLink } from '@/lib/company-info';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactMethod: 'either',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return /^[\d\s()+-]{10,}$/.test(phone);
  };

  const isFormValid = isValidEmail(formData.email) || isValidPhone(formData.phone);

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
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-3">
                    Preferred Contact Method *
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
                              <method.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
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

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
