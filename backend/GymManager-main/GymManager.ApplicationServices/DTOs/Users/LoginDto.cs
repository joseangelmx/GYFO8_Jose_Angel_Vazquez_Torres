using System.ComponentModel.DataAnnotations;

namespace GymManager.ApplicationServices.DTOs.Models
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string UserName { get; set;}
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set;}
    }
}
