import React, { useState } from "react";

import API, { graphqlOperation } from "@aws-amplify/api";
import { createTodo } from "../graphql/mutations";

import { Button, TextField, FormGroup, Container } from "@material-ui/core";

async function createNewTodo(data) {
  const todo = {
    ...data,
    complete: false
  };
  await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

const defaultForm = {
  name: "",
  description: ""
};

const CreateTodo = () => {
  const [data, updateData] = useState(defaultForm);

  function handleChange(e) {
    const target = e.target;
    e.persist();

    return updateData(values => ({
      ...values,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createNewTodo(data).then(() => {
      updateData(defaultForm);
    });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            type='text'
            name='name'
            label='Task Name'
            value={data.name}
            onChange={handleChange}
            variant='outlined'
            margin='normal'
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type='text'
            name='description'
            label='Task Description'
            value={data.description}
            onChange={handleChange}
            variant='outlined'
            margin='normal'
            multiline
          />
        </FormGroup>

        <Button type='submit' color='primary' variant='contained'>
          Create New Task
        </Button>
      </form>
    </Container>
  );
};

export default CreateTodo;
