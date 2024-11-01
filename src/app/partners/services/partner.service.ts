import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Partner } from 'src/app/model/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private apiUrl = 'http://localhost:8080/api/partners';

  constructor(private http: HttpClient) { }

 // Fetch partner details by ID
 getPartnerById(id: number): Observable<Partner> {
  return this.http.get<Partner>(`${this.apiUrl}/${id}`);
  }

  //  // Method to update partner profile details
  //  updatePartnerProfile(partnerId: number, profileData: any): Observable<any> {
  //   const url = `${this.apiUrl}/partners/${partnerId}/profile`;
  //   return this.http.put(url, profileData).pipe(
  //     catchError(this.handleError)
  //   );
  // }

    // Method to update partner profile picture
    // updatePartnerProfilePicture(partnerId: number, imageUrl: string): Observable<any> {
    //   const url = `${this.apiUrl}/partners/${partnerId}/profile-picture`;
    //   const body = { profilePictureUrl: imageUrl };
    //   return this.http.put(url, body).pipe(
    //     catchError(this.handleError)
    //   );
    // }

    updatePartner(partnerId: string, partnerData: FormData) {
      return this.http.put(`${this.apiUrl}/${partnerId}`, partnerData, {
      });
    }

    getDashboardStats(partnerId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${partnerId}/stats`);
    }

    getGraphData(period: string): Observable<any> {
      return this.http.get(`/api/partner/dashboard/graph?period=${period}`);
    }




      // Error handling function
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

}
