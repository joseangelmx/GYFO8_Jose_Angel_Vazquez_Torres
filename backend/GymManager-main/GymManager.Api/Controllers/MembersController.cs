using GymManager.ApplicationServices.Members;
using GymManager.ApplicationServices.MembershipTypes;
using GymManager.Core.Members;
using GymManager.Core.MembershipTypes;
using GymManager.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymManager.ApplicationServices.DTOs.Members;
using AutoMapper;
using GymManager.Api.Responses;

namespace GymManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly IMembersAppService _membersAppService;
        private readonly ICitiesAppService _citiesAppService;
        private readonly IMembershipTypesAppService _membershipAppService;
        private readonly IMapper _mapper;
        public MembersController(IMembersAppService membersAppService, IMapper mapper, ICitiesAppService citiesAppService, IMembershipTypesAppService membershipAppService) 
        {
            _membersAppService = membersAppService;
            _citiesAppService = citiesAppService;
            _membershipAppService = membershipAppService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<MemberListResponse> Get()
        {
            List<Member> members = await _membersAppService.GetMembersAsync();

            List<MemberDto> membersDto = new List<MemberDto>();

            foreach(var member in members){
                membersDto.Add(_mapper.Map<MemberDto>(member));
            }
         
            return new MemberListResponse
            {
                HasError = false,
                Message = "List of Members returned",
                Model = membersDto,
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        [HttpGet("{id}")]
        public async Task<MemberResponse> Get(int id)
        {
            Member member = await _membersAppService.GetMemberAsync(id);

            MemberDto memberDto = _mapper.Map<MemberDto>(member);

            memberDto.CityId = member.City.Id;
            memberDto.MembershipTypeId = member.MembershipType.Id;
            return new MemberResponse
            {
                HasError = false,
                Message = "Member Deleted",
                Model = memberDto,
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                await _membersAppService.DeleteMemberAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "Member Deleted",
                    model = await _membersAppService.GetMembersAsync(),
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

        

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewMemberDto memberDto)
        {
            if (ModelState.IsValid)
            {
                List<MembershipType> memberships = await _membershipAppService.GetMembershipTypesAsync();
                var membership = memberships.Where(x => x.Id == memberDto.MembershipTypeId).Select(x => x.Duration);


                DateTime EndMembership = DateTime.Today.AddMonths(membership.FirstOrDefault());
                Member member = _mapper.Map<Member>(memberDto);
                member.City.Id = memberDto.CityId;
                member.MembershipType.Id = memberDto.MembershipTypeId;
                member.MembershipEnd = EndMembership;

                await _membersAppService.AddMemberAsync(member);

                return Ok(new
                {
                    hasError = false,
                    message = "Member Registered",
                    model = await _membersAppService.GetMembersAsync(),
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EditMemberDto memberDto)
        {
            if (ModelState.IsValid)
            {
                List<MembershipType> memberships = await _membershipAppService.GetMembershipTypesAsync();
                var membership = memberships.Where(x => x.Id == memberDto.MembershipTypeId).Select(x => x.Duration);

                DateTime EndMembership = DateTime.Today.AddMonths(membership.FirstOrDefault());
                Member member = _mapper.Map<Member>(memberDto);
                member.Id = id;
                member.City.Id = memberDto.CityId;
                member.MembershipType.Id = memberDto.MembershipTypeId;
                member.MembershipEnd = EndMembership;

                await _membersAppService.EditMemberAsync(member);

                return Ok(new
                {
                    hasError = false,
                    message = "Member Updated",
                    model = await _membersAppService.GetMembersAsync(),
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
