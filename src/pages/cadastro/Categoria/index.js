import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CategoryRegister() {
  const initialValues = {
    title: '',
    description: '',
    color: '',
  };
  const [categories, setCategory] = useState([]);
  const [values, setValues] = useState(initialValues);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(input) {
    setValue(
      input.target.getAttribute('title'),
      input.target.value,
    );
  }

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categories'
      : 'https://andersondevflix.herokuapp.com/categories';
    fetch(URL)
      .then(async (response) => {
        const serverResponse = await response.json();
        setCategory([
          ...serverResponse,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        <br />
        {values.title}
      </h1>

      <form onSubmit={function handleSubmit(submit) {
        submit.preventDefault();
        setCategory([
          ...categories,
          values,
        ]);

        setValues(initialValues);
      }}
      >
        <FormField
          label="Título: "
          type="text"
          title="title"
          value={values.title}
          onChange={handleChange}
        />

        <FormField
          as="textarea"
          label="Descrição: "
          type="textarea"
          title="description"
          value={values.description}
          onChange={handleChange}
        />

        <FormField
          label="Cor: "
          type="color"
          title="color"
          value={values.color}
          onChange={handleChange}
        />

        <Button as="button">
          Cadastrar
        </Button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={`${category.title}`}>
            {category.title}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para Home
      </Link>
    </PageDefault>
  );
}

export default CategoryRegister;
