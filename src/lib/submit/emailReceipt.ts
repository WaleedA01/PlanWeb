import { Resend } from "resend";
import { getAgentById } from "@/lib/agents/getAgents";

const resend = new Resend(process.env.RESEND_API_KEY);
const PRINCIPAL_EMAIL = "gus@planlifeusa.com";

type ReceiptData = {
  formType: string;
  answers: Record<string, unknown>;
  agentId?: string;
  submittedAt: string;
  files?: Array<{ filename: string; content: Buffer }>;
};

function formatAnswersForAgent(answers: Record<string, unknown>): string {
  return Object.entries(answers)
    .filter(([key]) => ![
      'turnstileToken', 'agentId', 'selectedAgentId', 'agentEmail', 'agentPhone', 'tags', 'agent',
      'latitude', 'longitude', 'leadSource', 'smsOptIn', 'policyFiles', 'licenseFiles', 'uploadedFiles', 'qr'
    ].includes(key))
    .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      let displayValue = value;
      
      // Handle file objects
      if (typeof value === 'object' && value !== null && 'name' in value) {
        displayValue = `Uploaded (${(value as any).name}): true ✅`;
      }
      
      return `<div style="padding: 10px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 10px;">
        <span style="color: #6b7280; font-size: 12px; font-weight: 600;">${label}:</span>
        <span style="color: #282F57; font-size: 14px;"> ${displayValue}</span>
      </div>`;
    })
    .join('');
}

