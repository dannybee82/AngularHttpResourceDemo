using ExampleAvatarRepository;
using ExampleAvatarRepository.Repository;
using ExampleAvatarService.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//For PostgreSQL Databases and DateTime.
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Add DbContext.
var dbConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<MainDbContext>(options => options.UseNpgsql(dbConnectionString));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApi", Version = "v1" });
});

// Enable CORS
// Cross-Origin 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
        builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

// Register database-layers (repositories).
builder.Services.AddScoped<IAvatarPersonRepository, AvatarPersonRepository>();
builder.Services.AddScoped<IAvatarImageRepository, AvatarImageRepository>();
builder.Services.AddScoped<IAvatarCharacteristicRepository, AvatarCharacteristicRepository>();

// Register services.
builder.Services.AddScoped<IAvatarPersonService, AvatarPersonService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
