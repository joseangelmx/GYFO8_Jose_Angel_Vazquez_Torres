using GymManager.Core.Attendances;
using GymManager.Core.MembershipTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.Core.Members
{
    public class Member
    {
        [Key]
        public int Id { get; set; }

        [StringLength(15)]
        [Required(ErrorMessage ="Debe ingresar el nombre del miembro")]
        public string Name { get; set; }

        [StringLength(20)]
        [Required]
        public string LastName { get; set; }

        public DateTime BirthDay { get; set; }


        [EmailAddress]
        [Required]
        public string Email { get; set; }

        public bool AllowNewsLetter { get; set; }

        [Required]
        public DateTime RegisteredOn { get; set; }

        [Required]
        public DateTime MembershipEnd { get; set; }

        public City City { get; set; }

        public MembershipType MembershipType { get; set; }

        public List<Attendance> Attendances { get; set; }
        public Member() 
        {
            Attendances = new List<Attendance>();
            RegisteredOn = DateTime.Now;
        }
    }
}
