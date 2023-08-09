using GymManager.Api.Models;
using GymManager.ApplicationServices.DTOs.Models;
using GymManager.ApplicationServices.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IUserService userService, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _userService = userService;

            /*if (!_userManager.Users.Any()) 
            {

                var result = _userManager.CreateAsync(new IdentityUser { 
                    Email = "jesusduranr202@gmail.com",
                    EmailConfirmed = true,
                    UserName = "jesusduranr202@gmail.com"
                }, "Password.1").Result;

            }

            if (!_roleManager.Roles.Any()) 
            { 
                _roleManager.CreateAsync(new IdentityRole
                {
                    Name = "AnotherRole"
                });

                //userManager.AddToRoleAsync(newUser, "Admin");
            }*/
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);

            if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                return Ok(new
                {
                    hasError = true,
                    message = "User Unauthorized",
                    model = new { title= "User Unauthorized, password or/and user are incorrct" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }

            var roles = await _userManager.GetRolesAsync(user);

            // Generamos un token según los claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Sid, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(720),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

            return Ok(new
            {
                hasError = false,
                message = "Authorized",
                model = new { AccessToken = jwt },
                requestId = System.Diagnostics.Activity.Current?.Id
            });
            /*string returnUrl = string.IsNullOrEmpty(Request.Query["returnUrl"]) ? Url.Content("~/") : Request.Query["returnUrl"];

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, true, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    //var user = _userManager.FindByEmailAsync(login.Email);
                    //var userDto = _mapper.Map<UserDto>(user);

                    var users = await _userService.GetUsersAsync();
                    var user = users.FirstOrDefault(x => x.Email == request.UserName);

                    return Ok(new
                    {
                        hasError = false,
                        message = "Authorized",
                        model = user,
                        requestId = System.Diagnostics.Activity.Current?.Id
                    });
                }

                if (result.IsLockedOut)
                {
                    return Ok(new
                    {
                        hasError = true,
                        message = "User is locked",
                        model = new { title = "Locked", message = "This user is locked, too many attemps" },
                        requestId = System.Diagnostics.Activity.Current?.Id
                    });
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return Ok(new
                    {
                        hasError = true,
                        message = "User unauthorized",
                        model = new { title = "Unauthorized", message = "Your user or/and password are wrong" },
                        requestId = System.Diagnostics.Activity.Current?.Id
                    });
                }

            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }*/
        }
    }
}
