import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ConnectedPartners} from "../../model/ConnectedPartners";
import {HttpClient} from "@angular/common/http";

const BASIC_URL = "http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class PartnerChatService {

  constructor(private http: HttpClient) { }

    getConnectedUsers(partnerId: number): Observable<ConnectedPartners[]> {
        console.log("Connected users detail:",)
        return this.http.get<any>(`${BASIC_URL}api/connections/users/${partnerId}`);
    }
}
