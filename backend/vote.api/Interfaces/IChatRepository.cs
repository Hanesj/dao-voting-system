using vote.api.Dtos;
using vote.api.Models;

namespace vote.api.Interfaces;

public interface IChatRepository
{
    Task<Chat> SaveChatAsync(string userName, string message, string chatRoom);
    Task<List<ChatMessageDto>> JoinOrCreateChatRoomAsync(string userName, string chatRoom);
}