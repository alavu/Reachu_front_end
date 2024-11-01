import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Router } from "@angular/router";
import { UserStorageService } from '../services/user-stoarge.service';

@Component({
    selector: 'app-partner-login',
    templateUrl: './partner-login.component.html',
    styleUrls: ['./partner-login.component.scss']
})
export class PartnerLoginComponent implements OnInit {
    validateForm!: FormGroup;
    isSpinning = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private ngZone: NgZone,
        private snackBar: MatSnackBar,
        private notification: NzNotificationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    submitForm() {
        // Show spinner during the request
        // this.isSpinning = true;

        // Send login request using AuthService
        this.authService.isPartnerlogin(this.validateForm.value).subscribe({
            next: (res: LoginResponse) => {
                console.log('Login Response:', res);

                if (res.token != null) {
                    // Save user information to local storage
                    const partner = {
                        token: res.token,
                        role: res.userRole,
                        userId: res.userId
                    };

                    console.log('User role:', res.userRole);
                    console.log('Partner:', partner);
                    UserStorageService.saveUser(partner);

                    const token = res.token;
                    console.log('JWT Token:', token);
                    UserStorageService.saveToken(token);

                    // Navigate to partner dashboard if login is successful
                    if (UserStorageService.isPartnerLoggedIn()) {
                        this.router.navigateByUrl('/partner/dashboard');
                    }

                    this.snackBar.open("Login successful", "Close", { duration: 3000 });
                } else {
                    // Show error if credentials are invalid
                    this.snackBar.open("Invalid credentials.", "Close", { duration: 3000, panelClass: "error-snackbar" });
                }
                this.isSpinning = false;
            },
            error: (err) => {
                console.error('Login Error:', err);
                // Handle different error messages
                if (err.message === "Partner is blocked") {
                    this.snackBar.open("Your account is blocked. Please contact support.", "Close", {
                        duration: 5000,
                        panelClass: "error-snackbar"
                    });
                } else if (err.message === "Partner is not verified") {
                    this.snackBar.open("Your account is pending verification. Please wait for admin approval.", "Close", {
                        duration: 5000,
                        panelClass: "error-snackbar"
                    });
                } else if (err.message === "Partner is rejected by admin") {
                    this.snackBar.open("Your account has been rejected by the admin.", "Close", {
                        duration: 5000,
                        panelClass: "error-snackbar"
                    });
                }
                else {
                    this.snackBar.open("An error occurred. Please try again.", "Close", {
                        duration: 5000,
                        panelClass: "error-snackbar"
                    });
                }
                this.isSpinning = false;
            }
        });
    }

    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            console.error('Invalid token format', e);
            return null;
        }
    }
}

interface LoginResponse {
    email: string;
    userId: number;
    userRole: string;
    token: string;
    refreshToken: string;
}
