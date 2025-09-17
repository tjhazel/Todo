using Microsoft.EntityFrameworkCore;
using Todo.Api;
using TodoCore.Domain.DataAccess;


var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

var app = AppBuilder.BuildApp(builder, builder.Environment.EnvironmentName == "Development");

app.MapDefaultEndpoints();

# region data-seeding
using (var scope = app.Services.CreateScope())
{
   // https://learn.microsoft.com/en-us/ef/core/modeling/data-seeding
   var dbContextFactory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<TodoContext>>();
   using var context = await dbContextFactory.CreateDbContextAsync();
   context.Database.EnsureCreated();
}
# endregion

//Expose Swagger UI
app.UseSwagger();
app.UseSwaggerUI(options =>
{
   //Expose ui as site root
   options.RoutePrefix = string.Empty;

   options.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API");
});

// Configure the HTTP request pipeline.
app.UseCors(AppBuilder.AllowCors);

app.UseHttpsRedirection();

app.UsePathBase("/api");

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
