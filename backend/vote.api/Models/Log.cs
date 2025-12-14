namespace vote.api.Models;

public class Log
{
    public int? Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public List<string> Events { get; set; } = new List<string>();

    public DateTime DateTime { get; set; } = DateTime.UtcNow;
}