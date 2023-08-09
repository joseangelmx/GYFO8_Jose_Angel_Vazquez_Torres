using GymManager.ApplicationServices.MembershipTypes;
using GymManager.Core.MembershipTypes;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using GymManager.ApplicationServices.DTOs.MembershipTypes;
using GymManager.Api.Responses;

namespace GymManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipTypesController : ControllerBase
    {
        private readonly IMembershipTypesAppService _membershipTypesAppService;
        private readonly IMapper _mapper;

        public MembershipTypesController(IMembershipTypesAppService membershipTypeAppService, IMapper mapper)
        {
            _membershipTypesAppService = membershipTypeAppService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<MembershipTypeListResponse> Get()
        {
            return new MembershipTypeListResponse
            {
                HasError = false,
                Message = "List of Membership Types returned",
                Model = await _membershipTypesAppService.GetMembershipTypesAsync(),
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<MembershipTypeResponse> Get(int id)
        {
            return new MembershipTypeResponse
            {
                HasError = false,
                Message = "Membership Type Returned",
                Model = await _membershipTypesAppService.GetMembershipTypeAsync(id),
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewMembershipTypeDto value)
        {
            var type = _mapper.Map<MembershipType>(value);

            if (ModelState.IsValid)
            {
                await _membershipTypesAppService.AddMembershipTypesAsync(type);
                return Ok(new
                {
                    hasError = false,
                    message = "Membership Type Registered",
                    model = await _membershipTypesAppService.GetMembershipTypesAsync(),
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad Request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EditMembershipTypeDto value)
        {
            var type = _mapper.Map<MembershipType>(value);
            type.Id = id;

            if (ModelState.IsValid)
            {
                await _membershipTypesAppService.EditMembershipTypesAsync(type);
                return Ok(new
                {
                    hasError = false,
                    message = "MembershipType Updated",
                    model = await _membershipTypesAppService.GetMembershipTypesAsync(),
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad Request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                await _membershipTypesAppService.DeleteMembershipTypesAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "Membership Type Deleted",
                    model = await _membershipTypesAppService.GetMembershipTypesAsync(),
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
            else
            {
                return BadRequest(new
                {
                    hasError = true,
                    message = "Bad Request",
                    model = new { title = "Bad Request", message = "Your request is incorrect, verify it" },
                    requestId = System.Diagnostics.Activity.Current?.Id
                });
            }
        }
    }
}