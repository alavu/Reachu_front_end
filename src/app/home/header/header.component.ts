import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GoogleAuthService } from 'src/app/auth/services/google-auth.service';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isClientLoggedIn: boolean = false;
    isAdminLoggedIn: boolean = false;
    isPartnerLoggedIn: boolean = false;
    isGoogleLogin: boolean = false;
    isDropdownOpen = false;

    showHeader: boolean = true; // Cntrol header visibility

    constructor(
        private router: Router,
        private authService: AuthService,
        private googleAuthService: GoogleAuthService,
        private cdr: ChangeDetectorRef,
        private notification: NzNotificationService) { }

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
          }

    ngOnInit(): void {
        const currentRoute = this.router.url;
        if (currentRoute == 'admin') {
            this.showHeader = false
        }
        this.updateHeaderVisibility();
        this.checkLoginStatus();

        this.googleAuthService.googleLoginStatus$.subscribe(status => {
            this.isGoogleLogin = status;
            console.log("Google Login", this.isGoogleLogin)
            this.updateHeaderVisibility();
          });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.checkLoginStatus();
                this.updateHeaderVisibility();
            }
        });
    }

    checkLoginStatus(): void {
        this.isClientLoggedIn = UserStorageService.isUserLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
        this.isPartnerLoggedIn = UserStorageService.isPartnerLoggedIn();

        // Check Google login status
        this.authService.checkGoogleLogin().subscribe(
            (response: any) => {
                console.log("Google status :", response)
                this.isGoogleLogin = response.loggedIn; // Make sure this matches your backend response
                console.log("Google response", this.isGoogleLogin);
                this.updateHeaderVisibility();
            },
            (error) => {
                this.isGoogleLogin = false;
                this.updateHeaderVisibility();
            }
        );
    }
    updateHeaderVisibility(): void {
       // Hide the header only if the admin is logged in
       this.showHeader = !this.isAdminLoggedIn ||(this.isClientLoggedIn || this.isPartnerLoggedIn || this.isGoogleLogin);

       const currentRoute = this.router.url;
       console.log('Current Route:', currentRoute);

       // Hide the header if the route is '/admin' or '/admin/login'
       this.showHeader = !currentRoute.includes('/admin');

       console.log('Header Status:', {
           isClientLoggedIn: this.isClientLoggedIn,
           isAdminLoggedIn: this.isAdminLoggedIn,
           isPartnerLoggedIn: this.isPartnerLoggedIn,
           isGoogleLogin: this.isGoogleLogin,
           showHeader: this.showHeader

       });
       this.cdr.detectChanges();
   }

   navigateToMyBookings() {
    this.router.navigate(['/booking']);
    this.isDropdownOpen = false;
  }

  navigateToMyChat() {
    this.router.navigate(['/chat']);
    this.isDropdownOpen = false;
  }


    logout() {
        console.log('Logout function called');
        UserStorageService.signOut();
        this.checkLoginStatus(); // Update login status
        this.authService.signOut();
        this.notification.success('Logout Successful', 'You have been logged out successfully.');
        this.router.navigateByUrl('/home');
    }
}
