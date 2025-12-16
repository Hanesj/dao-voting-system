using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using vote.api.Data;
using vote.api.Dtos;
using vote.api.Models;
namespace vote.api.Hubs;

public class ChatHub : Hub
{
    private readonly AppDBContext _context;
    public ChatHub(AppDBContext context)
    {
        _context = context;
    }
    public async Task SendMessage(string userName, string message, string chatRoom)
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
            await Clients.Group(chatRoom).SendAsync("ReceiveMessage", userName, message);
        }
    }
    public async Task JoinChatRoom(string userName, string chatRoom)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom);

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
        await Clients.OthersInGroup(chatRoom).SendAsync("ReceiveMessage", userName, " has joined.");
        if (chatRoomId != null)
        {
            var chats = await _context.Chats.Where(c => c.ChatRoomId == chatRoomId.Id).Select(c => new ChatMessageDto
            {
                Message = c.Message,
                UserName = c.UserName
            }).ToListAsync();

            string readableChat = string.Join(Environment.NewLine, chats);
            await Clients.Caller.SendAsync("ReceiveHistory", chats);

        }


        // await Clients.Group(chatRoom).SendAsync("ReceiveMessage", "admin", $"{userName} has joined {chatRoom}, previous chats:\n {readableChat}");
    }
}