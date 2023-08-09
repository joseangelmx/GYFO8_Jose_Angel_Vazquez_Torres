using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.Core.Inventories
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public DateTime DateIn { get; } = DateTime.Now;

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Stock { get; set; }

        [Required]
        public bool Status { get; set; }

        [Required]
        public decimal Mesure { get; set; }

        public MesureType MesureType { get; set; }

        public ProductType ProductType { get; set; }
    }
}
