using GymManager.ApplicationServices.DTOs.Members;
using GymManager.Core.Members;

namespace GymManager.Api.Responses
{
    public class MemberResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public MemberDto Model { get; set; }
        public string RequestId { get; set; }
    }
}