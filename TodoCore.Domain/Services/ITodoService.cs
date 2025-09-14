using TodoCore.Domain.Models;

namespace TodoCore.Domain.Services;

public interface ITodoService
{
   Task<TodoItem> Create(TodoItem item);
   Task<IEnumerable<TodoItem>> GetAll();
   Task<TodoItem> Get(int id);
   Task<bool> Update(TodoItem item);
   Task<bool> Delete(int id);
}
