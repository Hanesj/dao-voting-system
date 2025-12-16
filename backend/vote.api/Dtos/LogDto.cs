namespace vote.api.Dtos;

public record LogDto
{
    public string Title { get; set; } = string.Empty;

    public List<string> Events { get; set; } = new List<string>();

    public DateTime DateTime { get; set; } = DateTime.UtcNow;
}