import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/core/interfaces/attendance/attendance';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';

@Component({
  selector: 'app-attendance-manager',
  templateUrl: './attendance-manager.component.html',
  styleUrls: ['./attendance-manager.component.scss']
})
export class AttendanceManagerComponent implements OnInit{
  attendance : Attendance[]= [];
  displayedColumns: string[] = ['id', 'dateIn', 'memberId', 'memberName', 'memberLastName', 'memberOut'];
  dataSource = new MatTableDataSource<Attendance>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  noRecordsMessage!: string;
  loading!: boolean;

  constructor(
    private attendanceService: AttendanceService,
  ) { }
  
  isNoDataDate(date: string): boolean {
    return date === '0001-01-01T00:00:00';
  }
  
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator; 
    this.loadAttendance();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadAttendance(): void {
    this.loading = true;
    this.attendanceService.getAttendanceData().subscribe(
      (response) => {
        if (!response.hasError) {
          this.dataSource.data = response.model;
          this.loading = false;
        } else {
          console.error('Error fetching attendance:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching attendance', error);
      }
    );
  }
  deleteAttendance(id: number): void {
    this.attendanceService.deleteAttendanceById(id).subscribe(
      (response) => {
        if (!response.hasError) {
          this.loadAttendance();
        } else {
          console.error('Error deleting attendance:', response.message);
        }
      },
      (error) => {
        console.error('Error deleting attendance', error);
      }
    );
  }
}
