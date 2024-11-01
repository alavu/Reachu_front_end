import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { UserDataService } from 'src/app/auth/services/user-details.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit{

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;
  showTimer: boolean = true;
  email: string | null= this.userDataService.getEmail();
  isRequestAgainWarningVisible: boolean = false;
  timerExpired: boolean = false;
  showRequestAgainWarning: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private userDataService: UserDataService
  ) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    console.log('OTP token:', token); // Log token for debugging
    // this.activateAccount(token);
    if (token) {
      // this.activateAccount(token);
      this.showTimer = false;
    } else {
      this.showTimer = true; // Show timer if no token in URL
    }
  }
  onCodeCompleted(token: string) {
    this.confirmAccount(token)
  }

  redirectToLogin() {
    this.router.navigate(['login'])
  }

  activateAccount(token: string): void {
    this.authService.verifyAccount(token).subscribe({
      next: (response) => {
        this.openSnackBar('Account activated successfully', 'Close');
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.openSnackBar('Account activation failed', 'Close');
        this.showTimer = false;
      }
    });
  }

  // requestActivationCode() {
  //   const token = this.route.snapshot.queryParams['token'];
  //   console.log('Retrieved token:', token); // Log token for debugging
  //   if (token) {
  //     this.authService.resendActivationCode(token).subscribe({
  //       next: (response) => {
  //         this.openSnackBar('Activation code sent successfully', 'Close');
  //         this.showTimer = true; // Restart timer if needed
  //       },
  //       error: () => {
  //         this.openSnackBar('Failed to send activation code', 'Close');
  //       }
  //     });
  //   } else {
  //     this.openSnackBar('Token is missing', 'Close');
  //   }
  // }

  requestActivationCode() {
    this.submitted = false;
    this.showTimer = true;
    console.log('Try again button clicked');
      this.authService.resendActivationCode(this.email).subscribe({
        next: (response) => {
          console.log("Response from user email:", response);
          this.snackBar.open('Activation code sent successfully', 'Close');
          this.showTimer = true; // Restart timer if needed
        },
          error: () => {
            this.snackBar.open('Resend OTP send your mail pls check!!', 'Close');
          }
      });
  }


  // Add this method in your component class
  onTokenExpired() {
  this.message = 'Token has expired. Please request a new activation link.';
  this.isOkay = false;
  this.submitted = true;
  this.showTimer = false;
  this.openSnackBar(this.message, 'Close');
  // Optional: Redirect to a specific page or trigger another action
}

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private confirmAccount(token: string) {
    this.authService.verifyAccount(token).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        // this.router.navigate(['login']);
        this.submitted = true;
        this.isOkay = true;
        this.openSnackBar(this.message, 'Close');
        this.showTimer = false;
      },
      error: () => {
        this.message = 'Token has expired or is invalid';
        this.submitted = true;
        this.isOkay = false;
        this.openSnackBar(this.message, 'Close');
        this.showTimer = false;
      }
    });
  }
}
