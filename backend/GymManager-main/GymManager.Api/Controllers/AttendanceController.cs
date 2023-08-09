using AutoMapper;
using GymManager.Api.Responses;
using GymManager.ApplicationServices.Attendances;
using GymManager.ApplicationServices.DTOs.Attendances;
using GymManager.ApplicationServices.DTOs.Members;
using GymManager.ApplicationServices.Members;
using GymManager.Core.Members;
using Microsoft.AspNetCore.Mvc;

namespace GymManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceAppService _attendanceService;
        private readonly IMapper _mapper;

        public AttendanceController(IAttendanceAppService attendanceService, IMapper mapper)
        {
            _attendanceService = attendanceService;
            _mapper = mapper;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(
            new {
                HasError = false,
                Message = "List of attendances returned",
                Model = await _attendanceService.GetAttendancesAsync(),
                RequestId = System.Diagnostics.Activity.Current?.Id
            });
        }

        [Route("today")]
        [HttpGet]
        public async Task<IActionResult> GetTodayAttendances() 
        {
            return Ok(
            new {
                HasError = false,
                Message = "List of attendances returned",
                Model = await _attendanceService.GetTodayAttendancesAsync(),
                RequestId = System.Diagnostics.Activity.Current?.Id
            });
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(
            new {
                HasError = false,
                Message = "Attendance Returned",
                Model = await _attendanceService.GetAttendanceAsync(id),
                RequestId = System.Diagnostics.Activity.Current?.Id
            });
        }

        // POST api/<ValuesController>
        [HttpPost("{id}")]
        public async Task<IActionResult> Post(int id)
        {
            

            if (ModelState.IsValid)
            {
                await _attendanceService.AddAttendanceAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "In Registered",
                    model = await _attendanceService.GetAttendancesAsync(),
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad Request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id)
        {
            if (ModelState.IsValid)
            {
                await _attendanceService.EditAttendanceAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "Out registered",
                    model = await _attendanceService.GetAttendancesAsync(),
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad Request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                await _attendanceService.DeleteAttendanceAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "Attendance Deleted",
                    model = await _attendanceService.GetAttendancesAsync(),
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad Request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
        }
    }
}
