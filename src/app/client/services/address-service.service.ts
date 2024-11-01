// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { Address } from "src/app/company/model/Address";

// const BASIC_URL = "http://localhost:8080/api/addresses/";

// @Injectable({
//   providedIn: 'root'
// })
// export class AddressServiceService {  

//   constructor(private http: HttpClient) {}

//   getAddresses(userId: number): Observable<Address[]> {
//     // return this.http.get<Address[]>(BASIC_URL + `api/addresses?userId=${userId}`);
//     return this.http.get<Address[]>(BASIC_URL + `api/addresses`);
//   }

  // addAddress(address: Address): Observable<Address> {
  //   console.log("Address new", address);
  //   if (!address.details || address.details.trim() === '') {
  //     throw new Error('Address details cannot be empty');
  //   }  
  //   return this.http.post<Address>(BASIC_URL + `add-address`, address);
  // }

//   addAddress(address: Address): Observable<Address> {
//     console.log("Added before",address )
//     if (!address.details || address.details.trim() === '') {
//         console.log("Sending address:", address);
//         throw new Error('Address details cannot be empty');
//     }

//     const url = `${BASIC_URL}add-address`;
//     return this.http.post<Address>(url, address);
// }

  

  // updateAddress(id: number, address: Address): Observable<Address> {
  //   return this.http.put<Address>(BASIC_URL + `api/addresses/${id}?userId=${address.userId}`, address);
  // }

  // updateAddress(id: number, address: Address): Observable<Address> {
  //   const url = `${BASIC_URL}/${id}`;
  //   return this.http.put<Address>(url, address);
  // }
//   updateAddress(id: number, address: Address): Observable<Address> {
//     const url = `${BASIC_URL}addresses/${id}`;
//     return this.http.put<Address>(url, address);
//   }
  
//   deleteAddress(id: number, userId: number): Observable<void> {
//     return this.http.delete<void>(BASIC_URL + `api/addresses/${id}?userId=${userId}`);
//   }
// }

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Address } from "src/app/company/model/Address";

const BASIC_URL = "http://localhost:8080/api/";

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {  
  constructor(private http: HttpClient) {}

  getAddresses(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${BASIC_URL}addresses?userId=${userId}`);
  }

  addAddress(address: Address): Observable<Address> {
    const url = `${BASIC_URL}addresses`;
    return this.http.post<Address>(url, address, { observe: 'response' }).pipe(
      map(response => {
        console.log('Raw response:', response);
        if (response.body) {
          return response.body;
        } else {
          throw new Error('No address returned from server');
        }
      }),
      catchError(error => {
        console.error('Error occurred while adding address:', error);
        return throwError(() => new Error('Failed to add address'));
      })
    );
  }
  

  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${BASIC_URL}addresses/${id}`, address);
  }

  deleteAddress(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}addresses/${id}?userId=${userId}`);
  }
}

