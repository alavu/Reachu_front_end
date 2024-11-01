import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs'
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  private isRefreshing = false;

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = UserStorageService.getToken();
        let authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !this.isRefreshing) {
                    this.isRefreshing = true;
                    return this.authService.refreshToken().pipe(
                        switchMap((newTokens) => {
                            this.isRefreshing = false;
                            const newAuthReq = req.clone({
                                setHeaders: {
                                    Authorization:`Bearer ${newTokens.accessToken}`
                                }
                            });
                            return next.handle(newAuthReq);
                        }),
                        catchError((refreshError) => {
                            this.isRefreshing = false;
                            this.authService.logout(); // Optional: Log out if the refresh token fails
                            return throwError(() => new Error(refreshError));
                        })
                    );
                }
                return throwError(() => new Error(error.message));
            })
        );
    }
}
