using GymManager.Core.Members;
using GymManager.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Members
{
    public class CitiesAppService : ICitiesAppService
    {
        private readonly IRepository<int, City> _repository;
        public CitiesAppService(IRepository<int, City> repository)
        {
            _repository = repository;
        }
        public async Task<int> AddCityAsync(City city)
        {
            await _repository.AddAsync(city);

            return city.Id;
        }

        public async Task DeleteCityAsync(int cityId)
        {
            await _repository.DeleteAsync(cityId);
        }

        public async Task EditCityAsync(City city)
        {
            await _repository.UpdateAsync(city);
        }

        public async Task<City> GetCityAsync(int cityId)
        {
            return await _repository.GetAsync(cityId);
        }

        public async Task<List<City>> GetCitiesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }
    }
}
