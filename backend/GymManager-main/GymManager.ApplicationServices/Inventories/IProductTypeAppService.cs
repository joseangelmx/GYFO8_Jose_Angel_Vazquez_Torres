using GymManager.Core.Inventories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Inventories
{
    public interface IProductTypeAppService
    {
        Task<List<ProductType>> GetProductTypesAsync();

        Task<int> AddProductTypeAsync(ProductType productType);

        Task DeleteProductTypeAsync(int productTypeId);

        Task EditProductTypeAsync(ProductType productType);

        Task<ProductType> GetProductTypeAsync(int productTypeId);
    }
}
