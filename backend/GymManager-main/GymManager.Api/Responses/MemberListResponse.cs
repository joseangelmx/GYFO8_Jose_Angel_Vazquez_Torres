using GymManager.ApplicationServices.DTOs.Members;
using GymManager.Core.Members;

namespace GymManager.Api.Responses
{
    public class MemberListResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public List<MemberDto> Model { get; set; }
        public string RequestId { get; set; }
    }
}
