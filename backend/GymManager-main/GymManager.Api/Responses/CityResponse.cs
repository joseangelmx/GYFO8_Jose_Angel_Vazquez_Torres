using GymManager.Core.Members;

namespace GymManager.Api.Responses
{
    public class CityResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public City Model { get; set; }
        public string RequestId { get; set; }
    }
}
