using GymManager.Core.Inventories;
using GymManager.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Inventories
{
    public class InventoryAppService : IInventoryAppService
    {
        private readonly IRepository<int, Inventory> _repository;
        public InventoryAppService(IRepository<int, Inventory> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddInventoryAsync(Inventory inventory)
        {
            await _repository.AddAsync(inventory);

            return inventory.Id;
        }

        public async Task DeleteInventoryAsync(int inventoryId)
        {
            await _repository.DeleteAsync(inventoryId);
        }

        public async Task EditInventoryAsync(Inventory inventory)
        {
            await _repository.UpdateAsync(inventory);
        }

        public async Task<Inventory> GetInventoryAsync(int inventoryId)
        {
            return await _repository.GetAsync(inventoryId);
        }

        public async Task<List<Inventory>> GetInventoriesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }
    }
}
