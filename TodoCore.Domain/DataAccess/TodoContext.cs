using Microsoft.EntityFrameworkCore;
using System;
using TodoCore.Domain.Models;

namespace TodoCore.Domain.DataAccess;

public class TodoContext : DbContext
{
   public TodoContext(DbContextOptions<TodoContext> options)
      : base(options)
   {

   }

   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
      base.OnModelCreating(modelBuilder); // Call the base implementation

      //seed data for in memory db
      modelBuilder.Entity<TodoItem>().HasData(
        SeedData.GetSeedTodoList()
      );
   }

   public DbSet<TodoItem> TodoItems { get; set; } = null!;

}
