import React from "react";

function Item({ item, setTodos}) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);
  const completeTodo = () => {
  setTodos((prevTodos) => {
    const updatedTodos = prevTodos.map((todo) =>
      todo.id === item.id
        ? { ...todo, is_completed: !todo.is_completed }
        : todo
    );

    // save to localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    return updatedTodos; // ✅ must return the new array
  });
};

    const handleEdit = () => {
    setEditing(true);
  };
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);
 const handleInpuSubmit = (event) => {
  event.preventDefault();
  setTodos((prevTodos) => {
    const updatedTodos = prevTodos.map((todo) =>
      todo.id === item.id
        ? { ...todo, title: inputRef.current.value } // ✅ update title
        : todo
    );

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  });

  setEditing(false);
};

  const handleInputBlur = () => {
  setTodos((prevTodos) => {
    const updatedTodos = prevTodos.map((todo) =>
      todo.id === item.id
        ? { ...todo, title: inputRef.current.value }
        : todo
    );

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  });

  setEditing(false);
};

  const handleInputChange = (e) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === item.id ? { ...todo, title: e.target.value } : todo
    )
  );
};
const handleDelete = () => {
  setTodos((prevTodos) => {
    const updatedTodos = prevTodos.filter((todo) => todo.id !== item.id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  });
};

    return (
    <li id={item?.id} className="todo_item">
      {editing? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
        ) : (
        <>
      <button className="todo_items_left" onClick={completeTodo}>
  {item.is_completed ? (
    // ✅ Checked Icon
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 15-5-5 
               1.41-1.41L11 14.17l7.59-7.59L20 8Z"/>
    </svg>
  ) : (
    // ⬜ Empty Circle Icon
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="2" fill="none" />
    </svg>
  )}
  
  <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
    {item?.title}
  </p>
</button>


      <div className="todo_items_right">
        <button onClick={handleEdit}>
          <span className="visually-hidden">Edit</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
           7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 
           1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 
           1.84-1.82z"/>
</svg>
        </button>
        <button onClick={handleDelete}>
          <span className="visually-hidden">Delete</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"/>
</svg>
        </button>
      </div>
      </>
    )}
    </li>
  );
}

function TODOList({ todos, setTodos }) {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (<Item key={index} item={item} setTodos={setTodos} />))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}
export default TODOList;