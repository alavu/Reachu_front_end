import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UserStorageService } from './user-stoarge.service';
import { StatusResponse } from 'src/app/model/status-response.model';

const BASIC_URL = 'http://localhost:8080/';
export const AUTH_HEADER = 'authorization';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    router: any;
    // private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    registerClient(signupRequestDTO: any): Observable<any> {
        return this.http.post(BASIC_URL + "client/sign-up", signupRequestDTO);
    }

    registerPartner(signupRequestDTO: any): Observable<any> {
        console.log('signup Dto', signupRequestDTO)
        return this.http.post(BASIC_URL + "partner/sign-up", signupRequestDTO);
    }

    login(username: string, password: string) {
        // return this.http.post(BASIC_URL + "authenticate", { username, password }, { observe: 'response' })
        //     .pipe(
        //         map((res: HttpResponse<any>) => {
        //             console.log(res.body)
        //             UserStorageService.saveUser(res.body);
        //             const tokenLength = res.headers.get(AUTH_HEADER)?.length;
        //             const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
        //             console.log(bearerToken);
        //             UserStorageService.saveToken(bearerToken);
        //             return res;
        //         })
        //     );

        return this.http.post(BASIC_URL + "authenticate", { username, password }, { observe: 'response' })
            .pipe(
                map((res: HttpResponse<any>) => {
                    const user = res.body;
                    console.log(user);
                    UserStorageService.saveUser(user);  // Save user and userId
                    const tokenLength = res.headers.get(AUTH_HEADER)?.length;
                    const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
                    console.log(bearerToken);
                    UserStorageService.saveToken(bearerToken);
                    return res;
                })
            );
    }

    isUserlogin(loginRequest: any): Observable<any> {

        console.log("Login req:", loginRequest);
        return this.http.post(`${BASIC_URL}authenticate`, loginRequest).pipe(
            tap((response: any) => {
                if (response.blocked) {
                    // If the partner is blocked, show an appropriate message and do not proceed
                    throw new Error('User is blocked');
                }
                if (response.token) {
                    UserStorageService.saveToken(response.token);
                    UserStorageService.saveUser(response.user);
                }
            }),
            catchError((error) => {
                console.log(error)
                return throwError(() => new Error(error));
            })
        );
    }

    adminLogin(loginRequest: any): Observable<any> {
        console.log("Login req:", loginRequest);
        return this.http.post(`${BASIC_URL}authenticate`, loginRequest).pipe(
            tap((response: any) => {
                if (response.token) {
                    UserStorageService.saveToken(response.token);
                    UserStorageService.saveUser(response.user);
                }
            }),
            catchError((error) => {
                console.log(error)
                return throwError(() => new Error(error));
            })
        );
    }

    isPartnerlogin(loginRequest: any): Observable<any> {

        console.log("Login req:", loginRequest);
        return this.http.post(`${BASIC_URL}authenticate`, loginRequest).pipe(
            tap((response: any) => {
                console.log("Log in response", response)
                if (response.blocked) {
                    // If the partner is blocked, show an appropriate message and do not proceed
                    throw new Error('Partner is blocked');
                }

                // Check if the partner is verified before allowing login
                if (!response.verified) {
                    throw new Error('Partner is not verified');
                }

                // If the partner is rejected, show an appropriate message
                if (response.rejected) {
                    throw new Error('Partner is rejected by admin');
                }

                if (response.token) {
                    UserStorageService.saveToken(response.token);
                    UserStorageService.saveUser(response.partner);
                }
            }),
            catchError((error) => {
                console.log(error)
                return throwError(() => new Error(error.message));
            })
        );
    }

    verifyAccount(token: string): Observable<any> {
        localStorage.removeItem('userEmail');
        const url = `${BASIC_URL}activate-account?token=${token}`;
        console.log("The url is:" + url);
        return this.http.get(url);
    }

    resendActivationCode(email: string): Observable<any> {
        const url = `${BASIC_URL}resend-activation-code?email=${email}`;
        console.log("The url is:" + url);
        return this.http.get(url);
    }


    googleLogin(data: any): Observable<any> {
        console.log(data, "passing data...");
        return this.http.post(`${BASIC_URL}api/auth/google-login`, data);
    }

    checkGoogleLogin(): Observable<StatusResponse> {
        return this.http.get<StatusResponse>(`${BASIC_URL}api/auth/check-google-login`);
    }

    signOut() {
        return this.http.get(`${BASIC_URL}logout`);
    }

    logout() {
        this.http.get(`${BASIC_URL}logout`).subscribe(() => {
            UserStorageService.clearUser();
            UserStorageService.clearToken();
            this.router.navigate(['home']); // Ensure `navigate` is properly used
        });
    }

    refreshToken(): Observable<any> {
        const refreshToken = UserStorageService.getRefreshToken(); // Use the correct method to get the refresh token
        const body: RefreshResponse = { refreshToken: refreshToken };

        return this.http.post<AuthResponse>(`${BASIC_URL}/refresh`, body).pipe(
            tap((response: AuthResponse) => {
                console.log("Access token", response.accessToken);
                console.log("Refresh token", response.refreshToken);
                UserStorageService.saveToken(response.accessToken); // Save the access token
                UserStorageService.saveRefreshToken(response.refreshToken); // Save the refresh token
            })
        );
    }

    sendRoomIdToEmail(roomId: string, email: string): Observable<any> {
        const emailData = { roomId, email };
        console.log("sendToommto temil passsing...",roomId,email)
        return this.http.post<any>(`${BASIC_URL}common/sentRoomidToEmail`, emailData);
    }
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshResponse {
    refreshToken: string;
}
