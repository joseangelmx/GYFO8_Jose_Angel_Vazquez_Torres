import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalAlertService } from '../swal-alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from '../../interfaces/response-model';
import { Members } from '../../interfaces/members/members';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

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

  getMembersData(): Observable<ResponseModel<Members[]>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<Members[]>>(`${this.urlBase}api/Members`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteMember(id: number): Observable<ResponseModel<Members>> {
    const headers = this.getHeaders();

    return this.http.delete<ResponseModel<Members>>(`${this.urlBase}api/Members/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  registerNewMember(member: any): Observable<ResponseModel<Members>> {
    const headers = this.getHeaders();
    const requestData = {
      name: member.name,
      lastName: member.lastName,
      birthDay: member.birthDay,
      email: member.email,
      allowNewsLetter: member.allowNewsLetter,
      registeredOn: member.registeredOn,
      membershipEnd: member.membershipEnd,
      cityId: member.cityId,
      membershipTypeId: member.membershipTypeId
    };
    return this.http.post<ResponseModel<Members>>(`${this.urlBase}api/Members`, requestData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getMemberById(id: number): Observable<ResponseModel<Members>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<Members>>(`${this.urlBase}api/Members/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  updateMember(member: Members): Observable<ResponseModel<Members>> {
    const headers = this.getHeaders();
    const requestData = {
      name: member.name,
      lastName: member.lastName,
      birthDay: member.birthDay,
      email: member.email,
      allowNewsLetter: member.allowNewsLetter,
      registeredOn: member.registeredOn,
      membershipEnd: member.membershipEnd,
      cityId: member.cityId,
      membershipTypeId: member.membershipTypeId
    };
    return this.http.put<ResponseModel<Members>>(`${this.urlBase}api/Members/${member.id}`, requestData, { headers })
      .pipe(
        catchError(this.handleError)
      );
     }
}
