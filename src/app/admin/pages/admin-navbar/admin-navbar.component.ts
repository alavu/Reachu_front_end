import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';
import {filter} from "rxjs";
@Component({
    selector: 'app-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
    currentRoute: string;

    constructor(private router: Router, private auth: AuthService) {
        // Listen for changes to update the currentRoute value
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.currentRoute = event.urlAfterRedirects;
            });
    }

    ngOnInit(): void {
        this.currentRoute = this.router.url; // Set initial route on load
    }

    loggedIn() {
      debugger
      return UserStorageService.isAdminLoggedIn();
    }

    logout() {
      console.log('Logout function called');
      UserStorageService.signOut();
      this.auth.signOut();
      this.router.navigateByUrl('/home');
    }

}
