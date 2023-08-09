using GymManager.Core.Members;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.DTOs.MembershipTypes
{
    public class MembershipTypeDto
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        [Required]
        public string Name { get; set; }

        [DataType(DataType.Currency)]
        [Required]
        public decimal Cost { get; set; }

        //[BindProperty, DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]

        [Required]
        public DateTime CreatedOn { get; set; }

        [RegularExpression("[0-9]{1,}", ErrorMessage = "Only integers values are allowed for this champ")]
        [Range(1, 48)]
        public int Duration { get; set; }

        public List<Member> Members { get; set; }

        public MembershipTypeDto()
        {
            Members = new List<Member>();
            CreatedOn = DateTime.Now;
        }
    }
}
