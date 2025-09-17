using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using TodoCore.Domain.DataAccess;
using TodoCore.Domain.Services;

namespace Todo.Api;

/// <summary>
/// keep all the startup builder bits in a clean format
/// </summary>
public static class AppBuilder
{
   public const string AllowCors = "AllowCors";

   public static WebApplication BuildApp(WebApplicationBuilder builder, bool isDebug)
   {
      AddAuthentication(builder);
      AddAuthorization(builder);
      AddSwagger(builder);
      AddCors(builder);
      AddLogging(builder);
      RegisterHttpClients(builder);
      RegisterDependencies(builder);
      RegisterControllers(builder);

      return builder.Build();
   }

   static void AddAuthentication(WebApplicationBuilder builder)
   {
      //todo: validate jwt token here
   }

   static void AddAuthorization(WebApplicationBuilder builder)
   {
      //todo: add custom auth here
   }

   static void AddSwagger(WebApplicationBuilder builder)
   {
      builder.Services.AddSwaggerGen(c =>
      {
         c.SwaggerDoc("v1", new OpenApiInfo
         {
            Title = "Todo API",
            Version = "v1"
         });
      });
   }

   static void AddCors(WebApplicationBuilder builder)
   {
      //Set up cors
      builder.Services.AddCors(options =>
      {
         options.AddPolicy(AllowCors,
             policyBuilder => policyBuilder
                 .WithOrigins("http://localhost:3000",
                     "http://localhost:52615")
                 .SetIsOriginAllowedToAllowWildcardSubdomains()
                 .AllowAnyMethod()
                 .AllowCredentials()
                 .AllowAnyHeader());
      });
   }

   static void AddLogging(WebApplicationBuilder builder)
   {
      builder.Services.AddLogging(logging =>
      {
         logging.AddFilter("Microsoft.Hosting.Lifetime", LogLevel.Information);
         logging.AddFilter("System", LogLevel.Warning);
         logging.AddConsole();
         logging.AddDebug();
      });
   }

   static void RegisterHttpClients(WebApplicationBuilder builder)
   {
      builder.Services.AddHttpClient();
      //todo: add any named clients here
   }


   /// <summary>
   /// single location to populate the core IoC container.
   /// </summary>
   /// <param name="services"></param>
   static void RegisterDependencies(WebApplicationBuilder builder)
   {
      //local dependencies
      builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
      
      //project dependencies
      builder.Services.AddTransient<ITodoService, TodoService>();

      //todo: add support for ServiceImplementation if looking to simplify adding dependencies

      builder.Services.AddDbContextFactory<TodoContext>(options =>
       {
          //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
          options.UseInMemoryDatabase(databaseName: "todo-dev");
       });

   }

   static void RegisterControllers(WebApplicationBuilder builder)
   {
      builder.Services
         .AddControllers()
         .AddJsonOptions(options =>
         {
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
            options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.WriteIndented = true;

         });
   }
}
