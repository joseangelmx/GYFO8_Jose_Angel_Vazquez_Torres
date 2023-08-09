using GymManager.ApplicationServices.EquipmentTypes;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using GymManager.ApplicationServices.DTOs.EquipmentTypes;
using GymManager.Api.Responses;
using GymManager.ApplicationServices.DTOs.Members;
using GymManager.Core.Members;
using GymManager.Core.EquipmentTypes;

namespace GymManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentTypesController : ControllerBase
    {
        private readonly IEquipmentTypeAppService _equipmentTypeAppService;
        private readonly IMapper _mapper;
        public EquipmentTypesController(IEquipmentTypeAppService equipmentTypeAppService, IMapper mapper)
        {
            _equipmentTypeAppService = equipmentTypeAppService;
            _mapper = mapper;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<EquipmentTypeListResponse> Get()
        {
            return new EquipmentTypeListResponse
            {
                HasError = false,
                Message = "List of Equipment Types returned",
                Model = await _equipmentTypeAppService.GetEquipmentTypesAsync(),
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<EquipmentTypeResponse> Get(int id)
        {
            return new EquipmentTypeResponse
            {
                HasError = false,
                Message = "Equipment Type Returned",
                Model = await _equipmentTypeAppService.GetEquipmentTypeAsync(id),
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewEquipmentTypeDto value)
        {
            var type = _mapper.Map<EquipmentType>(value);

            if (ModelState.IsValid)
            {
                await _equipmentTypeAppService.AddEquipmentTypeAsync(type);
                return Ok(new
                {
                    hasError = false,
                    message = "Equipment Type Registered",
                    model = await _equipmentTypeAppService.GetEquipmentTypesAsync(),
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
        public async Task<IActionResult> Put(int id, [FromBody] EditEquipmentTypeDto value)
        {
            var city = _mapper.Map<EquipmentType>(value);
            city.Id = id;
            if (ModelState.IsValid)
            {
                await _equipmentTypeAppService.EditEquipmentTypeAsync(city);
                return Ok(new
                {
                    hasError = false,
                    message = "Equipment Type Updated",
                    model = await _equipmentTypeAppService.GetEquipmentTypesAsync(),
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
                await _equipmentTypeAppService.DeleteEquipmentTypeAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "Equipment Type Deleted",
                    model = await _equipmentTypeAppService.GetEquipmentTypesAsync(),
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
