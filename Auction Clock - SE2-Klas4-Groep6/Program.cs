using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Auction_Clock___SE2_Klas4_Groep6.Models;
var builder = WebApplication.CreateBuilder(args);
 
//Voeg DbContext toe met connectiestring
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "API", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("Allowvite"
    ,
    builder => builder
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader());
});

var app = builder.Build();
 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Allowvite");

app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();
 
app.Run();