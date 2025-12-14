using stock.api.Dtos;
using vote.api.Models;

namespace stock.api.Mappers;

public static class LogMapper
{
    public static Log ToLogFromDto(this LogDto logDto)
    {
        return new Log
        {
            Title = logDto.Title,
        };
    }

    public static Log ToLogFromCreateDto(this CreateLogDto createLogDto)
    {
        return new Log
        {
            Title = createLogDto.Title,
            Events = new List<string> { "Hej", "Funkar?" },

        };
    }

    public static LogDto ToDtoFromLog(this Log log)
    {
        return new LogDto
        {
            Title = log.Title,
            Events = log.Events
        };
    }
}