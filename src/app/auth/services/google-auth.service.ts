
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private googleLoginStatusSubject = new BehaviorSubject<boolean>(false);
  googleLoginStatus$ = this.googleLoginStatusSubject.asObservable();

  updateGoogleLoginStatus(status: boolean): void {
    this.googleLoginStatusSubject.next(status);
  }
}
