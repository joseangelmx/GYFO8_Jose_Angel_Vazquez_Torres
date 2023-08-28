import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService]
    });

    service = TestBed.inject(AttendanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve attendance data', () => {
    service.getAttendanceData().subscribe(response => {
      expect(response).toBeTruthy(); // Just checking for truthy response
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Attendance`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should register member in', () => {
    const id = 1;
    service.registerMemberIn(id).subscribe(response => {
      expect(response).toBeTruthy(); // Just checking for truthy response
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Attendance/${id}`);
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should register member out', () => {
    const id = 1;
    service.registerMemberOut(id).subscribe(response => {
      expect(response).toBeTruthy(); // Just checking for truthy response
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Attendance/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete attendance by id', () => {
    const id = 1;
    service.deleteAttendanceById(id).subscribe(response => {
      expect(response).toBeTruthy(); // Just checking for truthy response
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Attendance/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
