import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalAlertService } from '../swal-alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { City } from '../../interfaces/city/city';
import { ResponseModel } from '../../interfaces/city/response-model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

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

  getCityData(): Observable<ResponseModel<City[]>> {
    const session = this.cookie.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${session}`
    });

    return this.http.get<ResponseModel<City[]>>(`${this.urlBase}api/City`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCityById(cityId: number): Observable<any> {
    const headers = this.getHeaders();

    return this.http.delete<any>(`${this.urlBase}api/City/${cityId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  registerNewCity(cityData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.urlBase}api/City`, cityData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCityName(cityId: number, newName: string): Observable<ResponseModel<City>> {
    const headers = this.getHeaders();
  
    const updateData = {
      name: newName
    };
  
    return this.http.put<ResponseModel<City>>(`${this.urlBase}api/City/${cityId}`, updateData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

}
