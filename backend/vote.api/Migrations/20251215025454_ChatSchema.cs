using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace vote.api.Migrations
{
    /// <inheritdoc />
    public partial class ChatSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "chatroomtitle",
                table: "chats",
                newName: "username");

            migrationBuilder.AddColumn<int>(
                name: "chatroomid",
                table: "chats",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "message",
                table: "chats",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "chatrooms",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    chatroomtitle = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chatrooms", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_chats_chatroomid",
                table: "chats",
                column: "chatroomid");

            migrationBuilder.AddForeignKey(
                name: "FK_chats_chatrooms_chatroomid",
                table: "chats",
                column: "chatroomid",
                principalTable: "chatrooms",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_chats_chatrooms_chatroomid",
                table: "chats");

            migrationBuilder.DropTable(
                name: "chatrooms");

            migrationBuilder.DropIndex(
                name: "IX_chats_chatroomid",
                table: "chats");

            migrationBuilder.DropColumn(
                name: "chatroomid",
                table: "chats");

            migrationBuilder.DropColumn(
                name: "message",
                table: "chats");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "chats",
                newName: "chatroomtitle");
        }
    }
}
