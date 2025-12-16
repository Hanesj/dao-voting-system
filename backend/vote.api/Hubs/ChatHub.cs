using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using vote.api.Data;
using vote.api.Dtos;
using vote.api.Interfaces;
using vote.api.Mappers;
using vote.api.Models;
namespace vote.api.Hubs;

public class ChatHub : Hub
{
    private readonly AppDBContext _context;
    private readonly IChatRepository _chatRepo;
    public ChatHub(AppDBContext context, IChatRepository chatRepo)
    {
        _context = context;
        _chatRepo = chatRepo;
    }
    public async Task SendMessage(string userName, string message, string chatRoom)
    {
        var saveChat = await _chatRepo.SaveChatAsync(userName, message, chatRoom);

        var chatDto = saveChat.ChatToDto();

        await Clients.Group(chatRoom).SendAsync("ReceiveMessage", chatDto.UserName, chatDto.Message);
    }

    public async Task JoinChatRoom(string userName, string chatRoom)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom);

        var chats = await _chatRepo.JoinOrCreateChatRoomAsync(userName, chatRoom);
        await Clients.OthersInGroup(chatRoom).SendAsync("ReceiveMessage", userName, " has joined.");

        await Clients.Caller.SendAsync("ReceiveHistory", chats);


        // await Clients.Group(chatRoom).SendAsync("ReceiveMessage", "admin", $"{userName} has joined {chatRoom}, previous chats:\n {readableChat}");
    }
}