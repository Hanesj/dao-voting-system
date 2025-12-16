using System.ComponentModel.DataAnnotations.Schema;

namespace vote.api.Models;

[Table("Chats")]
public class Chat
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public int ChatRoomId { get; set; }

    public ChatRoom? ChatRoom { get; set; } = null!;
}