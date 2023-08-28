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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = `Error Code: ${error.status}`;

    if (error.status == 404) {
      this.alertS.errorAlert('Sorry, error detected, please try again later', 'Unexpected Error!');
    }
    if (error.error.hasError && error.status == 200) {
      errorMessage = `Message: ${error.error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  signIn(request: signIn): Observable<ResponseModel<any>> {
    const url: string = `${this.urlBase}api/account`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions).pipe(catchError(this.handleError));
  }

  signUp(request: User): Observable<ResponseModel<any>> {
    const url: string = `${this.urlBase}api/users`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions).pipe(catchError(this.handleError));
  }

  getProtectedUserData(): Observable<ResponseModel<User[]>> {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });
  
    return this.http.get<ResponseModel<User[]>>(`${this.urlBase}api/users`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserById(id: any): Observable<ResponseModel<User[]>> {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });
  
    return this.http.get<ResponseModel<User[]>>(`${this.urlBase}api/users/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(userId: any): Observable<ResponseModel<any>> {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });

    const url: string = `${this.urlBase}api/users/${userId}`;
    return this.http.delete<ResponseModel<any>>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  editUser(user: User): Observable<ResponseModel<any>> {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });
  
    const url: string = `${this.urlBase}api/Users/${user.id}`; // Assuming 'id' is a property of the User object
    return this.http.put<ResponseModel<any>>(url, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
