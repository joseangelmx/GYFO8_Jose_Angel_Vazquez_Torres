using GymManager.Core.Members;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Members
{
    public interface ICitiesAppService
    {
        Task<List<City>> GetCitiesAsync();

        Task<int> AddCityAsync(City city);

        Task DeleteCityAsync(int cityId);

        Task<City> GetCityAsync(int cityId);

        Task EditCityAsync(City city);
    }
}
