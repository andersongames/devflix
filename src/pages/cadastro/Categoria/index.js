import React, { useState } from 'react'
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'

function CategoryRegister() {
  const initialValues = {
    name: '',
    description: '',
    color: '',
  }
  const [categories, setCategory] = useState([])
  const [values, setValues] = useState(initialValues)

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    })
  }

  function handleChange(input) {
    setValue(
      input.target.getAttribute('name'),
      input.target.value
    );
  }

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.name}</h1>

      <form onSubmit={function handleSubmit(submit) {
        submit.preventDefault();
        setCategory([
          ...categories,
          values
        ])

        setValues(initialValues)
      }}>
        <FormField
          label = "Nome da Categoria: "
          type = "text"
          name = "name"
          value = {values.name}
          onChange = {handleChange}
        />

        <FormField
          label = "Descrição: "
          type = "textarea"
          name = "description"
          value = {values.description}
          onChange = {handleChange}
        />

        <FormField
          label = "Cor: "
          type = "color"
          name = "color"
          value = {values.color}
          onChange = {handleChange}
        />

        <button>
          Cadastrar
        </button>
      </form>

      <ul>
        {categories.map((category, index) => {
          return (
            <li key={`${category}${index}`}>
              {category.name}
            </li>
          )
        })}
      </ul>

      <Link to="/">
          Ir para Home
      </Link>
    </PageDefault>
  )
  }

export default CategoryRegister;