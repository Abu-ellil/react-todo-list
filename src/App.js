import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const [todoList, setTodoList] = useState(initialTodoList);
  const inputText = useRef();

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

 useEffect(() => {
   localStorage.setItem("todoList", JSON.stringify(todoList));
 }, [todoList]);

  const addTodo = () => {
    const todoText = inputText.current.value;
    if (todoText) {
      const newTodo = { text: todoText, state: true };
      setTodoList([...todoList, newTodo]);
      inputText.current.value = "";
    }
  };

  const completeTodo = (index) => {
    const newTodos = [...todoList];
    newTodos[index].state = !newTodos[index].state;
    setTodoList(newTodos);
  };

  const deleteItem = (index) => {
    const newTodos = [...todoList];
    newTodos.splice(index, 1);
    setTodoList(newTodos);
  };

  return (
    <div className="App">
      <h2>TO DO LIST</h2>
      <div className="container">
        <input ref={inputText} placeholder="add new todo..." />
        <button onClick={addTodo}>add</button>
        <ul className="list">
          {todoList.length === 0
            ? "empty list"
            : todoList.map((todo, index) => {
                return (
                  <div key={index} className="listItem">
                    <li
                      className={todo.state ? "" : "done"}
                      onClick={() => {
                        completeTodo(index);
                      }}
                    >
                      {todo.text}
                    </li>
                    <button onClick={() => deleteItem(index)}>❌</button>
                  </div>
                );
              })}
        </ul>
      </div>
    </div>
  );
}

export default App;
