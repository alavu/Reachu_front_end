import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment";

const BASE_URL = environment.apiBaseUrl;

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    constructor(private http: HttpClient) { }

    private createAuthorizationHeader(): HttpHeaders {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
            'Authorization',
            'Bearer ' + localStorage.getItem('token') // Adjust according to your token storage
        );
    }
    // getAllUsers(): Observable<any[]> {
    //     return this.http.get<any[]>(`${BASE_URL}/api/users/list`, {
    //         // headers: this.createAuthorizationHeader()
    //     });
    // }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/api/admin/list`, {
            // headers: this.createAuthorizationHeader()
        });
    }

    blockUser(userId: string): Observable<any> {
        return this.http.put<any>(`${BASE_URL}/api/users/block/${userId}`, {}, {
            // headers: this.createAuthorizationHeader()
        });
    }

    unblockUser(userId: string): Observable<any> {
        return this.http.put<void>(`${BASE_URL}/api/users/unblock/${userId}`, {}, {
            // headers: this.createAuthorizationHeader()
        });
    }
}
