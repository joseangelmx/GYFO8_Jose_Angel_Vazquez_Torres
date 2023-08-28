import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentType } from 'src/app/core/interfaces/equipmentTypes/equipmenTypes';
import { EquipmentTypesService } from 'src/app/core/services/equipmentTypes/equipment-types.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment-types',
  templateUrl: './equipment-types.component.html',
  styleUrls: ['./equipment-types.component.scss']
})
export class EquipmentTypesComponent implements OnInit {
  idEditEquipment!: number;
  editEquipmentDescription!: string;
  EquipmentName!:string;
  editEquipmentForm : FormGroup;
  displayedColumns: string[] = ['position', 'name', 'description','edit','delete'];
  dataSource = new MatTableDataSource<EquipmentType>();
  equipments: EquipmentType[] = [];
  noRecordsMessage!: string;
  newEquipmentForm: FormGroup;
  loading!: boolean;


  constructor(
    private equipmentTypesService: EquipmentTypesService,   
    private formBuilder: FormBuilder,) {
      this.editEquipmentForm = this.formBuilder.group({
        idEquipmentEdit: ['', Validators.required],
        editEquipmentName: ['', Validators.required],
        EquipmentDescription: ['', Validators.required]
      });

      this.newEquipmentForm = this.formBuilder.group({
        newNameEquipment: ['', Validators.required],
        newDescriptionEquipment: ['', Validators.required]
      });
    }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadEquipmentTypes();
    this.dataSource.paginator = this.paginator; 
  }

  loadEquipmentTypes(): void {
    this.loading = true; // Enable loading
    this.equipmentTypesService.getCityData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.dataSource.data = response.model;
  
          // Show message if no records
          if (this.dataSource.data.length === 0) {
            this.noRecordsMessage = 'No records.';
            this.loading = false; // Disable loading
          } else {
            this.noRecordsMessage = ''; // Reset the message if there are records
          }
        } else {
          console.error('Error fetching equipment types:', response.message);
        }
        this.loading = false; // Disable loading
      },
      (error) => {
        console.error('Error fetching equipment types', error);
      }
    );
  }
  
  onSubmit(){
    if (this.newEquipmentForm.valid) {
      const newEquipmentData = {
        name: this.newEquipmentForm.value.newNameEquipment,
        description: this.newEquipmentForm.value.newDescriptionEquipment,
      };
  
      this.equipmentTypesService.registerNewEquipment(newEquipmentData).subscribe(
        (response) => {
          if (!response.hasError) {
            this.loadEquipmentTypes(); 
            this.newEquipmentForm.reset();
            this.newCloseModal(); 
          } else {
            console.error('Error adding city:', response.message);
          }
        },
        (error) => {
          console.error('Error adding city', error);
        }
      );
    }
  }
  deleteEquipment(equimentId: any): void {
    // Show a Swal alert to confirm deletion
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this equipment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion
        this.equipmentTypesService.deleteEquipmentById(equimentId).subscribe(
          (response) => {
            if (!response.hasError) {
              // Remove the equipment from the list and reload equipment types
              this.equipments = this.equipments.filter(equipment => equipment.id !== equimentId);
              this.loadEquipmentTypes();
            } else {
              console.error('Error deleting equipment:', response.message);
            }
          },
          (error) => {
            console.error('Error deleting equipment', error);
          }
        );
      }
    });
  }
  
  submitEditEquipment(){
    if (this.editEquipmentForm.valid) {

      let idEdit= this.editEquipmentForm.value.idEquipmentEdit;
      let nameEdit = this.editEquipmentForm.value.editEquipmentName;
      let descriptionEdit = this.editEquipmentForm.value.EquipmentDescription;
      this.equipmentTypesService.updateEquipmentName(idEdit,nameEdit,descriptionEdit).subscribe(
        (response) => {
          if (!response.hasError) {
            this.loadEquipmentTypes();
            this.editEquipmentForm.reset(); 
            this.closeModal();
          } else {
            console.error('Error editing city:', response.message);
          }
        },
        (error) => {
          console.error('Error editing city', error);
        }
      );
  }
  }
  closeModal(): void {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }

  newCloseModal(): void{
    const modalElement = document.getElementById('newEquipmentModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }
  newOpenModal() : void{
    const modalElement = document.getElementById('newEquipmentModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }
  editEquipment(idEquipment:number,equipmentName:string,equipmentDescription:string): void {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      this.EquipmentName = equipmentName;
      this.idEditEquipment = idEquipment; 
      this.editEquipmentDescription = equipmentDescription; 
    }
  }
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
