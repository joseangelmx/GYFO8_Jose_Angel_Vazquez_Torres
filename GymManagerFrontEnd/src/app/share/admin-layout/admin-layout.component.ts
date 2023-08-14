import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/core/services/account.service';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements AfterViewInit{
  constructor(
    private renderer: Renderer2,
    private cookie : CookieService,
    private router:Router,
    private Service: AccountService
    ){ }

  ngAfterViewInit(): void {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    if (sidebarCollapse) {
      sidebarCollapse.addEventListener('click', () => {
        if (sidebar) {
          sidebar.classList.toggle('active');
        }
      });
    }

  }
  toggleSubmenu(event: any) {
    event.preventDefault();
    const submenu = event.target.nextElementSibling;

    if (submenu) {
        if (submenu.classList.contains('show')) {
            this.renderer.removeClass(submenu, 'show');
        } else {
            this.renderer.addClass(submenu, 'show');
        }
    }
}
signOut(){
  this.cookie.deleteAll();
  this.router.navigate(['/sign-in']);
}
getData(){
  this.Service.getProtectedData();
  
}


  }



