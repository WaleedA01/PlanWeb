'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      category: 'Getting Started',
      question: 'How do I get a quote?',
      answer: 'Getting a quote is simple! Just fill out our online form on the Business or Personal insurance page, and one of our licensed agents will contact you within 1-2 business days with personalized quotes from multiple carriers.',
    },
    {
      category: 'Getting Started',
      question: 'How long does it take to get coverage?',
      answer: 'Once you select your preferred coverage, most policies can be activated within 24-48 hours. Some specialized business policies may take 3-5 business days depending on the carrier and coverage type.',
    },
    {
      category: 'Getting Started',
      question: 'Do I need to speak with an agent?',
      answer: 'While our online process is streamlined, speaking with one of our licensed agents ensures you get the best coverage tailored to your specific needs. Our agents will reach out to you after you submit your information.',
    },
    {
      category: 'Coverage',
      question: 'What types of insurance do you offer?',
      answer: 'We offer comprehensive coverage for both business and personal needs. Business insurance includes General Liability, Workers Compensation, Commercial Property, Professional Liability, Commercial Auto, and Cyber Liability. Personal insurance includes Auto, Home, Life, Health, Motorcycle, and Renters insurance.',
    },
    {
      category: 'Coverage',
      question: 'Can I bundle multiple policies?',
      answer: 'Yes! Bundling multiple policies often results in significant savings. Our agents will help you identify the best bundling opportunities across our carrier network to maximize your savings while ensuring comprehensive coverage.',
    },
    {
      category: 'Coverage',
      question: 'What if I need to make changes to my policy?',
      answer: 'You can contact your assigned agent anytime to make changes to your policy. Whether you need to add coverage, update information, or adjust your policy limits, we make the process quick and easy.',
    },
    {
      category: 'Pricing',
      question: 'How do you determine my rates?',
      answer: 'Rates are determined by multiple factors including coverage type, coverage limits, your location, claims history, and risk factors. We work with multiple carriers to compare rates and find you the best price for your specific situation.',
    },
    {
      category: 'Pricing',
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! We believe in complete transparency. All costs will be clearly outlined in your quote, including premiums, deductibles, and any applicable fees. What you see is what you pay.',
    },
    {
      category: 'Pricing',
      question: 'What payment options do you accept?',
      answer: 'We offer flexible payment options including monthly, quarterly, semi-annual, and annual payments. Most carriers accept credit cards, debit cards, ACH transfers, and checks.',
    },
    {
      category: 'Claims',
      question: 'How do I file a claim?',
      answer: 'Contact your insurance carrier directly using the claims number on your policy documents, or reach out to your PlanLife agent who can guide you through the claims process and advocate on your behalf.',
    },
    {
      category: 'Claims',
      question: 'Will my rates increase if I file a claim?',
      answer: 'It depends on the type and severity of the claim. Not all claims result in rate increases. Your agent can explain how claims may affect your specific policy and help you make informed decisions.',
    },
    {
      category: 'About PlanLife',
      question: 'Which insurance carriers do you work with?',
      answer: 'We partner with leading carriers including Progressive, Geico, Hartford, Liberty Mutual, Safeco, Citizens, AmTrust, Berkshire, and Bristol West. This allows us to compare rates and find you the best coverage at the best price.',
    },
    {
      category: 'About PlanLife',
      question: 'What makes PlanLife different?',
      answer: 'We combine personalized service with cutting-edge technology. Our licensed agents take the time to understand your unique needs, while our streamlined process makes getting coverage fast and easy. We shop multiple carriers for you, saving you time and money.',
    },
    {
      category: 'About PlanLife',
      question: 'Is PlanLife licensed?',
      answer: 'Yes! PlanLife and all our agents are fully licensed and regulated. We maintain all required state licenses and comply with all insurance regulations to protect you and your coverage.',
    },
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{category}</h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div
                        key={globalIndex}
                        className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/5 transition-colors"
                        >
                          <span className="text-lg font-semibold text-secondary pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
