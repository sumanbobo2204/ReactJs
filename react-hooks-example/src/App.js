import React, { useState } from 'react';
import './App.css';


// this is functional Todo cmponent
function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    <div className="todo" style={{ textDecoration: todo.completed ? "line-through" : "" }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>complete</button>
        <button onClick={() => deleteTodo(index)}>X</button>
      </div>
    </div>
  );
}


// this is functional TodoForm component
function TodoForm({ addTodo }) {

  const [todoText, setTodoText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (!todoText) return;
    addTodo(todoText);
    setTodoText("");
  }

  return (
    <form onSubmit={onSubmit} >
      <input type="text" className="input" value={todoText}
        onChange={e => setTodoText(e.target.value)}
      />
    </form>
  );
}



// functional component for applying reat hooks :
function App() {

  const [todos, setTodos] = useState([
    {
      text: "Learn React :)",
      completed: false
    },
    {
      text: "Play football",
      completed: false
    },
    {
      text: " work with Reactive Spring",
      completed: false
    }

  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">

        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} completeTodo={completeTodo}
            deleteTodo={deleteTodo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}


export default App;
