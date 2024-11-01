import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserStorageService} from 'src/app/auth/services/user-stoarge.service';
import {PaymentUpdateRequest} from "../../model/PaymentUpdateRequest";
import {ConnectedPartners} from "../../model/ConnectedPartners";
import {ReservationDTO} from "../../model/ReservationDTO";

const BASIC_URL = "http://localhost:8080/";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

    constructor(private http: HttpClient) {
    }

    getAllAds(): Observable<any> {
        return this.http.get(BASIC_URL + `api/client/ads`, {
            headers: this.createAuthorizationHeader()
        })
    }

    searchAdByName(name: any): Observable<any> {
        console.log('API Call to:', `/search/${name}`);
        return this.http.get(BASIC_URL + `api/client/search/${name}`, {
            headers: this.createAuthorizationHeader()
        })
    }

    getAdDetailsByAdId(adId: any): Observable<any> {
        return this.http.get(BASIC_URL + `api/client/ad/${adId}`, {
            headers: this.createAuthorizationHeader()
        })
    }

    getPartnersByService(service: string): Observable<any> {
        return this.http.get(BASIC_URL + `api/partners/byService/${service}`, {
            headers: this.createAuthorizationHeader()
        })
    }


    bookService(bookDTO: any): Observable<any> {
        return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
            headers: this.createAuthorizationHeader()
        })
    }

    getMyBookings(): Observable<any> {
        const userId = UserStorageService.getUserId();
        return this.http.get(BASIC_URL + `api/client/my-bookings/${userId}`, {
            headers: this.createAuthorizationHeader()
        })
    }

    updateReservationPayment(reservationId: string, paymentDetails: PaymentUpdateRequest): Observable<any> {
        console.log("reservation id sending in backend", reservationId)
        return this.http.put(`${BASIC_URL}api/client/${reservationId}/payment`, paymentDetails);
    }

    giveReview(reviewDTO: any): Observable<any> {
        return this.http.post(BASIC_URL + `api/client/review`, reviewDTO, {
            headers: this.createAuthorizationHeader()
        })
    }

    createAuthorizationHeader(): HttpHeaders {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
            'Authorization',
            'Bearer ' + UserStorageService.getToken()
        )
    }

    authenticateWithGoogle(token: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.googleUserInfoUrl, {headers});
    }


    getConnectedPartners(userId: number): Observable<ConnectedPartners[]> {
        console.log("Connected partner detail:",)
        return this.http.get<any>(`${BASIC_URL}api/connections/partners/${userId}`);
    }

    connectUserWithPartner(userId: number, partnerId: number): Observable<any> {
        return this.http.post(`${BASIC_URL}api/connections/connect/${userId}/${partnerId}`, {
            headers: this.createAuthorizationHeader()
        });
    }

    getBookings(status: string, startDate: string, endDate: string): Observable<ReservationDTO[]> {
        const params = new HttpParams()
            .set('status', status)
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<any[]>(`${BASIC_URL}api/client/bookings`, { params });
    }

    // Fetch customers who have booked service.
    getBookingCustomers(): Observable<ReservationDTO[]> {
        return this.http.get<ReservationDTO[]>(`${BASIC_URL}api/client/customer/bookings`)
    }

    // Method to update booking status
    updatePartnerJobStatus(partnerId: any, statusUpdate: {jobStatus: string, startDate: string, endDate: string}): Observable<any> {
        console.log("partnerId:",partnerId)
        return this.http.put<any>(`${BASIC_URL}api/partners/partners/${partnerId}/status`, statusUpdate);
    }

    // updatePartnerJobStatus(id: number, statusUpdate: { jobStatus: string, startDate?: string, endDate?: string }): Observable<any> {
    //     const url = `${BASIC_URL}api/partners/partners/${id}/status`;
    //     return this.http.put(url, statusUpdate);
    // }

}
