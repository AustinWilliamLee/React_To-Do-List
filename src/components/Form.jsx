"use client";

function Form({ setTodos }) {
    const handleSubmit = (event) => {
        event.preventDefault();
    const value = event.target.todo.value;

    const newTodo = {
        title: value,
        id: self.crypto.randomUUID(),
        is_completed: false,
  };
       setTodos((prevTodos) => {
  const updatedTodos = [...prevTodos, newTodo];
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return updatedTodos;
});
event.target.reset()
};
    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="todo">
                <input 
                type="text"
                name="todo"
                id="todo"
                placeholder="Write your next task" 
                />
            </label>
            <button type="submit" className="submit-btn">
  <span className="visually-hidden">Submit</span>
  <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" 
       width="24" 
       height="24" 
       fill="white">
    <path d="M12 5v14m-7-7h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
</button>

        </form>
    );
}
export default Form;