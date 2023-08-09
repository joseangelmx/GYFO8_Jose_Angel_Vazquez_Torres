using GymManager.ApplicationServices.DTOs.Users;

namespace Inventario.Api.Responses
{
    public class UserListResponse
    {
        public bool HasError { get; set; }
        public string Message { get; set; }
        public List<UserDto> Model { get; set; }
        public string RequestId { get; set; }
    }
}
