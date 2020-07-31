import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CategoryRegister() {
  const initialValues = {
    title: '',
    description: '',
    color: '',
  };

  const { handleChange, values, clearForm } = useForm(initialValues);
  const [categories, setCategory] = useState([]);

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

      <form onSubmit={function handleSubmit(event) {
        event.preventDefault();
        setCategory([
          ...categories,
          values,
        ]);
        clearForm();
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
        <h3>Categorias Existentes:</h3>
        {categories.map((category) => (
          <li key={`${category.title}`}>
            {category.title}
          </li>
        ))}
      </ul>
    </PageDefault>
  );
}

export default CategoryRegister;
