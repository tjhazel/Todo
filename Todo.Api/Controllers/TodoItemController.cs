using Microsoft.AspNetCore.Mvc;
using TodoCore.Domain.Models;
using TodoCore.Domain.Services;

namespace Todo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoItemController(ITodoService todoService) : Controller
{
   private readonly ITodoService _todoService = todoService;

   [HttpPost]
   public async Task<TodoItem> Create(TodoItem item)
   {
      return await _todoService.Create(item);
   }

   [HttpGet]
   public async Task<IEnumerable<TodoItem>> Get()
   {
      return await _todoService.GetAll();
   }

   [HttpGet, Route("{id}")]
   public async Task<TodoItem> Get(int id)
   {
      return await _todoService.Get(id);
   }

   [HttpPut]
   public async Task<bool> Update(TodoItem item)
   {
      return await _todoService.Update(item);
   }

   [HttpDelete, Route("{id}")]
   public async Task<bool> Delete(int id)
   {
      return await _todoService.Delete(id);
   }

}
