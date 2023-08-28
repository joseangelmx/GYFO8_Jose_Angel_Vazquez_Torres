import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Member } from 'src/app/core/interfaces/city/city';
import { Members } from 'src/app/core/interfaces/members/members';
import { MembershipType } from 'src/app/core/interfaces/membershiptypes/membershiptypes';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import { MembersService } from 'src/app/core/services/members/members.service';
import { MembershipTypesService } from 'src/app/core/services/membershipTypes/membership-types.service';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit{
  memberForm: FormGroup;
  members : Members [] = [];
  member !: any;
  cities: City[] = [];
  selectedCity!: number; 
  membershipTypes: MembershipType[] = [];
  constructor(
    private fb: FormBuilder,
    private citiesService : CitiesService,
    private membershipTypesService: MembershipTypesService,
    private membersService: MembersService,
    ) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDay: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      allowNewsLetter: false,
      cityId: ['',Validators.required],
      membershipTypeId: ['',Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadCities();
    this.loadMembershipTypes();
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
  loadMembershipTypes(){
    this.membershipTypesService.getMembershipData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.membershipTypes = response.model;

          // Calculate and set the number of members for each city
          this.membershipTypes.forEach(membershipType => {
            membershipType.numberOfMembers = membershipType.members.length;
          });
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
  getDateAddString(monthsToAdd: number): string {
    const currentUtcDate = new Date();
    const year = currentUtcDate.getUTCFullYear();
    const currentMonth = currentUtcDate.getUTCMonth() + 1;
    const totalMonths = currentMonth + monthsToAdd;
  
    let targetYear = year;
    let targetMonth = totalMonths;
  
    if (totalMonths <= 0 && (currentMonth === 7 || currentMonth === 8)) {
      targetYear--;
      targetMonth += 12;
    }
  
    targetYear += Math.floor(targetMonth / 12);
    targetMonth = targetMonth % 12 || 12;
  
    const day = String(currentUtcDate.getUTCDate()).padStart(2, '0');
    const hour = String(currentUtcDate.getUTCHours()).padStart(2, '0');
    const minute = String(currentUtcDate.getUTCMinutes()).padStart(2, '0');
    const second = String(currentUtcDate.getUTCSeconds()).padStart(2, '0');
    const millisecond = String(currentUtcDate.getUTCMilliseconds()).padStart(3, '0');
  
    return `${targetYear}-${String(targetMonth).padStart(2, '0')}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
  }
  
  
  

  onSubmit(){
    let newMember : any;
   if(this.memberForm.valid){
        const birthDayString = this.memberForm.value.birthDay; // Suponiendo que birthDayString es una cadena en formato "AAAA-MM-DD"
      const birthDayDate = new Date(birthDayString);
      const birthDayISOString = birthDayDate.toISOString();
      newMember ={
      name : this.memberForm.value.name,
      lastName : this.memberForm.value.lastName,
      birthDay : birthDayISOString,
      email : this.memberForm.value.email,
      allowNewsLetter: this.memberForm.value.allowNewsLetter === true ? true : false,
      registeredOn : this.getTimestampString(),
      membershipEnd : this.getDateAddString(this.membershipTypes.find(membershipType => membershipType.id === this.memberForm.value.membershipTypeId)?.duration || 0),
      cityId : this.memberForm.value.cityId,
      membershipTypeId : this.memberForm.value.membershipTypeId,}
   }
   this.membersService.registerNewMember(newMember).subscribe(
    (response) => {
      if (!response.hasError) {
        this.memberForm.reset();
        
      } else {
        console.error('Error adding member:', response.message);
        console.log(this.member);
      }
    },
    (error) => {
      console.error('Error adding member', error);
    }

   );}
}
