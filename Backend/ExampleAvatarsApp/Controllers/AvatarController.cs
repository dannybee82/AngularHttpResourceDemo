using ExampleAvatarService.DataTransferObjects;
using ExampleAvatarService.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExampleAvatarsApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AvatarController : ControllerBase
    {
        private readonly IAvatarPersonService _avatarPersonService;

        public AvatarController(IAvatarPersonService avatarPersonService)
        {
            _avatarPersonService = avatarPersonService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var items = await _avatarPersonService.GetAllAvatarPersons().ConfigureAwait(false);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _avatarPersonService.GetAvatarPersonById(id).ConfigureAwait(false);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("Filter")]
        public async Task<IActionResult> Filter([FromQuery] FilterDataDto filter)
        {
            try
            {
                var items = await _avatarPersonService.FilterAvatars(filter);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] AvatarPersonDto dto)
        {
            try
            {
                await _avatarPersonService.CreateAvatarPerson(dto);
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] AvatarPersonDto dto)
        {
            try
            {
                await _avatarPersonService.UpdateAvatarPerson(dto);
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _avatarPersonService.DeleteAvatarPerson(id);
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }

}