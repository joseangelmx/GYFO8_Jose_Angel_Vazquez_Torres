import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalAlertService } from '../swal-alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from '../../interfaces/response-model';
import { MembershipType } from '../../interfaces/membershiptypes/membershiptypes';

@Injectable({
  providedIn: 'root'
})
export class MembershipTypesService {

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
  updateMembershipType(membershipTypeData: any): Observable<ResponseModel<MembershipType>> {
    const headers = this.getHeaders();
    const requestData = {
      name: membershipTypeData.name,
      cost: membershipTypeData.cost,
      createOn: membershipTypeData.createOn,
      duration: membershipTypeData.duration,
    };
    return this.http.put<ResponseModel<MembershipType>>(`${this.urlBase}api/MembershipTypes/${membershipTypeData.id}`, requestData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  registerNewMembershipType(newMembershipTypeData: any): Observable<ResponseModel<MembershipType>> {
    const headers = this.getHeaders();

    return this.http.post<ResponseModel<MembershipType>>(`${this.urlBase}api/MembershipTypes`, newMembershipTypeData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getMembershipData(): Observable<ResponseModel<MembershipType[]>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<MembershipType[]>>(`${this.urlBase}api/MembershipTypes`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getMembershipDataById(id: number): Observable<ResponseModel<MembershipType>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<MembershipType>>(`${this.urlBase}api/MembershipTypes/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteMembershipById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.urlBase}api/MembershipTypes/${id}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }
}