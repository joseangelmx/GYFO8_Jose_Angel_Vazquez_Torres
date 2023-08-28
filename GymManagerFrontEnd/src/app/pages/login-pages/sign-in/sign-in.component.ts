import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/core/interfaces/response-model';
import { signIn,SignInResponseModel } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent{
  constructor (
    private login:AccountService,
    private router:Router,
    private alertS: SwalAlertService,
    private cookieService: CookieService
    ) { 
     }
    accessToken: any;
  respForm(request:signIn){
    this.login.signIn(request).subscribe((response) =>{
      if(response.hasError){
        this.alertS.errorAlert('Incorrect username or password, please verify your credentials', 'Error!');
    }
      if(response.message ==='Authorized'){
        environment.hasSession = true;
        if (response.model && response.model.accessToken) {
          const session = {...response.model,hasSession:true};
          let objTemp = btoa(JSON.stringify(session));
          this.accessToken = response.model.accessToken;
          this.cookieCreate('session',objTemp);
          this.cookieCreate('accessToken',this.accessToken);
        }
        this.router.navigate(['/home']);
      }
    },(error:any)=> {
      this.alertS.errorAlert('Servicio no disponible por el momento, favor de contactar con el administrador','Lo sentimos')
    });  
  }
  cookieCreate(title: string,value: string) {
    const now = new Date();
    
    const expirationDate = new Date(now.getTime() + 720 * 60000);
    
    this.cookieService.set(title, value, expirationDate);
  }


}
