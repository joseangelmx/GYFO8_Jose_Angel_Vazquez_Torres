import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  constructor() { }
  errorAlert(description:string,title:string ){
    return Swal.fire({
      title: title,
      text: description,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#031a3d'
    })
  }
}
