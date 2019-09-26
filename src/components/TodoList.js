import React, { useEffect, useReducer } from "react";
import { listTodos } from "../graphql/queries";
import { onCreateTodo } from "../graphql/subscriptions";
import API, { graphqlOperation } from "@aws-amplify/api";

const initialState = { todos: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "QUERY":
      return { ...state, todos: action.todos };
    case "SUBSCRIPTION":
      return { ...state, todos: [...state.todos, action.todo] };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();

    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: eventData => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({ type: "SUBSCRIPTION", todo });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    dispatch({ type: "QUERY", todos: todoData.data.listTodos.items });
  }

  return (
    <div>
      {state.todos.map((todo, i) => (
        <p key={todo.id}>
          {todo.name} : {todo.description}
        </p>
      ))}
    </div>
  );
};

export default TodoList;
