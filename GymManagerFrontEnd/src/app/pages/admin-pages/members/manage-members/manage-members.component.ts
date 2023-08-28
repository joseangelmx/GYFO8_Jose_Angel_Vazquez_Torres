import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentType } from 'src/app/core/interfaces/equipmentTypes/equipmenTypes';
import { EquipmentTypesService } from 'src/app/core/services/equipmentTypes/equipment-types.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { City, Member } from 'src/app/core/interfaces/city/city';
import { MembersService } from 'src/app/core/services/members/members.service';
import { Members } from 'src/app/core/interfaces/members/members';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import { MembershipTypesService } from 'src/app/core/services/membershipTypes/membership-types.service';
import { MembershipType } from 'src/app/core/interfaces/membershiptypes/membershiptypes';
@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'lastName', 'birthDay', 'email', 'allowNewsLetter', 'registeredOn', 'membershipEnd', 'cityId', 'membershipTypeId', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Members>();
  editMemberForm : FormGroup;
  members: Member[] = [];
  cities: City[] = [];
  membershipTypes: MembershipType[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  noRecordsMessage!: string;
  selectedCity!: number; 
  loading!: boolean;

  constructor(
    private membersService: MembersService,   
    private formBuilder: FormBuilder,
    private citiesService : CitiesService,
    private membershipTypesService: MembershipTypesService,
    ) {
      this.editMemberForm = this.formBuilder.group({
        idMemberEdit: ['', Validators.required],
        editMemberName: ['', Validators.required],
        editMemberLastName: ['', Validators.required],
        editMemberBirthDay: ['', Validators.required],
        editMemberEmail: ['', Validators.required],
        editMemberAllowNewsLetter: ['', Validators.required],
        editMemberRegisteredOn: ['', Validators.required],
        editMemberMembershipEnd: ['', Validators.required],
        editMemberCityId: ['', Validators.required],
        editMemberMembershipTypeId: ['', Validators.required]
      });
    }
    loadCities(): void {
      this.citiesService.getCityData().subscribe(
        (response) => {
          if (!response.hasError) {
            this.cities = response.model;
          } else {
            console.error('Error fetching protected data:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching protected data', error);
        }
      );
    }

    
    onSubmit(){
      const member: Members = {
        id: this.editMemberForm.controls['idMemberEdit'].value,
        name: this.editMemberForm.controls['editMemberName'].value,
        lastName: this.editMemberForm.controls['editMemberLastName'].value,
        birthDay: this.editMemberForm.controls['editMemberBirthDay'].value,
        email: this.editMemberForm.controls['editMemberEmail'].value,
        allowNewsLetter: this.editMemberForm.controls['editMemberAllowNewsLetter'].value,
        registeredOn: this.editMemberForm.controls['editMemberRegisteredOn'].value,
        membershipEnd: this.editMemberForm.controls['editMemberMembershipEnd'].value,
        cityId: this.editMemberForm.controls['editMemberCityId'].value,
        membershipTypeId: this.editMemberForm.controls['editMemberMembershipTypeId'].value,
      };
      this.membersService.updateMember(member).subscribe(
        (response) => {
          if (!response.hasError) {
            this.loadMembers(); // Reload the cities list after deleting one
            this.editCloseModal();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Member has been successfully updated!',
              timer: 2000, // Tiempo en milisegundos para que el cuadro de diálogo se cierre automáticamente
              showConfirmButton: false // No mostrar el botón de confirmación
            });
          } else {
            console.error('Error deleting membership type:', response.message);
          }
        },
        (error) => {
          console.error('Error deleting membership type', error);
        }
      );
    }
    loadMembershipTypes(){
      this.membershipTypesService.getMembershipData().subscribe(
        (response) => {
          if (!response.hasError) {
            this.membershipTypes = response.model;
          }
        },
        (error) => {
          console.error('Error loading membership types', error);
        }
      ); 
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


  ngOnInit(): void {
    this.loadMembers();
    this.loadCities();
    this.loadMembershipTypes();
    this.dataSource.paginator = this.paginator; 

  }
  loadMembers(): void {
    this.loading = true; // Enable loading
    this.membersService.getMembersData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.dataSource.data = response.model;
          this.loading = false; // Disable loading
          // Show message if no records
          if (this.dataSource.data.length === 0) {
            this.noRecordsMessage = 'No records.';
          } else {
            this.noRecordsMessage = ''; // Reset the message if there are records
          }
        } else {
          this.noRecordsMessage = 'No records.';
        }
      },
      (error) => {
        this.noRecordsMessage = 'No records.';
      }
    );
  }

  convertISODateToString(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  editMember(id:number){
    this.membersService.getMemberById(id).subscribe(
      (response) => {
        if (!response.hasError) {
          this.editMemberForm.controls['idMemberEdit'].setValue(response.model.id);
          this.editMemberForm.controls['editMemberName'].setValue(response.model.name);
          this.editMemberForm.controls['editMemberLastName'].setValue(response.model.lastName);
          this.editMemberForm.controls['editMemberBirthDay'].setValue(this.convertISODateToString(response.model.birthDay));
          this.editMemberForm.controls['editMemberEmail'].setValue(response.model.email);
          this.editMemberForm.controls['editMemberAllowNewsLetter'].setValue(response.model.allowNewsLetter);
          this.editMemberForm.controls['editMemberRegisteredOn'].setValue(response.model.registeredOn);
          this.editMemberForm.controls['editMemberMembershipEnd'].setValue(response.model.membershipEnd);
          this.editMemberForm.controls['editMemberCityId'].setValue(response.model.cityId);
          this.editMemberForm.controls['editMemberMembershipTypeId'].setValue(response.model.membershipTypeId);
          this.editOpenModal();
        } else {
          console.error('Error fetching protected data:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching protected data', error);
      }
    );

  }

  editOpenModal() {
    let modal = document.getElementById("editMemberModal");
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  editCloseModal() {
    let modal = document.getElementById("editMemberModal");
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  getCityNameById(cityId: number): string {
    const city = this.cities.find(city => city.id === cityId);
    return city ? city.name : 'Unknown City';
  }
  getMembershipTypeNameById(membershipTypeId: number): string {
    const membershipType = this.membershipTypes.find(type => type.id === membershipTypeId);
    return membershipType ? membershipType.name : 'Unknown Membership Type';
  }
  deleteMember(id:number){
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
        this.membersService.deleteMember(id).subscribe(
          (response) => {
            if (!response.hasError) {
              this.loadMembers(); // Reload the cities list after deleting one
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
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
