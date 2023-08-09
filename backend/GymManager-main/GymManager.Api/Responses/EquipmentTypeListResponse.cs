
using GymManager.Core.EquipmentTypes;

namespace GymManager.Api.Responses
{
    public class EquipmentTypeListResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public List<EquipmentType> Model { get; set; }
        public string RequestId { get; set; }
    }
}
