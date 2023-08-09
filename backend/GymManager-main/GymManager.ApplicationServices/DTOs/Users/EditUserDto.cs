using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.DTOs.Users
{
    public class EditUserDto
    {
        [EmailAddress]
        [Required]
        [StringLength(256)]
        public string UserName { get; set; }

        [Required]
        [StringLength(32)]
        public string PhoneNumber { get; set; }

        [StringLength(100, MinimumLength = 5)]
        public string Password { get; set; }
    }
}
