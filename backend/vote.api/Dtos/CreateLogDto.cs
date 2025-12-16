namespace vote.api.Dtos;


public record CreateLogDto
{
    public string Title { get; set; } = string.Empty;
}