using GymManager.Core.MembershipTypes;

namespace GymManager.Api.Responses
{
    public class MembershipTypeListResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public List<MembershipType> Model { get; set; }
        public string RequestId { get; set; }
    }
}
