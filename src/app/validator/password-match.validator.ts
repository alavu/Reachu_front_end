import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('checkPassword');
  
  return password && confirmPassword && password.value !== confirmPassword.value 
    ? { passwordMismatch: true } 
    : null;
};

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.value;
      const phoneRegex = /^\d{10}$/; // Only digits and exactly 10 digits
  
      if (!phoneRegex.test(phone)) {
        return { invalidPhone: true };
      }
      return null;
    };
  }
