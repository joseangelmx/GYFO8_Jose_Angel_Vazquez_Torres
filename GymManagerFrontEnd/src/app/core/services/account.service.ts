import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User, signIn } from '../interfaces/user';
import {catchError} from 'rxjs/operators';
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
  }
  constructor(private http:HttpClient) { 
  }
  errorHandler(error:HttpErrorResponse){ 
    let errorMessage = `Error Code: ${error.status}`;
    if(error.status!=200){
      errorMessage = `${errorMessage} \n message: ${error.error.message}`;
    }
    if(error.error.hasError && error.status ==200){
      errorMessage = `message: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
  SignIn(request:signIn) : Observable<ResponseModel<any>>{
    let url:string = `${this.urlBase}api/account`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }
  SignUp(request:User) : Observable<ResponseModel<any>>{
    let url:string = `${this.urlBase}api/users`;
    return  this.http.post <ResponseModel<any>>(url, request, this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }
}
