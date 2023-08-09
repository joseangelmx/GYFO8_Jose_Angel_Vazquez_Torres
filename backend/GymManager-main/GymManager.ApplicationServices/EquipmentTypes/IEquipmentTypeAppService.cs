using GymManager.Core.EquipmentTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.EquipmentTypes
{
    public interface IEquipmentTypeAppService
    {
        Task<List<EquipmentType>> GetEquipmentTypesAsync();

        Task<int> AddEquipmentTypeAsync(EquipmentType equipmentType);

        Task DeleteEquipmentTypeAsync(int equipmentTypeId);

        Task EditEquipmentTypeAsync(EquipmentType equipmentType);

        Task<EquipmentType> GetEquipmentTypeAsync(int equipmentTypeId);
    }
}
