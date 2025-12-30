using Microsoft.EntityFrameworkCore;
using vote.api.Data;
using vote.api.Hubs;
using vote.api.Interfaces;
using vote.api.Repository;
using vote.api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactFrontEnd", policy =>
    {
        policy.WithOrigins("http://localhost:5173",
        "http://10.0.0.10:3000",
        "http://frontend.lab.internal")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});
builder.Services.AddDbContext<AppDBContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IChatRepository, ChatRepository>();
builder.Services.AddHostedService<PollWatcher>();


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.UseCors("ReactFrontEnd");
app.MapHub<ChatHub>("/chathub");

app.UseHttpsRedirection();



app.Run();
