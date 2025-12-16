using System.ComponentModel.DataAnnotations.Schema;

namespace vote.api.Models;

[Table("ChatRooms")]
public class ChatRoom
{
    public int Id { get; set; }
    public string ChatRoomTitle { get; set; } = string.Empty;

    public List<Chat> Messages = new List<Chat>();


}