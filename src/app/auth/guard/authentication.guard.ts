import { CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../services/user-stoarge.service';
import {inject} from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

export const AuthenticationGuard: CanActivateFn = (route, state) => {

  const expectedRoles: string[] = route.data['roles'] || [];
    const userRole: string | null = UserStorageService.getUserRole();

    console.log("User role is : " + userRole);
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);


    if (userRole && expectedRoles.includes(userRole)) {
        return true;
    } else {
        router.navigateByUrl('/login');
        snackBar.open("Unauthorized access!", "Close", {duration: 500})
        return false;
    }
};
