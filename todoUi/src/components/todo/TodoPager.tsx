import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ITodoPagerProps {
   filteredItemCount: number;
   totalPages: number;
   startIndex: number;
   endIndex: number;
   currentPage: number;
   goToPage: (page: number) => void;
   disable: boolean;
}

/*
normally I would use one from antd\semanticui\flavor of the week.
*/
const TodoPager: React.FC<ITodoPagerProps> = (props: ITodoPagerProps) => {

   const { filteredItemCount, totalPages, startIndex, endIndex, currentPage, goToPage, disable } = props;

   return (
   <div className="todo-pagination">
      <div className="todo-pagination-info">
         Showing {startIndex + 1}-{Math.min(endIndex, filteredItemCount)} of {filteredItemCount} todos
      </div>

      <div className="todo-pagination-controls">
         <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1 || disable}
            className="todo-pagination-button"
         >
            <ChevronLeft size={18} />
         </button>

         <div className="todo-page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
               <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`todo-page-number ${page === currentPage ? 'active' : 'inactive'}`}
                  disabled={disable}
               >
                  {page}
               </button>
            ))}
         </div>

         <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || disable}
            className="todo-pagination-button"
         >
            <ChevronRight size={18} />
         </button>
      </div>
   </div>
   );
}

export default TodoPager;