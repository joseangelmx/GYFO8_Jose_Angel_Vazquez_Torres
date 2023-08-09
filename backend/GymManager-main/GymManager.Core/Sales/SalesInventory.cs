using GymManager.Core.Inventories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.Core.Sales
{
    public class SalesInventory
    {
        public int InventoryId { get; set; }

        public int SaleId { get; set; }

        public Inventory Inventory { get; set; }

        public Sale Sale { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
