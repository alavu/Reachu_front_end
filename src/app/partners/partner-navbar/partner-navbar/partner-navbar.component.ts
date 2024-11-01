import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';

@Component({
  selector: 'partner-navbar',
  templateUrl: './partner-navbar.component.html',
  styleUrls: ['./partner-navbar.component.scss']
})
export class PartnerNavbarComponent {
  constructor(private router: Router, private auth: AuthService) {}

  loggedIn() {
    return UserStorageService.isAdminLoggedIn();
  }

  logout() {
    console.log('Logout function called');
    UserStorageService.signOut();
    this.auth.signOut();
    this.router.navigateByUrl('/home');
  }
}
