import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

function create(videoObject) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(videoObject),
  })
    .then(async (response) => {
      if (response.ok) {
        const serverResponse = await response.json();
        return serverResponse;
      }
      throw new Error('Não foi possível cadastrar os dados :(');
    });
}

export default {
  create,
};
