using AutoMapper;
using GymManager.Api.Responses;
using GymManager.ApplicationServices.DTOs.Members;
using GymManager.ApplicationServices.DTOs.Users;
using GymManager.ApplicationServices.Members;
using GymManager.Core.Members;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GymManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICitiesAppService _cityService;
        private readonly IMapper _mapper;

        public CityController(ICitiesAppService cityService, IMapper mapper) 
        {
            _cityService = cityService;
            _mapper = mapper;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<CityListResponse> Get()
        {
            return new CityListResponse
            {
                HasError = false,
                Message = "List of cities returned",
                Model = await _cityService.GetCitiesAsync(),
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<CityResponse> Get(int id)
        {
            return new CityResponse
            {
                HasError = false,
                Message = "City Returned",
                Model = await _cityService.GetCityAsync(id),
                RequestId = System.Diagnostics.Activity.Current?.Id
            };
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewCityDto value)
        {
            var city = _mapper.Map<City>(value);

            if (ModelState.IsValid)
            {
                await _cityService.AddCityAsync(city);
                return Ok(new
                {
                    hasError = false,
                    message = "City Registered",
                    model = await _cityService.GetCitiesAsync(),
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
        public async Task<IActionResult> Put(int id, [FromBody] EditCityDto value)
        {
            var city = _mapper.Map<City>(value);
            city.Id = id;
            if (ModelState.IsValid)
            {
                await _cityService.EditCityAsync(city);
                return Ok(new
                {
                    hasError = false,
                    message = "City Updated",
                    model = await _cityService.GetCitiesAsync(),
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
                await _cityService.DeleteCityAsync(id);
                return Ok(new
                {
                    hasError = false,
                    message = "City Deleted",
                    model = await _cityService.GetCitiesAsync(),
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
