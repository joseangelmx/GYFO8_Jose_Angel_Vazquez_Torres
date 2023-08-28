import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { City } from 'src/app/core/interfaces/city/city';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
  display: string= "none";
  cityForm: FormGroup;
  editCityForm:FormGroup;
  cityName: string = '';
  idCityEdit!:number;
  noRecordsMessage!: string;
  loading!: boolean;
constructor( 
  private citiesService : CitiesService,
  private formBuilder: FormBuilder,
  private dialog: MatDialog
){
  this.cityForm = this.formBuilder.group({
    cityName: ['', Validators.required],
  });
  this.editCityForm = this.formBuilder.group({
    idCityEdit: ['', Validators.required],
    editCityName: ['', Validators.required],
  });
}
onSubmit(): void {
  if (this.cityForm.valid) {
    const newCityData = {
      name: this.cityForm.value.cityName
    };

    this.citiesService.registerNewCity(newCityData).subscribe(
      (response) => {
        if (!response.hasError) {
          this.loadCities(); // Recargar la lista de ciudades después de agregar una nueva
          this.cityForm.reset(); // Reiniciar el formulario después de agregar
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
ngOnInit(): void {
  this.loadCities();
}

closeModal(): void {
  const modalElement = document.getElementById('myModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    
  }
}

loadCities(): void {
  this.loading = true;
  this.citiesService.getCityData().subscribe(
    (response) => {
      if (!response.hasError) {
        this.cities = response.model;

        // Calculate and set the number of members for each city
        this.cities.forEach(city => {
          city.numberOfMembers = city.members.length;
        });

        // Mostrar mensaje si no hay registros
        if (this.cities.length === 0) {
          this.noRecordsMessage = 'No records.';
          this.loading = false;
        } else {
          this.noRecordsMessage = ''; // Reiniciar el mensaje si hay registros
        }
      } else {
        console.error('Error fetching protected data:', response.message);
      }
      this.loading = false;
    },
    (error) => {
      console.error('Error fetching protected data', error);
    }
  );
}


deleteCity(cityId: number): void {
  // Show a Swal alert to confirm deletion
  Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete this city?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms deletion
      this.citiesService.deleteCityById(cityId).subscribe(
        () => {
          // Remove the city from the list and reload cities
          this.cities = this.cities.filter(city => city.id !== cityId);
          this.loadCities();
        },
        (error) => {
          console.error('Error deleting city:', error);
        }
      );
    }
  });
}



editCity(idCity: number, cityName: string): void {
  const modalElement = document.getElementById('myModal');
  
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    
    // Aquí utilizo setValue para establecer los valores directamente en el formulario
    this.editCityForm.setValue({
      editCityName: cityName,
      idCityEdit: idCity
    });
  }
}




  submitEditCity(){
    if (this.editCityForm.valid) {

        let idEdit= this.editCityForm.value.idCityEdit;
        let nameEdit = this.editCityForm.value.editCityName;
  
        this.citiesService.updateCityName(idEdit,nameEdit).subscribe(
          (response) => {
            if (!response.hasError) {
              this.loadCities(); 
              this.editCityForm.reset(); 
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
}
