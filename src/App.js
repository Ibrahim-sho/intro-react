import React, {useState, useRef, useEffect } from 'react'
import TodoList from "./TodoList";
import {v4 as uuidv4} from 'uuid'


const LOCAL_STORAGE_KEY = 'todoAPP.todos'


function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos) )
  },[todos])

  function toggleTodo(id) {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return

      setTodos(prevTodos  => {
        return [...prevTodos, {id: uuidv4(), name, complete: false}]
      })
      
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
  }

  return (
    <>
    <h1>My REACT ToDo App</h1>
    
    <input  ref={todoNameRef} type="text" />
    <br></br>

    <button onClick={handleAddTodo}>Add Todo</button>

    <button onClick={handleClearTodos}>Clear Completed</button>
    <hr></hr>
    <h2>ToDos</h2>

    <TodoList todos ={todos} toggleTodo={toggleTodo} />
    <br></br>
    <hr></hr>

    <h3>{todos.filter(todo => !todo.complete ).length} left to do</h3>
    </>
  )
}

export default App;
