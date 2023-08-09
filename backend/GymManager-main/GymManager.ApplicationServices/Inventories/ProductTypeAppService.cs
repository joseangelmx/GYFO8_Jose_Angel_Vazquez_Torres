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
    public class ProductTypeAppService : IProductTypeAppService
    {
        private readonly IRepository<int, ProductType> _repository;
        public ProductTypeAppService(IRepository<int, ProductType> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddProductTypeAsync(ProductType productType)
        {
            await _repository.AddAsync(productType);

            return productType.Id;
        }

        public async Task DeleteProductTypeAsync(int productTypeId)
        {
            await _repository.DeleteAsync(productTypeId);
        }

        public async Task EditProductTypeAsync(ProductType productType)
        {
            await _repository.UpdateAsync(productType);
        }

        public async Task<ProductType> GetProductTypeAsync(int productTypeId)
        {
            return await _repository.GetAsync(productTypeId);
        }

        public async Task<List<ProductType>> GetProductTypesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }
    }
}