function buildPropertyDetailsCard(answers: Record<string, unknown>): string {
  // Fields to exclude from the details card (already shown elsewhere or internal)
  const excludeFields = [
    'firstName', 'lastName', 'email', 'phoneNumber', 'phone',
    'streetAddress', 'city', 'state', 'postalCode',
    'turnstileToken', 'agentId', 'selectedAgentId', 'agentEmail', 'agentPhone', 
    'tags', 'agent', 'latitude', 'longitude', 'leadSource', 'smsOptIn', 
    'policyFiles', 'licenseFiles', 'uploadedFiles', 'qr', 'formType',
    'preferredContactMethod', 'additionalNotes', 'googleTypes'
  ];

  // Custom labels for better readability
  const customLabels: Record<string, string> = {
    // Auto fields
    coverageUrgency: 'Coverage Urgency',
    numVehicles: 'Number of Vehicles',
    numDrivers: 'Number of Drivers',
    isCurrentlyInsured: 'Currently Insured',
    currentInsurer: 'Current Insurance Provider',
    
    // Home fields
    dateOfBirth: 'Date of Birth',
    isNewPurchase: 'New Purchase',
    insuranceStatus: 'Insurance Status',
    closeDate: 'Closing Date',
    coverageDate: 'Coverage Start Date',
    propertyFeatures: 'Property Features',
    propertyUsage: 'Property Usage',
    
    // Business fields
    businessName: 'Business Name',
    businessType: 'Business Type',
    products: 'Products/Services',
    isNewBusiness: 'New Business',
    yearBusinessStarted: 'Year Started',
    numEmployees: 'Number of Employees',
    annualSales: 'Annual Sales',
    nextExpirationDate: 'Current Policy Expiration',
    expectedCoverageDate: 'Expected Coverage Date',
    expectedDate: 'Expected Coverage Date',
    
    // Other fields
    productInterest: 'Product Interest',
  };

  // Format values for better display
  const formatValue = (key: string, value: any): string => {
    // Auto insurance
    if (key === 'coverageUrgency') {
      if (value === 'now') return 'Need coverage now';
      if (value === 'week') return 'Need coverage within the week';
      if (value === 'shopping') return "I'm shopping around";
    }
    if (key === 'isCurrentlyInsured' || key === 'isNewPurchase' || key === 'isNewBusiness') {
      return value === true ? 'Yes' : 'No';
    }
    
    // Home insurance
    if (key === 'insuranceStatus') {
      if (value === 'currently-insured') return 'Currently Insured';
      if (value === 'looking-to-insure') return 'Looking to Insure';
    }
    if (key === 'propertyUsage') {
      if (value === 'primary') return 'Primary Residence';
      if (value === 'secondary') return 'Secondary/Vacation Home';
      if (value === 'rental') return 'Rental Property';
    }
    
    // Arrays (property features, products)
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    return String(value);
  };

  const items = Object.entries(answers)
    .filter(([key, value]) => !excludeFields.includes(key))
    .filter(([, value]) => {
      if (value === '' || value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
    .map(([key, value]) => {
      const label = customLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const formattedValue = formatValue(key, value);
      return `<p style="margin: 0 0 8px 0; color: #282F57; font-size: 15px;"><strong>${label}:</strong> ${formattedValue}</p>`;
    });

  if (items.length === 0) return '';

  // Remove trailing margin from last item
  if (items.length > 0) {
    items[items.length - 1] = items[items.length - 1].replace('margin: 0 0 8px 0', 'margin: 0');
  }

  return `<div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #0da9e4; margin-bottom: 12px;">
    ${items.join('\n')}
  </div>`;
}

export async function sendEmailReceipts(data: ReceiptData) {
  const { formType, answers, agentId, submittedAt, files = [] } = data;
  const customerEmail = answers.email as string;
  
  if (!customerEmail) return;

  const agent = agentId ? getAgentById(agentId) : null;
  const agentName = agent ? `${agent.firstName} ${agent.lastName}` : null;
  const agentFirstName = agent ? agent.firstName : null;
  const agentImage = agent 
    ? `https://planlife.net${agent.headshotSrc}` 
    : 'https://planlife.net/agents/group/gusjusora.png';

  // Build info cards
  let infoCards = '';
  
  // Name card
  if (answers.firstName || answers.lastName) {
    infoCards += `<div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #0da9e4; margin-bottom: 12px;">
      <p style="margin: 0; color: #282F57; font-size: 16px; font-weight: 600;">${answers.firstName || ''} ${answers.lastName || ''}</p>
    </div>`;
  }
  
  // Contact card (email + phone)
  if (answers.email || answers.phoneNumber) {
    infoCards += `<div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #0da9e4; margin-bottom: 12px;">`;
    if (answers.email) infoCards += `<p style="margin: 0 0 8px 0; color: #282F57; font-size: 15px;">${answers.email}</p>`;
    if (answers.phoneNumber) infoCards += `<p style="margin: 0; color: #282F57; font-size: 15px;">${answers.phoneNumber}</p>`;
    infoCards += `</div>`;
  }
  
  // Address card (all in one line)
  if (answers.streetAddress || answers.city || answers.state || answers.postalCode) {
    const addressParts = [
      answers.streetAddress,
      answers.city,
      answers.state && answers.postalCode ? `${answers.state} ${answers.postalCode}` : answers.state || answers.postalCode
    ].filter(Boolean).join(', ');
    infoCards += `<div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #0da9e4; margin-bottom: 12px;">
      <p style="margin: 0; color: #282F57; font-size: 15px;">${addressParts}</p>
    </div>`;
  }

  // Property/Business/Vehicle details card
  const detailsCard = buildPropertyDetailsCard(answers);
  if (detailsCard) {
    infoCards += detailsCard;
  }

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5;">
      <div style="background: linear-gradient(135deg, rgba(40, 47, 87, 0.05) 0%, rgba(13, 169, 228, 0.05) 100%); padding: 50px 30px; text-align: center;">
        <img src="https://planlife.net/logo-full.png" alt="PlanLife USA" style="max-width: 280px; height: auto; margin: 0 auto;" />
      </div>
      
      <div style="padding: 30px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="color: #282F57; font-size: 26px; margin-top: 0; margin-bottom: 12px; font-weight: 700;">Thank You, ${answers.firstName || 'there'}!</h2>
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
            We've received your ${formType.toLowerCase() !== 'other' ? `${formType} insurance` : ''} information.
          </p>
        </div>
        
        ${agentName ? `
        <div style="background-color: #ffffff; border-radius: 12px; padding: 30px 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center;">
          <div style="width: 80px; height: 80px; border-radius: 50%; background-color: rgba(13, 169, 228, 0.1); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <img src="${agentImage}" alt="Your Agent" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
          </div>
          <h3 style="color: #282F57; font-size: 18px; margin: 0; font-weight: 600; line-height: 1.4;">${agentFirstName} will reach out to you shortly</h3>
        </div>
        ` : `
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <div style="padding: 30px 25px 20px 25px; text-align: center;">
            <h3 style="color: #282F57; font-size: 18px; margin: 0 0 8px 0; font-weight: 600; line-height: 1.4;">Our agents are on it!</h3>
            <p style="color: #0da9e4; font-size: 14px; font-weight: 600; margin: 0;">We'll reach out to you shortly</p>
          </div>
          <div style="width: 100%; display: flex; justify-content: center; align-items: flex-end;">
            <img src="${agentImage}" alt="PlanLife Team" style="max-width: 300px; height: auto; object-fit: contain; object-position: bottom; display: block;" />
          </div>
        </div>
        `}
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
          <div style="height: 1px; background-color: #e5e7eb; flex: 1; max-width: 100px;"></div>
          <p style="margin: 0; color: #9ca3af; font-size: 16px;">Here's a little recap for you!</p>
          <div style="height: 1px; background-color: #e5e7eb; flex: 1; max-width: 100px;"></div>
        </div>
        
        <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h3 style="color: #282F57; font-size: 18px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Your Information</h3>
          ${infoCards}
          <p style="margin: 20px 0 0 0; padding: 12px; background-color: #E6F7FF; border-radius: 8px; color: #282F57; font-size: 13px;">
            <strong>Submitted:</strong> ${submittedAt}
          </p>
        </div>
        
        <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h3 style="color: #282F57; font-size: 18px; margin-top: 0; margin-bottom: 12px; font-weight: 600;">What Happens Next?</h3>
          <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">
            We'll review your information and reach out to you to gather any additional details if needed. Then we'll get back to you shortly with a personalized quote tailored to your needs.
          </p>
        </div>
        
        <div style="background-color: #282F57; border-radius: 12px; padding: 25px; text-align: center; color: #ffffff;">
          <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.9;">Questions? We're here to help!</p>
          <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">📧 plsupport@planlifeusa.com</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600;">📞 (407) 557-3100</p>
        </div>
        
        <p style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          © 2025 PlanLife USA • Orlando, FL 32835
        </p>
      </div>
    </div>
  `;

  const customerName = `${answers.firstName || ''} ${answers.lastName || ''}`.trim() || customerEmail;
  const businessName = answers.businessName ? ` for ${answers.businessName}` : '';
  
  // Icon based on form type
  const formIcon = formType.toLowerCase() === 'auto' ? '🚗' : formType.toLowerCase() === 'home' ? '🏠' : formType.toLowerCase() === 'business' ? '🏢' : '📄';

  const internalHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5;">
      <div style="background: linear-gradient(135deg, rgba(40, 47, 87, 0.05) 0%, rgba(13, 169, 228, 0.05) 100%); padding: 50px 30px; text-align: center;">
        <img src="https://planlife.net/logo-full.png" alt="PlanLife USA" style="max-width: 280px; height: auto; margin: 0 auto 15px auto;" />
        <h1 style="color: #000000; margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">🔔 New Lead Assignment 🔔</h1>
        <p style="color: #282F57; margin: 0; font-size: 16px;">${formIcon} ${customerName} - ${formType} Insurance${businessName} ${formIcon}</p>
      </div>
      
      <div style="padding: 30px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="color: #282F57; font-size: 22px; margin-top: 0; margin-bottom: 15px; font-weight: 700;">New ${formType} Quote</h2>
          <div style="padding: 15px; background-color: #FFF4E6; border-radius: 8px; border-left: 4px solid #0da9e4;">
            <p style="margin: 0 0 8px 0; color: #282F57; font-size: 14px;"><strong>Customer:</strong> ${customerEmail}</p>
            ${agent ? `<p style="margin: 0; color: #282F57; font-size: 14px;"><strong>Agent:</strong> ${agentName} (${agent.email})</p>` : ''}
          </div>
        </div>
        
        <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h3 style="color: #282F57; font-size: 18px; margin-top: 0; margin-bottom: 15px; font-weight: 600;">Customer Details</h3>
          ${formatAnswersForAgent(answers)}
          <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 13px;"><strong>Submitted:</strong> ${submittedAt}</p>
        </div>
        
        <div style="background-color: #E6F7FF; border-radius: 12px; padding: 20px; border-left: 4px solid #0da9e4;">
          <h3 style="color: #282F57; font-size: 16px; margin-top: 0; margin-bottom: 8px; font-weight: 600;">⚡ Action Required</h3>
          <p style="color: #282F57; font-size: 14px; margin: 0;">Please review this lead and reach out to the customer within 24 hours.</p>
        </div>
        
        <p style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">© 2025 PlanLife USA</p>
      </div>
    </div>
  `;

  const emails = [];

  // Prepare attachments for internal emails
  const attachments = files.map(f => ({ filename: f.filename, content: f.content }));

  // Send internal emails (avoid duplicate if agent is Gus)
  const isAgentGus = agent && agent.email === PRINCIPAL_EMAIL;
  
  emails.push(
    resend.emails.send({
      from: "PlanLife USA <info@planlifeusa.com>",
      to: PRINCIPAL_EMAIL,
      subject: `New ${formType} Quote${isAgentGus ? ' Assigned to You' : ''} - ${answers.firstName || ''} ${answers.lastName || ''}`,
      html: internalHtml,
      attachments,
    })
  );

  if (agent && !isAgentGus) {
    await new Promise(resolve => setTimeout(resolve, 600));
    emails.push(
      resend.emails.send({
        from: "PlanLife USA <info@planlifeusa.com>",
        to: agent.email,
        subject: `New ${formType} Quote Assigned to You - ${answers.firstName || ''} ${answers.lastName || ''}`,
        html: internalHtml,
        attachments,
      })
    );
  }

  await Promise.allSettled(emails);

  // Wait 10 seconds before sending customer email
  await new Promise(resolve => setTimeout(resolve, 10000));

  await resend.emails.send({
    from: "PlanLife USA <info@planlifeusa.com>",
    to: customerEmail,
    subject: `Your ${formType} Insurance Quote Request - PlanLife USA`,
    html: customerHtml,
  });
}
