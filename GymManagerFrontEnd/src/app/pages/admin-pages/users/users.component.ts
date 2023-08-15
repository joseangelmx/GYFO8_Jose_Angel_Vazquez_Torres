import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  users: User[] = [];

  constructor (private accountService: AccountService) { }
  ngOnInit(): void {
    this.accountService.getProtectedUserData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.users = response.model;
          console.log(response.model)
        } else {
          console.error('Error al obtener datos protegidos:', response.message);
        }
      },
      (error) => {
        console.error('Error al obtener datos protegidos', error);
      }
    );
  }
}
