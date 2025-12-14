using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using stock.api.Dtos;
using stock.api.Mappers;

namespace vote.api.Controllers;

[Route("/api/logs")]
[ApiController]
public class LogController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetLogs()
    {
        return Ok();
    }

    [HttpGet("/{id}")]
    public async Task<IActionResult> GetLogById([FromRoute] int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(id);
    }

    [HttpPost]
    public async Task<IActionResult> PostLog([FromBody] CreateLogDto createLogDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var logModel = createLogDto.ToLogFromCreateDto();
        System.Console.WriteLine(logModel.GetType());
        var jsonString = JsonSerializer.Serialize(logModel);
        System.Console.WriteLine(jsonString);

        return Ok(logModel.ToDtoFromLog());


    }
}