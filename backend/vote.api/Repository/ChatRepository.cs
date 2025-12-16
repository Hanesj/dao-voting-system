using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using vote.api.Data;
using vote.api.Dtos;
using vote.api.Hubs;
using vote.api.Interfaces;
using vote.api.Models;

namespace vote.api.Repository;

public class ChatRepository : IChatRepository
{

    private readonly AppDBContext _context;
    private readonly IHubContext<ChatHub> _hubContext;
    public ChatRepository(AppDBContext context, IHubContext<ChatHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;

    }
    public async Task<List<ChatMessageDto>> JoinOrCreateChatRoomAsync(string userName, string chatRoom)
    {
        var roomExists = await _context.ChatRooms.AnyAsync(cr => cr.ChatRoomTitle == chatRoom);

        if (!roomExists)
        {
            await _context.ChatRooms.AddAsync(new ChatRoom
            {
                ChatRoomTitle = chatRoom,

            });
            await _context.SaveChangesAsync();
        }
        var chatRoomId = await _context.ChatRooms.FirstOrDefaultAsync(c => c.ChatRoomTitle == chatRoom);
        if (chatRoomId == null)
        {
            return null;
        }
        var chats = await _context.Chats.Where(c => c.ChatRoomId == chatRoomId.Id).Select(c => new ChatMessageDto
        {
            Message = c.Message,
            UserName = c.UserName
        }).ToListAsync();

        string readableChat = string.Join(Environment.NewLine, chats);
        return chats;
    }

    public async Task<Chat> SaveChatAsync(string userName, string message, string chatRoom)
    {
        var chatRoomId = await _context.ChatRooms.FirstOrDefaultAsync(c => c.ChatRoomTitle == chatRoom);
        if (chatRoomId != null)
        {

            var chat = new Chat
            {
                Message = message,
                UserName = userName,
                ChatRoomId = chatRoomId.Id,
            };
            await _context.Chats.AddAsync(chat);
            await _context.SaveChangesAsync();
            return chat;
        }
        return new Chat
        {
            UserName = userName,
            Message = "Error"
        };
    }
}