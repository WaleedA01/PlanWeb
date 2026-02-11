export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true; // Empty is valid (optional)
  
  const date = new Date(dateString);
  const now = new Date();
  
  // Check if date is valid
  if (isNaN(date.getTime())) return false;
  
  // Date must be in the past
  if (date > now) return false;
  
  return true;
};

export const isValidDateOfBirth = (dateString: string): boolean => {
  if (!dateString) return true;
  
  const date = new Date(dateString);
  const now = new Date();
  
  if (isNaN(date.getTime())) return false;
  if (date > now) return false;
  
  // Must be at least 18 years old
  const age = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  const dayDiff = now.getDate() - date.getDate();
  
  if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
    return false;
  }
  
  // Must be less than 120 years old
  if (age > 120) return false;
  
  return true;
};

export const isValidFutureDate = (dateString: string): boolean => {
  if (!dateString) return true;
  
  const date = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day
  
  if (isNaN(date.getTime())) return false;
  
  // Date must be today or in the future
  if (date < now) return false;
  
  // Date must be within 2 years
  const twoYearsFromNow = new Date(now);
  twoYearsFromNow.setFullYear(now.getFullYear() + 2);
  
  if (date > twoYearsFromNow) return false;
  
  return true;
};
