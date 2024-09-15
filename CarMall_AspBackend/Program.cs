using carManagement.Data;
using carManagement.Interface;
using carManagement.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework Core with SQL Server

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "FallbackConnectionString";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySQL(connectionString);

});
// Register application services
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IBranch,BranchService>();
builder.Services.AddScoped<IRole, RoleService>();
builder.Services.AddScoped<IOrder, OrderService>();
builder.Services.AddScoped<ICar, CarService>();
builder.Services.AddScoped<IInventory, InventoryService>();
builder.Services.AddScoped<ITransaction, TransactionService>();

// Add authentication and authorization if needed
// builder.Services.AddAuthentication(...);
// builder.Services.AddAuthorization(...);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
