import { Check, Trash2 } from "lucide-react";
import type { TodoItem } from "../../api/todoItem";
import { formatDateLong } from "../../lib/format";

interface ITodoItemFieldProps {
   todoItem: TodoItem;
   toggleItem: (todoItem: TodoItem) => void;
   deleteItem: (id: number) => void;
}


const TodoItemField: React.FC<ITodoItemFieldProps> = (props: ITodoItemFieldProps) => {

   const { todoItem, toggleItem, deleteItem } = props;

   return (
      <div
         key={todoItem.id}
         className={`todo-item ${todoItem.isComplete ? 'completed' : 'incomplete'}`}
      >
         <button
            onClick={() => toggleItem(todoItem)}
            className={`todo-check-button ${todoItem.isComplete ? 'completed' : 'incomplete'}`}
         >
            {todoItem.isComplete && <Check size={16} />}
         </button>

         <div className="todo-content">
            <div className={`todo-item-title ${todoItem.isComplete ? 'completed' : 'incomplete'}`}>
               {todoItem.title}
            </div>
            <div className="todo-meta">
               <span className="todo-meta-item">
                  Created: {formatDateLong(todoItem.createdOn)}
               </span>
               {todoItem.completedOn && (
                  <span className="todo-meta-item">
                     <Check size={14} />
                     Completed: {formatDateLong(todoItem.completedOn)}
                  </span>
               )}
            </div>
         </div>

         <button
            onClick={() => deleteItem(todoItem.id as number)}
            className="todo-delete-button"
         >
            <Trash2 size={18} />
         </button>
      </div>
   );
}

export default TodoItemField;