import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080'; // Your backend URL

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  authenticateUser(data: any) {
    return this.http.post(this.apiUrl + '/authenticate', data, { headers: this.getHeaders(), withCredentials: true });
  }
}
