using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.Core.Sales
{
    public class Sale
    {
        [Key]
        public int Id { get; set; }

        public DateTime DateSale { get; set; }

        public IdentityUser User { get; set; }

        public Sale()
        {
            DateSale = DateTime.Now;
        }
    }
}
