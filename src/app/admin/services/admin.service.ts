import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


    constructor(private http: HttpClient) { }

        postService(adDTO:any): Observable<any>{
            const userId = UserStorageService.getUserId();
            console.log("User Id is:",userId );
            return this.http.post(BASIC_URL + `api/admin/ad/${userId}`, adDTO, {
            // headers : this.createAuthorizationHeader()
            })
        }

    getAllAdsByUserId(): Observable<any>{
        const userId = UserStorageService.getUserId();
        return this.http.get(BASIC_URL + `api/admin/ads`, {
            // headers : this.createAuthorizationHeader()
        })
    }

    getAdById(adId:any): Observable<any>{
        return this.http.get(BASIC_URL + `api/admin/ad/${adId}`, {
            // headers : this.createAuthorizationHeader()
        })
    }

    updateAd(adId:any, adDTO:any): Observable<any>{
        return this.http.put(BASIC_URL + `api/admin/ad/${adId}`, adDTO, {
            // headers : this.createAuthorizationHeader()
        })
    }

    deletedAd(adId:any): Observable<any>{
        return this.http.delete(BASIC_URL + `api/admin/ad/${adId}`, {
            // headers : this.createAuthorizationHeader()
        })
    }

    getAllAdBookings(): Observable<any>{
        const adminId = UserStorageService.getUserId();
        return this.http.get(BASIC_URL + `api/admin/bookings/${adminId}`, {
            // headers : this.createAuthorizationHeader()
        })
    }

    changeBookingStatus(bookingId: number, status: string): Observable<any>{

        return this.http.get(BASIC_URL + `api/admin/booking/${bookingId}/${status}`, {
            // headers : this.createAuthorizationHeader()
        })
    }

    getAllCategories(): Observable<any> {
        return this.http.get(BASIC_URL + 'api/admin/categories',{
            // headers: this.createAuthorizationHeader()
        })
    }

    getTotalOrders(): Observable<any>  {
        return this.http.get<any>(BASIC_URL+ 'api/admin/dashboard/total-orders', {
        })
    }

    getTotalCustomers(): Observable<any> {
        return this.http.get<any>(BASIC_URL+ 'api/admin/dashboard/total-customers', {
        })
    }

    getTotalRevenue(): Observable<any>  {
       return this.http.get<any>(BASIC_URL+ 'api/admin/dashboard/total-revenue', {
        })
    }

    getTotalBookings(): Observable<any>  {
        return this.http.get<any>(BASIC_URL+ 'api/admin/dashboard/total-bookings', {
        })
    }
}

