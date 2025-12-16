using vote.api.Dtos;
using vote.api.Models;

namespace vote.api.Mappers;

public static class ChatMapper
{
    public static ChatMessageDto ChatToDto(this Chat chat)
    {
        return new ChatMessageDto
        { Message = chat.Message, UserName = chat.UserName };
    }
}