using GymManager.Core.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Sales
{
    public interface ISalesInventoryAppService
    {
        Task<List<SalesInventory>> GetSalesInventoriesAsync();

        Task<int> AddSalesInventoryAsync(SalesInventory salesInventory);

        Task DeleteSalesInventoryAsync(int salesInventoryId);

        Task EditSalesInventoryAsync(SalesInventory salesInventory);

        Task<SalesInventory> GetSalesInventoryAsync(int salesInventoryId);
    }
}
