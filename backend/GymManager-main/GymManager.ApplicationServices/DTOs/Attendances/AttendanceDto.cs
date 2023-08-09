using GymManager.ApplicationServices.DTOs.Members;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.DTOs.Attendances
{
    public class AttendanceDto
    {
        [Key]
        public int Id { get; set; }

        public DateTime DateIn { get; set; }

        public DateTime DateOut { get; set; }

        public MemberDto Member { get; set; }
    }
}
