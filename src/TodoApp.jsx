import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const TodoApp = () => {
  const { user, logout, verifySession } = useContext(AuthContext);
  
  // 1. LAZY INITIALIZATION: Check local storage for existing tasks before loading
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('my_react_todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    // Default starting task if nothing is saved
    return [{ id: 1, text: "Explore my new persistent dashboard!", completed: false }];
  });

  const [input, setInput] = useState("");

  // 2. DATA PERSISTENCE: Save to local storage every time 'todos' changes
  useEffect(() => {
    localStorage.setItem('my_react_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    
    // 3. SECURITY CHECK: Ensure token is still valid before allowing a database action
    if (!verifySession()) {
      return; // verifySession will automatically log them out if invalid
    }

    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    if (!verifySession()) return;
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
     if (!verifySession()) return;
     setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between px-8 py-8 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Your Dashboard</h1>
            <p className="mt-1 font-medium text-indigo-100 text-md">Welcome back, {user?.name || 'User'}!</p>
          </div>
          <button 
            onClick={logout}
            className="px-6 py-2.5 text-sm font-bold text-indigo-600 transition-colors bg-white rounded-xl hover:bg-gray-100 shadow-sm">
            Logout
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={addTodo} className="flex gap-4 mb-8">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you need to get done?"
              className="flex-1 px-5 py-4 text-lg transition-all border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="px-8 py-4 font-bold text-white transition-all bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 hover:-translate-y-0.5">
              Add Task
            </button>
          </form>

          {todos.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="text-xl font-medium text-gray-500">You're all caught up!</p>
              <p className="mt-2 text-sm">Add a task above to get started.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li 
                  key={todo.id} 
                  className={`flex items-center justify-between p-4 transition-all border rounded-xl group hover:shadow-md ${
                    todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleTodo(todo.id)}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-indigo-500'
                    }`}>
                      {todo.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-lg transition-colors ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                      {todo.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-gray-400 transition-all opacity-0 hover:text-red-500 hover:bg-red-50 rounded-lg group-hover:opacity-100"
                    title="Delete task"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;