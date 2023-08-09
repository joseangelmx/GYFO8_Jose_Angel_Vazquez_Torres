using GymManager.Core.Members;

namespace GymManager.Api.Responses
{
    public class CityListResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public List<City> Model { get; set; }
        public string RequestId { get; set; }
    }
}
