import { useEffect, useMemo, useState } from 'react';
import { useTodoItems, createTodoItem, updateTodoItem, deleteTodoItem } from "../../api/todoFetcher";
import type { TodoItem } from "../../api/todoItem";
import Spinner from "../spinner/spinner";
import { Plus } from 'lucide-react';
import { dateComparer } from '../../lib/comparer';
import './todo.css';
import TodoItemField from './TodoItemField';
import TodoPager from './TodoPager';

interface ITodoListProps {
   placeholder?: boolean;
}


const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {

   console.log('props', props);

   const { data: todos, error: apiError, isLoading } = useTodoItems();

   const [isSaving, setIsSaving] = useState(false);
   const [error, setError] = useState('');

   const [newTodoTitle, setNewTodoTitle] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, ] = useState(5);
   const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
   const [sort, setSort] = useState<'asc' | 'desc'>('asc');

   const filteredTodos = useMemo(() => {

      todos?.sort((a, b) => sort === 'asc' ?
         dateComparer(a.createdOn, b.createdOn) :
         dateComparer(b.createdOn, a.createdOn));

      switch (filter) {
         case 'active':
            return todos?.filter(todo => !todo.isComplete) ?? [];
         case 'completed':
            return todos?.filter(todo => todo.isComplete) ?? [];
         default:
            return todos ?? [];
      }
   }, [todos, filter, sort]);

   useEffect(() => {
      setError(apiError);
   }, [apiError]);

   // Calculate pagination
   const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentTodos = filteredTodos.slice(startIndex, endIndex);

   // Reset to page 1 when filter changes
   useEffect(() => {
      setCurrentPage(1);
   }, [filter]);


   const goToPage = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
   };

   const reset = () => {
      setNewTodoTitle('');
      setError('');
   };

   const handleAdd = async () => {
      setIsSaving(true);

      const item = { title: newTodoTitle, createdOn: new Date(), isComplete: false } as TodoItem;

      await createTodoItem(item)
         .then(() => {
            reset();
         })
         .catch(err => setError(`Failed to add new Item: ${err}`))
         .finally(() => {
            setIsSaving(false);
         });
   };

   const handleDelete = async (id: number) => {
      setIsSaving(true);

      await deleteTodoItem(id)
         .then(() => {
            reset();
         })
         .catch(err => setError(`Failed to delete Item: ${err}`))
         .finally(() => {
            setIsSaving(false);
         });
   };

   const handleToggleCompleted = async (item: TodoItem) => {
      setIsSaving(true);
      const nextIsComplete = !item.isComplete;
      item.isComplete = nextIsComplete;
      item.completedOn = nextIsComplete ? new Date() : undefined;
      
      await updateTodoItem(item)
         .then(() => {
            reset();
         })
         .catch(err => setError(`Failed to update Item: ${err}`))
         .finally(() => {
            setIsSaving(false);
         });
   };

   if (isLoading)
      return <Spinner />

   return (
      <div className="todo-container">

         {/* Error display */}
         {error && (
            <div className="todo-error">
               <div className="todo-error-text">
                  <strong>Error:</strong> {error}
               </div>
               <button
                  onClick={() => setError('')}
                  className="todo-close-button"
               >
                  ×
               </button>
            </div>
         )}

         {/* Add new todo */}
         <div className="todo-add-section">
            <input
               type="text"
               value={newTodoTitle}
               onChange={(e) => setNewTodoTitle(e.target.value)}
               onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
               placeholder="Add a new todo..."
               className="todo-input"
            />
            <button
               onClick={handleAdd}
               className="todo-add-button"
               disabled={isSaving}
            >
               <Plus size={20} />
               Add
            </button>
         </div>

         {/* Filter & Sort buttons */}
         <div className='flex-row'>
            <div className="todo-filter-section">
               {(['all', 'active', 'completed'] as const).map((filterType) => (
                  <button
                     key={filterType}
                     onClick={() => setFilter(filterType)}
                     className={`todo-filter-button ${filter === filterType ? 'active' : 'inactive'}`}
                     disabled={isSaving}
                  >
                     {filterType}
                  </button>
               ))}
            </div>
            <div className="todo-filter-section">
            <button
               onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
                  className={`todo-filter-button active`}
                  disabled={isSaving}
            >
               {sort}
               </button>
            </div>
         </div>

         {/* Todo list */}
         <div className="todo-list">
            {currentTodos.length === 0 ? (
               <div className="todo-empty-state">
                  {filteredTodos.length === 0 ? 'No todos found' : 'No todos on this page'}
               </div>
            ) : (
                  currentTodos.map((todo) => (
                     <TodoItemField todoItem={todo} toggleItem={handleToggleCompleted} deleteItem={handleDelete} />
               ))
            )}
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
            <TodoPager
               filteredItemCount={filteredTodos.length}
               totalPages={totalPages}
               startIndex={startIndex}
               endIndex={endIndex}
               currentPage={currentPage}
               goToPage={goToPage}
               disable={isSaving}
            />
         )}
      </div>
   );
}

   export default TodoList;