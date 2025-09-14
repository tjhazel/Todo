using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoCore.Domain.DataAccess;
using TodoCore.Domain.Models;

namespace TodoCore.Domain.Services;

/// <summary>
/// Simple service - looks like a good candidate for a repository pattern. Overkill for this application
/// </summary>
/// <param name="dbContextFactory"></param>
public class TodoService(ILogger<TodoService> logger,
   IDbContextFactory<TodoContext> dbContextFactory): ITodoService
{
   private readonly ILogger<TodoService> _logger = logger;
   private readonly IDbContextFactory<TodoContext> _dbContextFactory = dbContextFactory;

   public async Task<TodoItem> Create(TodoItem item)
   {
      using var context = await _dbContextFactory.CreateDbContextAsync();
      context.TodoItems.Add(item);
      await context.SaveChangesAsync();
      return item;
   }

   public async Task<IEnumerable<TodoItem>> GetAll()
   {
      using var context = await _dbContextFactory.CreateDbContextAsync();
      return await context.TodoItems.ToListAsync();
   }

   public async Task<TodoItem> Get(int id)
   {
      using var context = await _dbContextFactory.CreateDbContextAsync();
      var item = await context.TodoItems.FindAsync(id);
      ArgumentNullException.ThrowIfNull(item, nameof(id));
      return item;
   }

   public async Task<bool> Update(TodoItem item)
   {
      using var context = await _dbContextFactory.CreateDbContextAsync();
      context.Entry(item).State = EntityState.Modified;
      try
      {
         await context.SaveChangesAsync();
         return true;
      }
      catch (DbUpdateConcurrencyException)
      {
         if (!await context.TodoItems.AnyAsync(e => e.Id == item.Id))
         {
            return false; // not found
         }
         throw; // Re-throw other concurrency exceptions
      }
   }

   public async Task<bool> Delete(int id)
   {
      _logger.LogInformation($"Deleting TodoItem.Id {id}");

      using var context = await _dbContextFactory.CreateDbContextAsync();
      var item = await context.TodoItems.FindAsync(id);
      if (!await context.TodoItems.AnyAsync(e => e.Id == item.Id))
      {
         return false; // not found
      }
      context.TodoItems.Remove(item);
      await context.SaveChangesAsync();
      return true;
   }
}
