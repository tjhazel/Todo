using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoCore.Domain.Models;

public class TodoItem
{
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
   public int? Id { get; set; }
   public required string Title { get; set; }
   public required DateTime CreatedOn { get; set; } = DateTime.UtcNow;

   [DefaultValue(false)]
   public bool IsComplete { get; set; } = false;
   public DateTime? CompletedOn { get; set; }

}
