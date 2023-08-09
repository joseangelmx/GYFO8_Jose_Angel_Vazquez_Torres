using GymManager.Core.Inventories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Inventories
{
    public interface IInventoryAppService
    {
        Task<List<Inventory>> GetInventoriesAsync();

        Task<int> AddInventoryAsync(Inventory inventory);

        Task DeleteInventoryAsync(int inventoryId);

        Task EditInventoryAsync(Inventory inventory);

        Task<Inventory> GetInventoryAsync(int inventoryId);
    }
}
