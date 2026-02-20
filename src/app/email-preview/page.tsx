'use client';

import { useState } from 'react';

export default function EmailPreview() {
  const [hasAgent, setHasAgent] = useState(true);
  const [viewType, setViewType] = useState<'customer' | 'agent'>('customer');

  const sampleData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(407) 555-1234',
    streetAddress: '123 Main Street',
    city: 'Orlando',
    state: 'FL',
    postalCode: '32801',
    propertyType: 'Single Family Home',
    yearBuilt: '2015',
    squareFeet: '2,500',
    roofType: 'Shingle',
    currentInsurance: 'Yes',
  };

  const formType = 'Home';
  const agentName = hasAgent ? 'Oraib Aref' : null;
  const agentEmail = 'oraib@planlifeusa.com';
  const agentImage = hasAgent ? '/agents/headshot/oraib.png' : '/agents/group/gusjusora.png';
  const customerEmail = 'john.doe@example.com';
  const submittedAt = 'Wednesday, February 19, 2025 at 3:45 PM';

  const formatAnswers = (answers: Record<string, string>) => {
    return Object.entries(answers).map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return { label, value };
    });
  };

  const formattedData = formatAnswers(sampleData);

  const renderCustomerEmail = () => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
      {/* Gradient Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(40, 47, 87, 0.05) 0%, rgba(13, 169, 228, 0.05) 100%)', padding: '50px 30px', textAlign: 'center' }}>
        <img src="/logo-full.png" alt="PlanLife USA" style={{ maxWidth: '280px', height: 'auto', margin: '0 auto' }} />
      </div>

      <div style={{ padding: '30px' }}>
        {/* Hero Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#282F57', fontSize: '26px', marginTop: '0', marginBottom: '12px', fontWeight: '700' }}>Thank You, {sampleData.firstName}!</h2>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
            We've received your {formType.toLowerCase() !== 'other' ? `${formType} insurance` : ''} information.
          </p>
        </div>

        {/* Agent Card - Before Recap */}
        {agentName ? (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px 25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(13, 169, 228, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
              <img src={agentImage} alt="Your Agent" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ color: '#282F57', fontSize: '18px', margin: '0', fontWeight: '600', lineHeight: '1.4' }}>{agentName.split(' ')[0]} will reach out to you shortly</h3>
          </div>
        ) : (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ padding: '30px 25px 20px 25px', textAlign: 'center' }}>
              <h3 style={{ color: '#282F57', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '600', lineHeight: '1.4' }}>Our agents are on it!</h3>
              <p style={{ color: '#0da9e4', fontSize: '14px', fontWeight: '600', margin: '0' }}>We'll reach out to you shortly</p>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <img src={agentImage} alt="PlanLife Team" style={{ maxWidth: '300px', height: 'auto', objectFit: 'contain', objectPosition: 'bottom', display: 'block' }} />
            </div>
          </div>
        )}

        {/* Recap Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', flex: '1', maxWidth: '100px' }}></div>
          <p style={{ margin: '0', color: '#9ca3af', fontSize: '16px' }}>Here's a little recap for you!</p>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', flex: '1', maxWidth: '100px' }}></div>
        </div>

        {/* Info Cards */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#282F57', fontSize: '18px', marginTop: '0', marginBottom: '20px', fontWeight: '600' }}>Your Information</h3>
          
          {/* Name Card */}
          <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: '3px solid #0da9e4', marginBottom: '12px' }}>
            <p style={{ margin: '0', color: '#282F57', fontSize: '16px', fontWeight: '600' }}>{sampleData.firstName} {sampleData.lastName}</p>
          </div>

          {/* Contact Card */}
          <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: '3px solid #0da9e4', marginBottom: '12px' }}>
            <p style={{ margin: '0 0 8px 0', color: '#282F57', fontSize: '15px' }}>{sampleData.email}</p>
            <p style={{ margin: '0', color: '#282F57', fontSize: '15px' }}>{sampleData.phone}</p>
          </div>

          {/* Address Card */}
          <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: '3px solid #0da9e4', marginBottom: '12px' }}>
            <p style={{ margin: '0', color: '#282F57', fontSize: '15px' }}>{sampleData.streetAddress}, {sampleData.city}, {sampleData.state} {sampleData.postalCode}</p>
          </div>

          {/* Property Details Card */}
          <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: '3px solid #0da9e4', marginBottom: '12px' }}>
            <p style={{ margin: '0 0 8px 0', color: '#282F57', fontSize: '15px' }}><strong>Property Type:</strong> {sampleData.propertyType}</p>
            <p style={{ margin: '0 0 8px 0', color: '#282F57', fontSize: '15px' }}><strong>Year Built:</strong> {sampleData.yearBuilt}</p>
            <p style={{ margin: '0 0 8px 0', color: '#282F57', fontSize: '15px' }}><strong>Square Feet:</strong> {sampleData.squareFeet}</p>
            <p style={{ margin: '0 0 8px 0', color: '#282F57', fontSize: '15px' }}><strong>Roof Type:</strong> {sampleData.roofType}</p>
            <p style={{ margin: '0', color: '#282F57', fontSize: '15px' }}><strong>Current Insurance:</strong> {sampleData.currentInsurance}</p>
          </div>

          <p style={{ margin: '20px 0 0 0', padding: '12px', backgroundColor: '#E6F7FF', borderRadius: '8px', color: '#282F57', fontSize: '13px' }}>
            <strong>Submitted:</strong> {submittedAt}
          </p>
        </div>

        {/* Next Steps */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#282F57', fontSize: '18px', marginTop: '0', marginBottom: '12px', fontWeight: '600' }}>What Happens Next?</h3>
          <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>
            We'll review your information and reach out to you to gather any additional details if needed. Then we'll get back to you shortly with a personalized quote tailored to your needs.
          </p>
        </div>

        {/* Contact Card */}
        <div style={{ backgroundColor: '#282F57', borderRadius: '12px', padding: '25px', textAlign: 'center', color: '#ffffff' }}>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: '0.9' }}>Questions? We're here to help!</p>
          <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>📧 plsupport@planlifeusa.com</p>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>📞 (407) 557-3100</p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#9ca3af', fontSize: '12px' }}>
          © 2025 PlanLife USA • Orlando, FL 32835
        </p>
      </div>
    </div>
  );

  const formIcon = formType.toLowerCase() === 'auto' ? '🚗' : formType.toLowerCase() === 'home' ? '🏠' : '🏢';

  const renderAgentEmail = () => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(40, 47, 87, 0.05) 0%, rgba(13, 169, 228, 0.05) 100%)', padding: '50px 30px', textAlign: 'center' }}>
        <img src="/logo-full.png" alt="PlanLife USA" style={{ maxWidth: '280px', height: 'auto', margin: '0 auto 15px auto' }} />
        <h1 style={{ color: '#000000', margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>🔔 New Lead Assignment 🔔</h1>
        <p style={{ color: '#282F57', margin: '0', fontSize: '16px' }}>{formIcon} {sampleData.firstName} {sampleData.lastName} - {formType} Insurance {formIcon}</p>
      </div>

      <div style={{ padding: '30px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#282F57', fontSize: '22px', marginTop: '0', marginBottom: '15px', fontWeight: '700' }}>New {formType} Quote</h2>
          <div style={{ padding: '15px', backgroundColor: '#FFF4E6', borderRadius: '8px', borderLeft: '4px solid #0da9e4' }}>
            <p style={{ margin: '0 0 8px 0', color: '#282F57', fontSize: '14px' }}><strong>Customer:</strong> {customerEmail}</p>
            <p style={{ margin: '0', color: '#282F57', fontSize: '14px' }}><strong>Agent:</strong> {agentName} ({agentEmail})</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#282F57', fontSize: '18px', marginTop: '0', marginBottom: '15px', fontWeight: '600' }}>Customer Details</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {formattedData.map(({ label, value }, idx) => (
              <div key={idx} style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <span style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>{label}:</span>{' '}
                <span style={{ color: '#282F57', fontSize: '14px' }}>{value}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: '15px 0 0 0', color: '#6b7280', fontSize: '13px' }}><strong>Submitted:</strong> {submittedAt}</p>
        </div>

        <div style={{ backgroundColor: '#E6F7FF', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #0da9e4' }}>
          <h3 style={{ color: '#282F57', fontSize: '16px', marginTop: '0', marginBottom: '8px', fontWeight: '600' }}>⚡ Action Required</h3>
          <p style={{ color: '#282F57', fontSize: '14px', margin: '0' }}>Please review this lead and reach out to the customer within 24 hours.</p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#9ca3af', fontSize: '12px' }}>© 2025 PlanLife USA</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#e5e7eb', padding: '40px 20px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto 20px auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
          <button onClick={() => setViewType('customer')} style={{ backgroundColor: viewType === 'customer' ? '#0da9e4' : '#9ca3af', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            📧 Customer Receipt
          </button>
          <button onClick={() => setViewType('agent')} style={{ backgroundColor: viewType === 'agent' ? '#282F57' : '#9ca3af', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            👤 Agent Notification
          </button>
        </div>
        {viewType === 'customer' && (
          <button onClick={() => setHasAgent(!hasAgent)} style={{ backgroundColor: '#0da9e4', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            {hasAgent ? '👤 With Agent (Oraib)' : '🏢 No Agent (Team)'}
          </button>
        )}
      </div>
      {viewType === 'customer' ? renderCustomerEmail() : renderAgentEmail()}
    </div>
  );
}
