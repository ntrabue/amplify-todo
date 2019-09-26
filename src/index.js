import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import API from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";
import config from "./aws-exports";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

API.configure(config);
PubSub.configure(config);

const App = () => (
  <div className='App'>
    <CreateTodo />
    <TodoList />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
