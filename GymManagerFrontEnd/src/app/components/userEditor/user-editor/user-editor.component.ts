import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent {
  constructor(
    private login:AccountService,
    private router: Router
  ){

  }
  onCloseHandled() {
    const myModal = document.getElementById('myModal');
    if(myModal!=null){
      myModal.classList.remove('show');
      myModal.style.display = 'none';
    }
  }
  respForm(response:User){
    const myModal = document.getElementById('myModal');
    let request = {...response}
    this.login.signUp(request).subscribe(()=>     
    this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/users');
    }));
    if(myModal!=null){
      myModal.classList.remove('show');
      myModal.style.display = 'none';
    }

  }
}
