using GymManager.ApplicationServices.DTOs.Attendances;
using GymManager.Core.Attendances;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Attendances
{
    public interface IAttendanceAppService
    {
        Task<List<AttendanceDto>> GetAttendancesAsync();
        Task<List<AttendanceDto>> GetTodayAttendancesAsync();

        Task<int> AddAttendanceAsync(int memberId);

        Task DeleteAttendanceAsync(int memberId);

        Task EditAttendanceAsync(int MemberId);

        Task<AttendanceDto> GetAttendanceAsync(int attendanceId);
    }
}
