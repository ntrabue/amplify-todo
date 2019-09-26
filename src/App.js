import React from "react";
import Amplify from "aws-amplify";
import PubSub from "@aws-amplify/pubsub";
import config from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

Amplify.configure(config);
PubSub.configure(config);

const App = () => (
  <div className='App'>
    <Header />
    <CreateTodo />
    <TodoList />
  </div>
);

export default withAuthenticator(App, { usernameAttributes: "email" });
