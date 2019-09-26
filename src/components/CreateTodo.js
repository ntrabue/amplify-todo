import React from "react";

import API, { graphqlOperation } from "@aws-amplify/api";
import { createTodo } from "../graphql/mutations";

async function createNewTodo() {
  const todo = {
    name: "Use AppSync",
    description: "Realtime and Offline",
    complete: false
  };
  await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

const CreateTodo = () => {
  return (
    <div>
      <button onClick={createNewTodo}>Add Todo</button>
    </div>
  );
};

export default CreateTodo;
