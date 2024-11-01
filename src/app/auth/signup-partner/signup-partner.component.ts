import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.service';
import { CategoryService } from 'src/app/admin/services/category.service';
import {phoneValidator} from "../../validator/password-match.validator";

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-partner.component.html',
  styleUrls: ['./signup-partner.component.scss']
})
export class SignupPartnerComponent {

    validateForm!: FormGroup;
    errorMsg: Array<string> = [];
    categories: any[] = [];

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private category: CategoryService,
                private notification: NzNotificationService,
                private router: Router) {
    }

    // Custom Validator Function
    passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('checkPassword')?.value;

        if (password !== confirmPassword) {
            return { passwordMismatch: true };
        }
        return null;
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            name: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            // address: [null, [Validators.required]],
            phone: [null, [Validators.required, phoneValidator()]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required]],
            service: [null, [Validators.required]]
        },{ validators: this.passwordMatchValidator });
        this.loadCategories();
    }

    // Fetch services
    loadCategories(): void {
        this.category.categories().subscribe(
            (data: any) => {
                this.categories = data;
                console.log(this.categories);
            },
            (error: any) => {
                console.error('Failed to fetch service:', error);
                this.notification.error('ERROR', 'Failed to load service', {nzDuration: 5000});
            }
        );
    }

//   submitForm() {
//     if (this.validateForm.valid) {
//       // Get the selected service ID
//       const selectedServiceId = this.validateForm.get('service')?.value;
//
//       // Find the corresponding service name
//       const selectedService = this.categories.find(service => service.id === selectedServiceId);
//       const serviceName = selectedService ? selectedService.name : null;
//
//       // Prepare the payload with the service name instead of the ID
//       const payload = {
//         ...this.validateForm.value,
//         service: serviceName // Replace ID with service name
//       };
//
//       this.authService.registerPartner(payload).subscribe({
//         next: () => {
//           this.router.navigate(['activate-account']);
//         },
//         error: (err) => {
//           console.log('Error:', err);
//           this.errorMsg = err.error.validationErrors;
//         }
//       });
//     }
//   }
// }

    submitForm() {
        if (this.validateForm.invalid) {
            // Mark all controls as dirty and update validity
            for (const i in this.validateForm.controls) {
                if (this.validateForm.controls.hasOwnProperty(i)) {
                    this.validateForm.controls[i].markAsDirty();
                    this.validateForm.controls[i].updateValueAndValidity();
                }
            }

            // Display specific error messages for validation failures
            if (this.validateForm.hasError('passwordMismatch')) {
                this.notification.error(
                    'ERROR',
                    'Passwords do not match!',
                    {nzDuration: 5000}
                );
                this.validateForm.get('checkPassword')?.setErrors({passwordMismatch: true});
            } else if (this.validateForm.get('phone')?.hasError('invalidPhone')) {
                this.notification.error(
                    'ERROR',
                    'Phone number must contain exactly 10 digits and no special characters!',
                    {nzDuration: 5000}
                );
            } else {
                this.notification.error(
                    'ERROR',
                    'Please fill in all required fields.',
                    {nzDuration: 5000}
                );
            }
            return;
        }

        // Get the selected service ID
        const selectedServiceId = this.validateForm.get('service')?.value;

        // Find the corresponding service name
        const selectedService = this.categories.find(service => service.id === selectedServiceId);
        const serviceName = selectedService ? selectedService.name : null;

        // Prepare the payload with the service name instead of the ID
        const payload = {
            ...this.validateForm.value,
            service: serviceName // Replace ID with service name
        };

        this.authService.registerPartner(payload).subscribe({
            next: () => {
                this.router.navigate(['activate-account']);
            },
            error: (err) => {
                let errorMessage = 'An error occurred';
                if (err.error && err.error.error) {
                    errorMessage = err.error.error;
                } else if (err.error && err.error.businessErrorDescription) {
                    errorMessage = err.error.businessErrorDescription;
                } else if (err.message) {
                    errorMessage = err.message;
                }

                this.notification.error(
                    'ERROR',
                    errorMessage,
                    {nzDuration: 5000}
                );
                this.errorMsg = [errorMessage];
            }
        });
    }
}
