import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// export class UserDataService {

//   private userEmail : string | null = null;

//   setEmail(email: string){
//     this.userEmail = email;
//   }

//   getEmail(): string | null{
//     return this.userEmail;
//   }
// }
export class UserDataService {

  private emailKey: string = 'userEmail';

  setEmail(email: string){
    localStorage.setItem(this.emailKey, email);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }
}
