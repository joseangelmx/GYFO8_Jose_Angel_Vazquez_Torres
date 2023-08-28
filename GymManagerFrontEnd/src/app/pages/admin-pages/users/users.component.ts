import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];
  display: string= "none";
  loading!: boolean;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true; // Enable loading
    this.accountService.getProtectedUserData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.users = response.model;
          this.loading = false; // Disable loading
        } else {
          console.error('Error fetching protected data:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching protected data', error);
      }
    );
  }


  deleteUser(userId: any): void {
    // Show a Swal alert to confirm deletion
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion
        this.accountService.deleteUser(userId).subscribe(
          (response) => {
            if (!response.hasError) {
              // Remove the user from the list
              this.users = this.users.filter(user => user.id !== userId);
            } else {
              console.error('Error deleting user:', response.message);
            }
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      }
    });
  }
  


  openModal(){
    const myModal = document.getElementById('myModal');
    if(myModal!=null){
      myModal.classList.add('show');
      myModal.style.display = 'block';
    }
  }
}
