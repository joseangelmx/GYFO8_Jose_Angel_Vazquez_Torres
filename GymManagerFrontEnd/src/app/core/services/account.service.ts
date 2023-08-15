import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SwalAlertService } from './swal-alert.service';
import { User, signIn } from '../interfaces/user';
import { ResponseModel } from '../interfaces/response-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  urlBase: string = 'https://localhost:44308/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private alertS: SwalAlertService,
    private cookie: CookieService
  ) {}

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = `Error Code: ${error.status}`;

    if (error.status == 404) {
      this.alertS.errorAlert('Lo sentimos, error detectado, favor de validar más tarde', 'Error inesperado!');
    }
    if (error.error.hasError && error.status == 200) {
      errorMessage = `Message: ${error.error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  SignIn(request: signIn): Observable<ResponseModel<any>> {
    const url: string = `${this.urlBase}api/account`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  SignUp(request: User): Observable<ResponseModel<any>> {
    const url: string = `${this.urlBase}api/users`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getProtectedUserData(): Observable<ResponseModel<User[]>> {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });
  
    return this.http.get<ResponseModel<User[]>>(`${this.urlBase}api/users`, { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
}
