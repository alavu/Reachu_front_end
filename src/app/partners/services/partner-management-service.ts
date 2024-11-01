import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environment';

const BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class PartnerManagementService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
      let authHeaders: HttpHeaders = new HttpHeaders();
      return authHeaders.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token') // Adjust according to your token storage
      );
  }

  getAllPartners(): Observable<any> {
      return this.http.get<any>(`${BASE_URL}/api/partners/list`, {
          // headers: this.createAuthorizationHeader()
      });
  }

  blockPartner(userId: string): Observable<any> {
      return this.http.put<any>(`${BASE_URL}/api/partners/block/${userId}`, {}, {
          // headers: this.createAuthorizationHeader()
      });
  }

  unblockPartner(userId: string): Observable<any> {
      return this.http.put<void>(`${BASE_URL}/api/partners/unblock/${userId}`, {}, {
          // headers: this.createAuthorizationHeader()
      });
  }

    verifyPartner(userId: string) {
        return this.http.put<void>(`${BASE_URL}/api/partners/verify-partner/${userId}`, {});
    }

    rejectPartner(userId: string, reason: string): Observable<any> {
        return this.http.put(`${BASE_URL}/api/partners/reject-partner/${userId}`, { rejectionReason: reason }).pipe(
          tap(() => console.log(`Partner ${userId} rejected with reason: ${reason}`)),
          catchError((error) => {
            console.log(error);
            return throwError(() => new Error(error.message));
          })
        );
      }


}
