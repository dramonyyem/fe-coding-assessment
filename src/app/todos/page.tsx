'use client';
import { useEffect, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [todo, setTodo] = useState<Todo | null>(null);
  const [transition, setTransition] = useState('bg-blue-500');
  const [error, setError] = useState('');
  const [deletedId, setDeletedId] = useState<string | null>()
  const fetchTodos = async () => {
    const res = await fetch(`/api/todos`);
    const data = await res.json();
    console.log(data);
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const applyTransition = () => {
    setTransition('animationKey bg-blue-500');
    setError('border-red-500');
    setTimeout(() => {
      setTransition('bg-blue-500');
    }, 300);

  };

  const message = (id : string, title : string, completed : boolean) => {
    setIsOpen(true);
    setTodo({ id, title, completed });
    setUpdateTitle(title);
    // findTodo(id);
  };
  // const findTodo = async (id: string) => {
  //   const res = await fetch(`/api/todos?id=${id}`, {
  //     method: 'GET',
  //   });
  //   const todo = await res.json();
  //   console.log(todo);
  // };
  
  const addTodo =  async () => {
    if(title.trim() === ''){
      applyTransition();
    }else{
      const newTodo = {
        title:  title,
        completed: false,
      };
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (res.ok) {
        const addedTodo = await res.json();
        setTitle('');
        setTodos((prevTodos) => [...prevTodos, addedTodo]);
        setError('');
      } else {
        console.error('Failed to add todo');
      }

    }
  };
  const updateTodo = async (id: string, title : string, completed : boolean) => {
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, completed }),
    });
    if (res.ok) {
      const updatedTodo = await res.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setIsOpen(false);
    } else {
      console.error('Failed to update todo');
    }
  };
  // This function is used to delete a todo item
  // It sends a DELETE request to the API with the todo ID
  const deleteTodo = async (id: string) => {
    const res = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setDeletedId(id);
   
    if (res.ok) {
      setTimeout(() => {
         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }, 400)
    } else {
      console.error('Failed to delete todo');
    }
  };
  return (
    <div className="mx-auto w-8/10 lg:w-4/10 mt-5">
      <h1 className='mx-4 my-4 text-[30px] font-bold text-center underline'>
        Todo App 
      </h1>
      <div className='flex items-center justify-center mb-4'>  
        <button className={`bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-500 ${transition}`} onClick={addTodo}>
          Add Todo
        </button>
        <input type="text" placeholder='Enter task title...' className={`border border-gray-300 bg-white rounded-lg p-2 ${error}`} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
        {/* <button className={`px-4 py-2 mx-2 rounded text-white `} onClick={applyTransition}>
          Add Todo
        </button> */}
      <div className='px-4 py-2'>
      <div className="flex items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {todos.map((todo) => (
          <div  key={todo.id}>
            <div className={`scale-animation bg-white drop-shadow-lg hover:cursor-pointer hover:text-white hover:bg-blue-500 h-[100px] items-center justify-between p-2 rounded-lg shadow-sm ${deletedId === todo.id ? 'scale-out-animation' : ''}`}>
              <div>
                <div>
                  <b>
                    {todo.title}
                  </b>
                </div>
                <span >
                  {todo.completed ? 'completed' : 'not completed'}
                </span>
              
                <br />
                <button className='px-2' onClick={() => message(todo.id, todo.title, todo.completed)}> Edit </button>
                <button className='text-red-500' onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      {/* <div className='flex items-center justify-center mb-4 mt-4'>  
        <button className={`bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-500`} onClick={() => nextPage(1) }>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
            <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
          </svg>
        </button>
         <button className={`bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-500`} onClick={() => setIsOpen(true) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
              </svg>        
          </button>
      </div> */}
      {isOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)'
          }}>
            <div className='rounded-lg' style={{
              margin: '100px auto',
              background: '#fff',
              padding: 20,
              width: 400
            }}>
              <h1 className='text-[20px] font-bold mb-4'>
                Update Todo
              </h1>
              <input type="text" placeholder='Enter task title...' className='border my-2 border-gray-300 rounded-lg p-2' value={updateTitle ?? ""} onChange={(e) => setUpdateTitle(e.target.value)} />
              <br />
              <select className='border my-2 border-gray-300 rounded-lg p-2' onChange={(e) => {
                if (todo) {
                  setTodo({
                    ...todo,
                    completed: e.target.value === 'completed'
                  });
                }
              }}>
                <option value="not completed" >Not Completed</option>
                <option value="completed">Completed</option>
              </select>
              <br />
              <button
                className='px-2 py-1 bg-blue-500 text-white rounded my-2'
                onClick={() => {
                  if (todo) updateTodo(todo.id, todo.title, todo.completed);
                }}
              >Update</button>
              <button className='px-2 px-2 py-1 bg-red-500 text-white rounded mx-2 my-2' onClick={() => setIsOpen(false)}> Close </button>
            </div>
        </div>      
        )}    
    </div>
  );
};