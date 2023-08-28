import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/core/interfaces/attendance/attendance';
import { City } from 'src/app/core/interfaces/city/city';
import { Members } from 'src/app/core/interfaces/members/members';
import { MembershipType } from 'src/app/core/interfaces/membershiptypes/membershiptypes';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import { MembersService } from 'src/app/core/services/members/members.service';
import { MembershipTypesService } from 'src/app/core/services/membershipTypes/membership-types.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-in',
  templateUrl: './member-in.component.html',
  styleUrls: ['./member-in.component.scss']
})
export class MemberInComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'lastName', 'birthDay', 'email','membershipEnd', 'cityId', 'membershipTypeId', 'register'];
  dataSource = new MatTableDataSource<Members>();
  members: Members[] = [];
  cities: City[] = [];
  attendance : Attendance[] = [];
  membershipTypes: MembershipType[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  noRecordsMessage!: string;
  selectedCity!: number; 
  attendanceWithoutExit!: Attendance[];
  loading!: boolean;

  constructor (
    private membersService: MembersService,
    private citiesService : CitiesService,
    private membershipTypesService: MembershipTypesService,
    private attendanceService: AttendanceService,
    ) { }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAttendance();
    this.loadMembers();
    this.loadCities();
    this.loadMembershipTypes();
  }

  getCityNameById(cityId: number): string {
    const city = this.cities.find(city => city.id === cityId);
    return city ? city.name : 'Unknown City';
  }
  getMembershipTypeNameById(membershipTypeId: number): string {
    const membershipType = this.membershipTypes.find(type => type.id === membershipTypeId);
    return membershipType ? membershipType.name : 'Unknown Membership Type';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAttendance(): void {

    this.attendanceService.getAttendanceWithoutExit().subscribe(
      (response) => {
        if (!response.hasError) {
          this.attendanceWithoutExit = response.model;
          this.loadMembers();

        } else {
          console.error('Error fetching attendance without exit:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching attendance without exit', error);
      }
    );
  }
  
  loadMembers(): void {
    this.loading = true;
    this.membersService.getMembersData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.members = response.model.filter(member => {
            return !this.attendanceWithoutExit.some(attendance => attendance.member.id === member.id);
          });
  
          this.dataSource.data = this.members;
          this.noRecordsMessage = response.message;
          this.loading=false;
        } else {
          console.error('Error fetching members data:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching members data', error);
      }
    );
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
  loadMembershipTypes(): void {
    this.membershipTypesService.getMembershipData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.membershipTypes = response.model;
        } else {
          console.error('Error fetching protected data:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching protected data', error);
      }
    );
  }
  registerNewAttendance(id:number){
    this.attendanceService.registerMemberIn(id).subscribe(
      (response) => {
        if (!response.hasError) {
          Swal.fire({
            icon: 'success',
            title: 'Member in registered successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.getAttendance();
          this.loadMembers(); 
        } else {
          console.error('Error deleting membership type:', response.message);
        }
      },
      (error) => {
        console.error('Error deleting membership type', error);
      }
    );
  }
}
