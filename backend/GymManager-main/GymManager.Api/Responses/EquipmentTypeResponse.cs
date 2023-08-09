using GymManager.Core.EquipmentTypes;

namespace GymManager.Api.Responses
{
    public class EquipmentTypeResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public EquipmentType Model { get; set; }
        public string RequestId { get; set; }
    }
}
