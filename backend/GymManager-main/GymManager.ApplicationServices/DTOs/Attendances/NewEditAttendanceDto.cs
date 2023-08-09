using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.DTOs.Attendances
{
    public class NewEditAttendanceDto
    {
        [Required]
        public int MemberId { get; set; }

    }
}
