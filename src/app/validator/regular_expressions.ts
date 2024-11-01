export const namePattern = /^[a-zA-Z\s]+$/;  // Example regex for name validation
export const mobilePattern = /^[0-9]{10}$/;  // Example regex for mobile validation
export const experiencePattern = /^[0-9]+$/; // Example regex for experience validation

export const ValidationPatterns = {
    name: /^[a-zA-Z\s]{3,}$/, // Allows only letters and spaces, minimum 3 characters
    phone: /^[0-9]{10,12}$/, // Allows only digits, 10 to 12 characters
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email validation
    service: /^[a-zA-Z\s]{3,}$/, // Allows only letters and spaces, minimum 3 characters
  };
  