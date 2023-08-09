using GymManager.ApplicationServices;
using GymManager.ApplicationServices.Attendances;
using GymManager.ApplicationServices.EquipmentTypes;
using GymManager.ApplicationServices.Inventories;
using GymManager.ApplicationServices.Members;
using GymManager.ApplicationServices.MembershipTypes;
using GymManager.ApplicationServices.Navigation;
using GymManager.ApplicationServices.Sales;
using GymManager.ApplicationServices.Users;
using GymManager.Core.Attendances;
using GymManager.Core.EquipmentTypes;
using GymManager.Core.Inventories;
using GymManager.Core.Members;
using GymManager.Core.MembershipTypes;
using GymManager.Core.Sales;
using GymManager.DataAccess;
using GymManager.DataAccess.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) => configuration
                    .ReadFrom.Configuration(context.Configuration)
                    .ReadFrom.Services(services)
                    .Enrich.FromLogContext()
                    .WriteTo.Console());


// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(x =>
                x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//MySql Connection
string connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<GymManagerContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

//SQL Server Connection
/*builder.Services.AddDbContext<GymManagerContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultSql"));
    });*/


builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<GymManagerContext>();

builder.Services.AddSwaggerGen(option =>
{
    option.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter your token in the text input below.\r\n",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });

    option.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id=JwtBearerDefaults.AuthenticationScheme
                }
            },
            new string[]{}
        }
    });
});

builder.Services
    .AddHttpContextAccessor()
    .AddAuthorization()
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.ConfigureApplicationCookie(options => options.LoginPath = "/Account/Login");

builder.Services.AddAutoMapper(typeof(MapperProfile));

builder.Services.AddTransient<IMembersAppService, MembersAppService>();
builder.Services.AddTransient<ICitiesAppService, CitiesAppService>();
builder.Services.AddTransient<IMenuAppService, MenuAppService>();
builder.Services.AddTransient<IMembershipTypesAppService, MembershipTypesAppService>();
builder.Services.AddTransient<IMesureTypeAppService, MesureTypeAppService>();
builder.Services.AddTransient<IProductTypeAppService, ProductTypeAppService>();
builder.Services.AddTransient<IInventoryAppService, InventoryAppService>();
builder.Services.AddTransient<IEquipmentTypeAppService, EquipmentTypeAppService>();
builder.Services.AddTransient<ISaleAppService, SaleAppService>();
builder.Services.AddTransient<ISalesInventoryAppService, SalesInventoryAppService>();
builder.Services.AddTransient<IAttendanceAppService, AttendanceAppService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddTransient<IRepository<int, Member>, MembersRepository>();
builder.Services.AddTransient<IRepository<int, City>, Repository<int, City>>();
builder.Services.AddTransient<IRepository<int, MembershipType>, Repository<int, MembershipType>>();
builder.Services.AddTransient<IRepository<int, MesureType>, Repository<int, MesureType>>();
builder.Services.AddTransient<IRepository<int, ProductType>, Repository<int, ProductType>>();
builder.Services.AddTransient<IRepository<int, Inventory>, Repository<int, Inventory>>();
builder.Services.AddTransient<IRepository<int, EquipmentType>, Repository<int, EquipmentType>>();
builder.Services.AddTransient<IRepository<int, Sale>, Repository<int, Sale>>();
builder.Services.AddTransient<IRepository<int, SalesInventory>, Repository<int, SalesInventory>>();
builder.Services.AddTransient<IRepository<int, Attendance>, AttendaceRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<GymManagerContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
