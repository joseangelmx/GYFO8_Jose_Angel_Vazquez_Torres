using GymManager.Core.Sales;
using GymManager.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Sales
{
    public class SalesInventoryAppService : ISalesInventoryAppService
    {
        private readonly IRepository<int, SalesInventory> _repository;
        public SalesInventoryAppService(IRepository<int, SalesInventory> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddSalesInventoryAsync(SalesInventory salesInventory)
        {
            await _repository.AddAsync(salesInventory);

            return salesInventory.Sale.Id;
        }

        public async Task DeleteSalesInventoryAsync(int salesInventoryId)
        {
            await _repository.DeleteAsync(salesInventoryId);
        }

        public async Task EditSalesInventoryAsync(SalesInventory salesInventory)
        {
            await _repository.UpdateAsync(salesInventory);
        }

        public async Task<SalesInventory> GetSalesInventoryAsync(int salesInventoryId)
        {
            return await _repository.GetAsync(salesInventoryId);
        }

        public async Task<List<SalesInventory>> GetSalesInventoriesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }
    }
}
