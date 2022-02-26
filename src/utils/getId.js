export const getId = (todos, item) => todos.find((todo) => todo.id === item.id);

export const getIndex = (todos, item) =>
  todos.findIndex((todo) => todo.id === item.id);

// hot module replacement (not required)
import.meta.webpackHot.accept();
