import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalAlertService } from '../swal-alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from '../../interfaces/city/response-model';
import { EquipmentType } from '../../interfaces/equipmentTypes/equipmenTypes';



@Injectable({
  providedIn: 'root'
})
export class EquipmentTypesService {

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

  getCityData(): Observable<ResponseModel<EquipmentType[]>> {
    const headers = this.getHeaders();

    return this.http.get<ResponseModel<EquipmentType[]>>(`${this.urlBase}api/EquipmentTypes`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteEquipmentById(equimentId: number): Observable<any> {
    const headers = this.getHeaders();

    return this.http.delete<any>(`${this.urlBase}api/EquipmentTypes/${equimentId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEquipmentName(equipmentId: number, newName: string, newDescription:string): Observable<ResponseModel<EquipmentType>> {
    const headers = this.getHeaders();
  
    const updateData = {
      name : newName,
      description : newDescription
    };
  
    return this.http.put<ResponseModel<EquipmentType>>(`${this.urlBase}api/EquipmentTypes/${equipmentId}`, updateData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  registerNewEquipment(equipmentData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.urlBase}api/EquipmentTypes/`, equipmentData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

}
