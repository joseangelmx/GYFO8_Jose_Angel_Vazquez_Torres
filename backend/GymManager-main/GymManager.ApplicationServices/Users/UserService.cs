using AutoMapper;
using GymManager.ApplicationServices.DTOs.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GymManager.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace GymManager.ApplicationServices.Users
{
    public class UserService: IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly GymManagerContext _context;
        private readonly IMapper _mapper;
        public UserService(UserManager<IdentityUser> userManager, GymManagerContext context, IMapper mapper)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            List<IdentityUser> users = await _userManager.Users.ToListAsync();

            List<UserDto> usersDto = new List<UserDto>();

            foreach (var user in users)
            {
                usersDto.Add(_mapper.Map<UserDto>(user));
            }

            return usersDto;
        }

        public async Task<UserDto> GetUserAsync(string id)
        {
            IdentityUser user = await _userManager.Users.Where(x => x.Id == id).FirstOrDefaultAsync();

            UserDto userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }

        public async Task<IdentityResult> AddUserAsync(NewUserDto userDto)
        {
            var result = await _userManager.CreateAsync(new IdentityUser
            {
                Email = userDto.Email,
                EmailConfirmed = true,
                UserName = userDto.Email,
                PhoneNumber = userDto.PhoneNumber
            }, userDto.Password);

            return result;

        }

        public async Task EditUserAsync(string id, EditUserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            user.PhoneNumber = userDto.PhoneNumber;


            UserStore<IdentityUser> store = new UserStore<IdentityUser>(_context);
            /* if (!userDto.Password.Equals("") || !userDto.Equals(null))
             {
                 string hashedNewPassword = _userManager.PasswordHasher.HashPassword(user, userDto.Password);
                 await store.SetPasswordHashAsync(user, hashedNewPassword);
             }*/
            await store.UpdateAsync(user);
        }

        public async Task DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            UserStore<IdentityUser> store = new UserStore<IdentityUser>(_context);
            await store.DeleteAsync(user);

        }
    }
}
