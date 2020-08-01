import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriesRepository from '../../../repositories/categories';

function CadastroVideo() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const categoryTitles = categories.map(({ title }) => title);
  const { handleChange, values } = useForm({
    title: 'Dê super poderes ao CSS com SASS | Masterclass #15',
    url: 'https://www.youtube.com/watch?v=BaI8dHUthLA&t=2414s',
    category: 'Front End',
  });

  useEffect(() => {
    categoriesRepository
      .getAll()
      .then((categoriesFromServer) => {
        setCategories(categoriesFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={(event) => {
        event.preventDefault();

        const chosenCategory = categories.find((category) => category.title === values.category);

        videosRepository.create({
          title: values.title,
          url: values.url,
          categoryId: chosenCategory.id,
        })
          .then(() => {
            history.push('/');
          });
      }}
      >
        <FormField
          label="Título: "
          title="title"
          value={values.title}
          onChange={handleChange}
        />

        <FormField
          label="URL: "
          title="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria: "
          title="category"
          value={values.category}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button as="button">
          Cadastrar
        </Button>
      </form>
    </PageDefault>
  );
}

export default CadastroVideo;
