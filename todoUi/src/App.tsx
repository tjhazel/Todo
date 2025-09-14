import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import TodoList from './components/todo/TodoList';
import './App.css';

function App() {

  return (
    <>
        <div className='flex-row'>
           <div>
              <img src={viteLogo} className="logo" alt="Vite logo" />
           </div>
           <h1>Todo list</h1>
           <div>
              <img src={reactLogo} className="logo react" alt="React logo" />
           </div>
      </div>
      <div className="card">
        <TodoList />
      </div>
    </>
  )
}

export default App
