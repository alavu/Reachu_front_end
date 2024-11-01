/*
import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStoargeService {

  constructor() { }

  public saveToken(token : string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user === null){return '';}
    return user.userId;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user === null){return '';}
    return user.role;
  }

  static isClientLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role ==  'CLIENT';
  }

  public static isCompanyLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role ==  'ADMIN';
  }

    static isPartnerLoggedIn(): boolean{
        if(this.getToken() === null){
            return false;
        }
        const role: string = this.getUserRole();
        return role ==  'PARTNER';
    }

  public static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
*/

import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';
const USER_ID = 's_user_id';
const REFRESH_TOKEN = 'refreshToken';
const PARTNER = 's_partner';
const PARTNER_ID = 's_partner_id';
const RESERVATION_ID = 's_reservation_id';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  static router: any;
  private static adData: any;

  constructor() { }

  public static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public static saveRefreshToken(refreshToken: string): void {
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public static getRefreshToken(): string {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    return refreshToken ? refreshToken : '';
  }

  public static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
    if (user && user.id) {
      window.localStorage.setItem(USER_ID, user.id.toString());
    }
  }

  static getUser(): any {
    console.log(localStorage.getItem(USER));
    return JSON.parse(localStorage.getItem(USER));

  }

  static getPartner(): any {
    console.log(localStorage.getItem(PARTNER));
    return JSON.parse(localStorage.getItem(PARTNER));

  }

 public static getUserId(): any {
    const user = this.getUser();
    console.log("User is----------", user);
    return user ? user.userId : '';
    // return localStorage.getItem(USER_ID) || '';  // Fetch the user ID from local storage
  }

  public static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  public static isUserLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    console.log("USER ROLE:", role)
    return token !== '' && role === 'CLIENT';
  }

  public static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    console.log("Token", token);
    const role = this.getUserRole();
    console.log("Roles", role);
    return token !== '' && role === 'ADMIN';
  }

  public static isPartnerLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    console.log("PARTNER ROLE:", role)
    return token !== '' && role === 'PARTNER';
  }

  static setAdData(ad: any): void {
    this.adData = ad;
  }

  static getAdData(): any {
    return this.adData;
  }

  // public static isGoogleLogin(): boolean {
  //   const googleLoginState = localStorage.getItem("GOOGLE_LOGIN");
  //   return googleLoginState ? JSON.parse(googleLoginState) : false;
  // }

  public static signOut(): void {
    console.log('Signing out...');
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(PARTNER);
    console.log('Token and user data removed.');
    sessionStorage.removeItem('s_token');
    sessionStorage.removeItem('s_user');
    sessionStorage.removeItem('s_partner')
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(PARTNER_ID)
    sessionStorage.clear();
  }

  // Clear user details
  static clearUser(): void {
    localStorage.removeItem(USER);
  }

   // Clear user partner
   static clearPartner(): void {
    localStorage.removeItem(PARTNER);
  }

  // Clear token
  static clearToken(): void {
    localStorage.removeItem(TOKEN);
  }

  // Clear Google login state
  static clearGoogleLoginState(): void {
    localStorage.removeItem("GOOGLE_LOGIN");
  }

  public static saveReservationId(reservationId: string): void {
    window.localStorage.removeItem(RESERVATION_ID);
    window.localStorage.setItem(RESERVATION_ID, reservationId);
}

public static getReservationId(): string {
    return localStorage.getItem(RESERVATION_ID) || '';
}

}
// if not working uncommet this
// public static getToken(): string {
//   const token = localStorage.getItem(TOKEN);
//   console.log('Retrieved token from local storage:', token); // Log for debugging
//   // return token ? token : '';
//   return token || '';
// }