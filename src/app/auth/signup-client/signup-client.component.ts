import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthService} from '../services/auth.service';
import { UserDataService } from '../services/user-details.service';
import { passwordMatchValidator, phoneValidator } from 'src/app/validator/password-match.validator';

@Component({
    selector: 'app-signup-client',
    templateUrl: './signup-client.component.html',
    styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent {

    validateForm!: FormGroup;
    errorMsg: Array<string> = []; // errorMsg: string;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private notification: NzNotificationService,
                private router: Router,
                private userDataService: UserDataService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            name: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            // phone: [null, [Validators.required]],
            phone: [null, [Validators.required, phoneValidator()]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required]],
        }, { validator: passwordMatchValidator }); // Apply the custom validator here
    }

    submitForm() {
        if (this.validateForm.invalid) {
            for (const i in this.validateForm.controls) {
                if (this.validateForm.controls.hasOwnProperty(i)) {
                    this.validateForm.controls[i].markAsDirty();
                    this.validateForm.controls[i].updateValueAndValidity();
                }
            }

           // Display specific error message if password mismatch occurs
           if (this.validateForm.hasError('passwordMismatch')) {
            this.notification.error(
                'ERROR',
                'Passwords do not match!',
                { nzDuration: 5000 }
            );
            this.validateForm.get('checkPassword')?.setErrors({ passwordMismatch: true });
        } else if (this.validateForm.get('phone')?.hasError('invalidPhone')) {
            this.notification.error(
              'ERROR',
              'Phone number must contain exactly 10 digits and no special characters!',
              { nzDuration: 5000 }
            );
          } else {
            this.notification.error(
              'ERROR',
              'Please fill in all required fields.',
              { nzDuration: 5000 }
            );
          }
          return;
        }
        const email = this.validateForm.get('email')?.value;
        this.userDataService.setEmail(email);


        this.authService.registerClient(this.validateForm.value).subscribe({
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
                    { nzDuration: 5000 }
                );
                this.errorMsg = [errorMessage];
            }
        });
    }
}
