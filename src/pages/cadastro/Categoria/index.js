import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CategoryRegister() {
  const initialValues = {
    name: '',
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
      input.target.getAttribute('name'),
      input.target.value,
    );
  }

  useEffect(() => {
    const URL = 'http://localhost:8080/categories/';
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
        {values.name}
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
          label="Nome: "
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />

        <FormField
          as="textarea"
          label="Descrição: "
          type="textarea"
          name="description"
          value={values.description}
          onChange={handleChange}
        />

        <FormField
          label="Cor: "
          type="color"
          name="color"
          value={values.color}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={`${category.name}`}>
            {category.name}
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
