import React, { useEffect, useState } from 'react';
import PageDefault from '../../components/PageDefault';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categories';
// import initialData from '../../data/initial_data.json';

function Home() {
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    // http://localhost:8080/categories?_embed=videos
    categoriasRepository.getAllWithVideos()
      .then((categoriesWithVideos) => {
        setInitialData(categoriesWithVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {initialData.map((category, index) => {
        if (index === 0) {
          return (
            <div key={category.id}>
              <BannerMain
                videoTitle={initialData[0].videos[0].title}
                url={initialData[0].videos[0].url}
                videoDescription="O que é Front-end?"
              />
              <Carousel
                ignoreFirstVideo
                category={initialData[0]}
              />
            </div>
          );
        }
        return (
          <Carousel
            key={category.id}
            category={category}
          />
        );
      })}
    </PageDefault>
  );
}

export default Home;
