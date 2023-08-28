import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/core/interfaces/attendance/attendance';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';

@Component({
  selector: 'app-attendance-today',
  templateUrl: './attendance-today.component.html',
  styleUrls: ['./attendance-today.component.scss']
})
export class AttendanceTodayComponent implements OnInit{

  attendances: Attendance[] = [];
  noRecordsMessage!: string;
  loading!: boolean;
  constructor(
    private attendanceService: AttendanceService,
  ) { }
  ngOnInit(): void {
    this.loadAttendanceToday();
  }

  isNoDataDate(date: string): boolean {
    return date === '0001-01-01T00:00:00';
  }
  
  
  loadAttendanceToday(): void {
    this.loading=true;
    this.noRecordsMessage='No records found';
    this.attendanceService.getAttendanceToday().subscribe(
      (response) => {
        if (!response.hasError) {
          this.attendances = response.model;
          this.loading=false;
        } else {
          console.error('Error fetching protected data:', response.message);
        }
      }
 );} 

}
