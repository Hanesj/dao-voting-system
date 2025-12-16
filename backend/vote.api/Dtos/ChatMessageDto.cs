namespace vote.api.Dtos;

public record ChatMessageDto
{
    public string UserName { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}