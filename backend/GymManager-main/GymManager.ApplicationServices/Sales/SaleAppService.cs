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
    public class SaleAppService : ISaleAppService
    {
        private readonly IRepository<int, Sale> _repository;
        public SaleAppService(IRepository<int, Sale> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddSaleAsync(Sale sale)
        {
            await _repository.AddAsync(sale);

            return sale.Id;
        }

        public async Task DeleteSaleAsync(int saleId)
        {
            await _repository.DeleteAsync(saleId);
        }

        public async Task EditSaleAsync(Sale sale)
        {
            await _repository.UpdateAsync(sale);
        }

        public async Task<Sale> GetSaleAsync(int saleId)
        {
            return await _repository.GetAsync(saleId);
        }

        public async Task<List<Sale>> GetSalesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }
    }
}
