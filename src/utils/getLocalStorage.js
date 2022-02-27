export const getSavedItems = () => {
  const todosJSON = localStorage.getItem("todos");

  return todosJSON !== null ? JSON.parse(todosJSON) : [];
};

export const saveItems = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
