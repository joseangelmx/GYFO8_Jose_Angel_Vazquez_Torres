using GymManager.Core.Attendances;
using GymManager.Core.MembershipTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.DTOs.Members
{
    public class EditMemberDto
    {

        [StringLength(15)]
        [Required]
        public string Name { get; set; }

        [StringLength(20)]
        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime BirthDay { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        public bool AllowNewsLetter { get; set; }

        [Required]
        public DateTime RegisteredOn { get; set; }

        [Required]
        public DateTime MembershipEnd { get; set; }

        [Required]
        public int CityId { get; set; }

        [Required]
        public int MembershipTypeId { get; set; }
    }
}
