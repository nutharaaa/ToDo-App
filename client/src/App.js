import { useState, useEffect } from 'react';
import axios from "axios";

import './app.css';
import Item from './components/Item'

function App() {

  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:5000/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
    }, []);

    const addUpdateTodo = () => {
      console.log("Text:", text);  // Check if text is populated
      console.log("Description:", description);  // Check if description is populated
    
      if (isUpdating === "") {
        axios.post("http://localhost:5000/save-todo", { text, description })
          .then((res) => {
            console.log(res.data);
            setText("");
            setDescription("");
            // Re-fetch the entire list
            axios.get("http://localhost:5000/get-todo")
              .then((res) => setTodo(res.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        axios.post("http://localhost:5000/update-todo", { _id: isUpdating, text, description })
          .then((res) => {
            console.log(res.data);
            setText("");
            setDescription("");
            setUpdating("");
            // Re-fetch the entire list
            axios.get("http://localhost:5000/get-todo")
              .then((res) => setTodo(res.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    };
    
    
  const deleteTodo = (_id) => {
    axios.post("http://localhost:5000/delete-todo", { _id })
      .then((res) => {
        console.log(res.data);
        setTodo((prev) => prev.filter((item) => item._id !== _id)); // Remove item from UI
      })
      .catch((err) => console.log(err));
  };  

  const updateTodo = (_id, text, description) => {
    setUpdating(_id);
    setText(text);
    setDescription(description);
  }
  
  const toggleChecked = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        
        <div className="top">
          {/* Title Input */}
          <input
            type="text"
            placeholder='Write Title...'
            value={text}
            onChange={(e) => setText(e.target.value)} 
          />
        </div>
  
        <div className="top">
          {/* Description Input */}
          <input
            placeholder='Write Description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="top">
          {/* Add/Update Button */}
          <div 
            className="add" 
            onClick={addUpdateTodo}>
            {isUpdating ? "UPDATE" : "ADD"}
          </div>
        </div>


        <div className="list">
        {todo.map(item => {
          console.log(item.text);
  console.log(item.description);  // Log the description to check its value
  return (
    <Item
      key={item._id}
      checked={item.checked} 
      text={item.text}
      description={item.description}
      toggleChecked={() => toggleChecked(item._id)} 
      remove={() => deleteTodo(item._id)}
      update={() => updateTodo(item._id, item.text, item.description)} 
    />
  );
})}
        </div>
      </div>
    </div>
  );
  
}

export default App;