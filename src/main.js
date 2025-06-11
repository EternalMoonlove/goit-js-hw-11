import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const formEl = document.querySelector('.js-form');
const inputEl = document.querySelector('input[name="search-text"]');

formEl.addEventListener('submit', async event => {
  event.preventDefault();

  const inputValue = inputEl.value.trim();

  if (inputValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Будь ласка, введіть щось для пошуку!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const responseData = await getImagesByQuery(inputValue);

    if (responseData.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
      });
    } else {
      createGallery(responseData.hits);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    console.error('Помилка під час пошуку зображень:', error);
  } finally {
    hideLoader();
    inputEl.value = '';
  }
});
