import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn:'root'
})
export class HasSessionGuard implements CanActivateChild{
  constructor(
    private router: Router, 
    private cookie: CookieService
    ){}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const session = this.cookie.get('session');
    let dataUser;
    if(!!session){
      dataUser = JSON.parse(atob(session != undefined ? session : '')); 
    }
    if(!dataUser?.hasSession){
      this.router.navigate(['/sign-in']);
    }
    return !!dataUser?.hasSession;
  }
}