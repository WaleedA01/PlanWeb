'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const jobListings = [
  { id: 'licensed-insurance-agent', title: 'Licensed Insurance Agent' },
  { id: 'commercial-account-manager', title: 'Commercial Account Manager' },
  { id: 'personal-lines-account-manager', title: 'Personal Lines Account Manager' },
];

export default function ApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const job = jobListings.find(j => j.id === jobId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whyGreatFit: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Job Not Found</h1>
          <Button onClick={() => router.push('/careers')}>Back to Careers</Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen py-16 md:py-24 bg-background flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-secondary mb-4">Application Submitted!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for applying to {job.title}. We've received your application and will review it shortly.
                We'll be in touch if your qualifications match our needs.
              </p>
              <Button onClick={() => router.push('/careers')} size="lg" className="bg-primary hover:bg-primary/90">
                Back to Careers
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, email });
    if (email && !validateEmail(email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePhoneChange = (phone: string) => {
    setFormData({ ...formData, phone });
    if (phone && !validatePhone(phone)) {
      setErrors({ ...errors, phone: 'Please enter a valid phone number (10+ digits)' });
    } else {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrors({ ...errors, phone: 'Please enter a valid phone number (10+ digits)' });
      return;
    }

    setSubmitting(true);
    
    const data = new FormData();
    data.append('jobTitle', job.title);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('whyGreatFit', formData.whyGreatFit);
    if (resume) data.append('resume', resume);
    if (coverLetter) data.append('coverLetter', coverLetter);

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => router.push('/careers')} className="mb-6">
            ← Back to Careers
          </Button>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">Apply for {job.title}</h1>
            <p className="text-muted-foreground mb-8">Fill out the form below to submit your application</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="john@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Phone Number *</label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Why are you a great fit for PlanLife? *
                </label>
                <Textarea
                  required
                  value={formData.whyGreatFit}
                  onChange={(e) => setFormData({ ...formData, whyGreatFit: e.target.value })}
                  placeholder="Tell us why you'd be a great addition to our team..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Resume/CV *</label>
                <div
                  onClick={() => document.getElementById('resume')?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {resume ? (
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">{resume.name}</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">Click to upload resume</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Cover Letter (Optional)</label>
                <div
                  onClick={() => document.getElementById('coverLetter')?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {coverLetter ? (
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">{coverLetter.name}</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">Click to upload cover letter</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
                <input
                  id="coverLetter"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
