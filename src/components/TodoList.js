import React, { useEffect, useReducer, useState } from "react";
import { listTodos } from "../graphql/queries";
import { onCreateTodo } from "../graphql/subscriptions";
import API, { graphqlOperation } from "@aws-amplify/api";

import { Container, Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";

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
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    getData();
    if (user) {
      const subscription = API.graphql(
        graphqlOperation(onCreateTodo, { owner: user.username })
      ).subscribe({
        next: eventData => {
          const todo = eventData.value.data.onCreateTodo;
          dispatch({ type: "SUBSCRIPTION", todo });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [user]);

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    dispatch({ type: "QUERY", todos: todoData.data.listTodos.items });
  }

  async function fetchUser() {
    return await Auth.currentAuthenticatedUser();
  }

  return (
    <Container>
      <Typography variant='h3' component='h1'>
        Your Tasks:
      </Typography>
      {state.todos.map((todo, i) => (
        <p key={todo.id}>
          {todo.name} : {todo.description}
        </p>
      ))}
    </Container>
  );
};

export default TodoList;
