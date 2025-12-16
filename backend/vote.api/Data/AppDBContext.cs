using Microsoft.EntityFrameworkCore;
using vote.api.Models;
namespace vote.api.Data;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> dbContextOptions) : base(dbContextOptions)
    {

    }
    public DbSet<ChatRoom> ChatRooms { get; set; }
    public DbSet<Chat> Chats { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        // Gör alla tabeller små bokstäver
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            entity.SetTableName(entity.GetTableName().ToLower());

            // Gör alla kolumner små bokstäver
            foreach (var property in entity.GetProperties())
            {
                property.SetColumnName(property.GetColumnName().ToLower());
            }
        }


    }
}