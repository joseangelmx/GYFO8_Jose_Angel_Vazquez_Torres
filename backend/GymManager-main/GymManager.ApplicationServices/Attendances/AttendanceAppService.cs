using AutoMapper;
using GymManager.ApplicationServices.DTOs.Attendances;
using GymManager.Core.Attendances;
using GymManager.Core.Members;
using GymManager.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Attendances
{
    public class AttendanceAppService : IAttendanceAppService
    {
        private readonly IRepository<int, Attendance> _repository;
        private readonly IMapper _mapper;
        public AttendanceAppService(IRepository<int, Attendance> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<int> AddAttendanceAsync(int memberId)
        {

            Attendance attendance = new Attendance();
            attendance.Member = new Member
            {
                Id= memberId
            };

            await _repository.AddAsync(attendance);

            return attendance.Id;
        }

        public async Task<List<AttendanceDto>> GetTodayAttendancesAsync() 
        {
            var attendances = await this.GetAttendancesAsync();
            var todayAttendances = attendances.Where(x => x.DateIn.Date == DateTime.Now.Date).ToList();
            return todayAttendances;
        }

        public async Task DeleteAttendanceAsync(int memberId)
        {
            var attendances = await _repository.GetAll().ToListAsync();
            var attendance = attendances.Where(x => x.Member.Id == memberId)
                .OrderByDescending(x => x.DateIn)
                .FirstOrDefault();

            await _repository.DeleteAsync(attendance.Id);
        }

        public async Task EditAttendanceAsync(int memberId)
        {
            var attendances = await _repository.GetAll().ToListAsync();
            var attendancesOrdered = attendances.OrderByDescending(x => x.DateIn);
            List<Attendance> memberAttendances = attendancesOrdered.Where(x => x.Member.Id == memberId).ToList();
            var attendance = memberAttendances.FirstOrDefault(x => x.DateIn.Date == DateTime.Now.Date);

            if (attendance != null)
            {
                await _repository.UpdateAsync(attendance);
            }
            else 
            {
                await this.AddAttendanceAsync(memberId);
            }
        }

        public async Task<AttendanceDto> GetAttendanceAsync(int attendanceId)
        {
            return _mapper.Map<AttendanceDto>(await _repository.GetAsync(attendanceId));
        }

        public async Task<List<AttendanceDto>> GetAttendancesAsync()
        {
            return _mapper.Map<List<AttendanceDto>>(await _repository.GetAll().ToListAsync());
        }
    }
}
