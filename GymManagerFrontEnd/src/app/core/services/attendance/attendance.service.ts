import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalAlertService } from '../swal-alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from '../../interfaces/response-model';
import { Attendance } from '../../interfaces/attendance/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient,
    private alertS: SwalAlertService,
    private cookie: CookieService
  ) { }

  urlBase: string = 'https://localhost:44308/';
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

  private getHeaders(): HttpHeaders {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });
    return headers;
  }
  getAttendanceWithoutMemberOut(): Observable<ResponseModel<Attendance[]>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<Attendance[]>>(`${this.urlBase}api/Attendance/withoutExit`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getAttendanceToday(): Observable<ResponseModel<Attendance[]>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<Attendance[]>>(`${this.urlBase}api/Attendance/today`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAttendanceWithoutExit(): Observable<ResponseModel<Attendance[]>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<Attendance[]>>(`${this.urlBase}api/Attendance/withoutExit`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAttendanceData():Observable<ResponseModel<Attendance[]>>{
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<Attendance[]>>(`${this.urlBase}api/Attendance`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  registerMemberIn(id:number):Observable<ResponseModel<Attendance>>{
    const headers = this.getHeaders();

    return this.http.post<ResponseModel<Attendance>>(`${this.urlBase}api/Attendance/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  registerMemberOut(id:number):Observable<ResponseModel<Attendance>>{
    const headers = this.getHeaders();

    return this.http.put<ResponseModel<Attendance>>(`${this.urlBase}api/Attendance/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      ); 
    }
    deleteAttendanceById(id:number):Observable<any>{
      const headers = this.getHeaders();
  
      return this.http.delete<any>(`${this.urlBase}api/Attendance/${id}`, { headers })
        .pipe(
          catchError(this.handleError)
        );
    }
  }
