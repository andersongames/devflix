import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND}/categories`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`)
    .then(async (response) => {
      if (response.ok) {
        const serverResponse = await response.json();
        return serverResponse;
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (response) => {
      if (response.ok) {
        const serverResponse = await response.json();
        return serverResponse;
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

export default {
  getAllWithVideos,
  getAll,
};
