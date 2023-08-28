import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/core/interfaces/attendance/attendance';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-out',
  templateUrl: './member-out.component.html',
  styleUrls: ['./member-out.component.scss']
})
export class MemberOutComponent implements OnInit{
  attendance : Attendance[]= [];
  displayedColumns: string[] = ['id', 'dateIn', 'memberId', 'memberName', 'memberLastName', 'memberOut'];
  dataSource = new MatTableDataSource<Attendance>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  noRecordsMessage!: string;
  loading!: boolean;
  constructor(
    private attendanceService: AttendanceService,
  ) { }

  ngOnInit(): void {
   this.getAttendanceWithoutExit();
   this.dataSource.paginator = this.paginator; 
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  registerMemberOut(id: number): void {
    this.attendanceService.registerMemberOut(id).subscribe(
      (response) => {
        if (!response.hasError) {
          Swal.fire({
            icon: 'success',
            title: 'Member out registered successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.getAttendanceWithoutExit();
        } else {
          console.error('Error registering member out:', response.message);
        }
      },
      (error) => {
        console.error('Error registering member out', error);
      }
    );
  }
  getAttendanceWithoutExit(): void {
    this.loading = true; 
  
    this.attendanceService.getAttendanceWithoutExit().subscribe(
      (response) => {
        if (!response.hasError) {
          this.dataSource.data = response.model;
          this.loading = false; 
        } else {
          console.error('Error fetching attendance without exit:', response.message);
        }

      },
      (error) => {
        console.error('Error fetching attendance without exit', error);
        this.loading = false;
      }
    );
  }
  
  isNoDataDate(date: string): boolean {
    return date === '0001-01-01T00:00:00';
  }
  
}
