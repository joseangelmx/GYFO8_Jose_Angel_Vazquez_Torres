using GymManager.Core.Members;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.Core.Attendances
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        public DateTime DateIn { get; set; }

        public DateTime DateOut { get; set; }

        public Member Member { get; set; }
    }
}
