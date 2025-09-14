import { useEffect, useMemo, useState } from 'react';
import { useTodoItems, createTodoItem, updateTodoItem, deleteTodoItem } from "../../api/todoFetcher";
import type { TodoItem } from "../../api/todoItem";
import Spinner from "../spinner/spinner";
import TodoItemField from "./TodoItemField";

interface ITodoListProps {
   placeholder?: boolean;
}


const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {

   console.log('props', props);

   const { data: todos, error, isLoading } = useTodoItems();

   const [isSaving, setIsSaving] = useState(false);
   const [fieldError, setFieldError] = useState('');

   const [newTodoTitle, setNewTodoTitle] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

   const filteredTodos = useMemo(() => {
      switch (filter) {
         case 'active':
            return todos?.filter(todo => !todo.isComplete) ?? [];
         case 'completed':
            return todos?.filter(todo => todo.isComplete) ?? [];
         default:
            return todos ?? [];
      }
   }, [todos, filter]);

   // Calculate pagination
   const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentTodos = filteredTodos.slice(startIndex, endIndex);

   // Reset to page 1 when filter changes
   useEffect(() => {
      setCurrentPage(1);
   }, [filter]);


   const handleAdd = async () => {
      setIsSaving(true);

      const item = { title: newTodoTitle, createdOn: new Date(), isComplete: false } as TodoItem;

      await createTodoItem(item)
         .then(() => {
            reset();
         })
         .catch(err => setFieldError(`Failed to add new Item: ${err}`))
         .finally(() => {
            setIsSaving(false);
         });
   };

   const goToPage = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
   };

   const reset = () => {
      setNewTodoTitle('');
      setFieldError('');
   };

   const handleDelete = async (id: number) => {
      await deleteTodoItem(id)
         .then(() => {
            reset();
         })
         .catch(err => setFieldError(`Failed to delete Item: ${err}`))
         .finally(() => {
            setIsSaving(false);
         });
   };

   const handleToggleCompleted = async (item: TodoItem) => {
      const nextIsComplete = !item.isComplete;
      item.isComplete = nextIsComplete;
      item.completedOn = nextIsComplete ? new Date() : undefined;
      
      await updateTodoItem(item)
         .then(() => {
            reset();
         })
         .catch(err => setFieldError(`Failed to update Item: ${err}`))
         .finally(() => {
            setIsSaving(false);
         });
   };

   if (isLoading || isSaving)
      return <Spinner />

   if (error)
      return <p style={{ color: 'red' }}>Error: {error}</p>;

   if (!filteredTodos)
      return <p>No data available.</p>;

   return (
      <div>
         {fieldError &&
            <p style={{ color: 'red' }}>{fieldError}</p>
         }

         <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new todo item"
         />
         <button onClick={handleAdd}>Add Todo Item</button>


         {dataPage?.map((item: TodoItem) => (
            <div key={item.id}>
               <TodoItemField
                  todoItem={item}
                  toggleCompleted={() => handleToggleCompleted(item)}
                  deleteItem={handleDelete}
               />
            </div>
         ))}
      </div>
   );
}

   export default TodoList;