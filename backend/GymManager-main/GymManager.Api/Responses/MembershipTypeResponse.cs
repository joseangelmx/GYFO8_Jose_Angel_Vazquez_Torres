using GymManager.Core.MembershipTypes;

namespace GymManager.Api.Responses
{
    public class MembershipTypeResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public MembershipType Model { get; set; }
        public string RequestId { get; set; }
    }
}
