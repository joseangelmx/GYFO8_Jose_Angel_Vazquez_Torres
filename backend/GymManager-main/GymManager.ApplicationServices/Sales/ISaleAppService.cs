using GymManager.Core.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Sales
{
    public interface ISaleAppService
    {
        Task<List<Sale>> GetSalesAsync();

        Task<int> AddSaleAsync(Sale sale);

        Task DeleteSaleAsync(int saleId);

        Task EditSaleAsync(Sale sale);

        Task<Sale> GetSaleAsync(int saleId);
    }
}
