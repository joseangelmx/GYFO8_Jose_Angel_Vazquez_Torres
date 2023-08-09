using GymManager.Core.Inventories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.Inventories
{
    public interface IMesureTypeAppService
    {
        Task<List<MesureType>> GetMesureTypesAsync();

        Task<int> AddMesureTypeAsync(MesureType mesureType);

        Task DeleteMesureTypeAsync(int mesureTypeId);

        Task EditMesureTypeAsync(MesureType mesureType);
        Task<MesureType> GetMesureTypeAsync(int mesureTypeId);
    }
}
