import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembershipType } from 'src/app/core/interfaces/membershiptypes/membershiptypes';
import { MembershipTypesService } from 'src/app/core/services/membershipTypes/membership-types.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membership-types',
  templateUrl: './membership-types.component.html',
  styleUrls: ['./membership-types.component.scss']
})
export class MembershipTypesComponent implements OnInit{
  membershipTypes: MembershipType[] = [];
  noRecordsMessage!: string;
  newMembershipTypeForm: FormGroup;
  editMembershipTypeForm: FormGroup;
  idEditMembership!: number;
  editMembershipTypeName!: string;
  editMembershipTypeDuration!: number;
  editMembershipTypeCost!: number;
  loading!: boolean;
  constructor(
    private membershipTypesService: MembershipTypesService,
    private formBuilder: FormBuilder,
  ) { 

    this.newMembershipTypeForm = this.formBuilder.group({
      newMembershipTypeName: ['', Validators.required],
      newMembershipTypeCost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      newMembershipTypeDuration: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.max(48)]],
    });
    this.editMembershipTypeForm = this.formBuilder.group({
      editMembershipTypeId: ['', Validators.required],
      editMembershipTypeName: ['', Validators.required],
      editMembershipTypeCost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      editMembershipTypeDuration: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });
  }
  ngOnInit(): void {
    this.loadMembershipTypes();
  }
  editMembershipType(idMembershipType: number): void {
    const membershipType = this.membershipTypes.find(membershipType => membershipType.id === idMembershipType);
    const modalElement = document.getElementById('editMembershipTypeModal');
    
    if (modalElement && membershipType) {
      this.editMembershipTypeForm.patchValue({
        editMembershipTypeId: idMembershipType,
        editMembershipTypeName: membershipType.name,
        editMembershipTypeCost: membershipType.cost,
        editMembershipTypeDuration: membershipType.duration
      });
      
      this.editOpenModal();
    }
  }
  
  getTimestampString(): string {
    const currentUtcDate = new Date();
    const year = currentUtcDate.getUTCFullYear();
    const month = String(currentUtcDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentUtcDate.getUTCDate()).padStart(2, '0');
    const hour = String(currentUtcDate.getUTCHours()).padStart(2, '0');
    const minute = String(currentUtcDate.getUTCMinutes()).padStart(2, '0');
    const second = String(currentUtcDate.getUTCSeconds()).padStart(2, '0');
    const millisecond = String(currentUtcDate.getUTCMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
  }
  deleteMembershipType(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.membershipTypesService.deleteMembershipById(id).subscribe(
          (response) => {
            if (!response.hasError) {
              this.loadMembershipTypes(); // Reload the cities list after deleting one
            } else {
              console.error('Error deleting membership type:', response.message);
            }
          },
          (error) => {
            console.error('Error deleting membership type', error);
          }
        );
      }
    });
  }
  extractDateTime(input: string): string {
    const dateTime = new Date(input);
    const year = dateTime.getUTCFullYear();
    const month = String(dateTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getUTCDate()).padStart(2, '0');
    const hour = String(dateTime.getUTCHours()).padStart(2, '0');
    const minute = String(dateTime.getUTCMinutes()).padStart(2, '0');
    const second = String(dateTime.getUTCSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }


  onSubmiteditMembershipType(): void {
    if (this.editMembershipTypeForm.valid) {
      const editMembershipTypeData = {
        id: this.editMembershipTypeForm.value.editMembershipTypeId,
        name: this.editMembershipTypeForm.value.editMembershipTypeName,
        cost: this.editMembershipTypeForm.value.editMembershipTypeCost,
        createOn: this.getTimestampString(),
        duration: this.editMembershipTypeForm.value.editMembershipTypeDuration,
      };
  
      this.membershipTypesService.updateMembershipType(editMembershipTypeData).subscribe(
        (response) => {
          if (!response.hasError) {
            this.loadMembershipTypes();
            this.editMembershipTypeForm.reset();
            this.editCloseModal();
  
            // Mostrar mensaje de éxito con swal
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Membership type updated successfully!',
            });
          } else {
            console.error('Error updating membership type:', response.message);
          }
        },
        (error) => {
          console.error('Error updating membership type', error);
        }
      );
    }
  }
  
  
  loadMembershipTypes(){
    this.loading = true;
      this.membershipTypesService.getMembershipData().subscribe(
        (response) => {
          if (!response.hasError) {
            this.membershipTypes = response.model;

            // Calculate and set the number of members for each city
            this.membershipTypes.forEach(membershipType => {
              membershipType.numberOfMembers = membershipType.members.length;
            });
    
            // Mostrar mensaje si no hay registros
            if (this.membershipTypes.length === 0) {
              this.noRecordsMessage = 'No records.';
              this.loading = false;
            } else {
              this.noRecordsMessage = ''; // Reiniciar el mensaje si hay registros
            }
          } else {
            this.noRecordsMessage = response.message;
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error loading membership types', error);
        }
      ); 
    }
  newOpenModal(){
    const modalElement = document.getElementById('newMembershipTypeModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
  }
 }
 newCloseModal(): void{
  const modalElement = document.getElementById('newMembershipTypeModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }
}
editOpenModal(){
  const modalElement = document.getElementById('editMembershipTypeModal');
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
}
}
editCloseModal(): void{
const modalElement = document.getElementById('editMembershipTypeModal');
if (modalElement) {
  modalElement.classList.remove('show');
  modalElement.style.display = 'none';
}
}
addNewMembershipType(): void {
  if (this.newMembershipTypeForm.valid) {
    const newMembershipTypeData = {
      name: this.newMembershipTypeForm.value.newMembershipTypeName,
      cost: this.newMembershipTypeForm.value.newMembershipTypeCost,
      createdOn: this.getTimestampString(),
      duration: this.newMembershipTypeForm.value.newMembershipTypeDuration,

    };

    this.membershipTypesService.registerNewMembershipType(newMembershipTypeData).subscribe(
      (response) => {
        if (!response.hasError) {
          this.newCloseModal();
          this.loadMembershipTypes(); // Reload the membership types list after adding a new one
          this.newMembershipTypeForm.reset(); // Reset the form after adding

          // Mostrar mensaje de éxito con swal
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Membership type added successfully!',
          });
        } else {
          console.error('Error adding membership type:', response.message);
        }
      },
      (error) => {
        console.error('Error adding membership type', error);
      }
    );
  }
}

}
