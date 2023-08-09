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
    public class MesureTypeAppService : IMesureTypeAppService
    {
        private readonly IRepository<int, MesureType> _repository;
        public MesureTypeAppService(IRepository<int, MesureType> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddMesureTypeAsync(MesureType mesureType)
        {
            await _repository.AddAsync(mesureType);

            return mesureType.Id;
        }

        public async Task DeleteMesureTypeAsync(int mesureTypeId)
        {
            await _repository.DeleteAsync(mesureTypeId);
        }

        public async Task EditMesureTypeAsync(MesureType mesureType)
        {
            await _repository.UpdateAsync(mesureType);
        }

        public async Task<MesureType> GetMesureTypeAsync(int mesureTypeId)
        {
            return await _repository.GetAsync(mesureTypeId);
        }

        public async Task<List<MesureType>> GetMesureTypesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }
    }
}
