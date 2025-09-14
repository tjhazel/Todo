import type { TodoItem } from "../../api/todoItem";

interface ITodoItemFieldProps {
   todoItem: TodoItem;
   toggleCompleted: (todoItem: TodoItem) => void;
   deleteItem: (id: number) => void;
}


const TodoItemField: React.FC<ITodoItemFieldProps> = (props: ITodoItemFieldProps) => {

   const { todoItem, toggleCompleted, deleteItem } = props;

   return (
      <div>
        <input 
           type="checkbox" 
            checked={todoItem.isComplete} 
            onChange={() => toggleCompleted(todoItem)} 
         />
         <span style={{ textDecoration: todoItem.isComplete ? 'line-through' : 'none' }}>
            {todoItem.title}
         </span>
         <button onClick={() => deleteItem(todoItem.id as number)}>Delete</button>
      </div>
   );
}

export default TodoItemField;