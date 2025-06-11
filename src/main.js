/*
У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.
*/
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

const formEl = document.querySelector('.js-form');
const inputEl = document.querySelector('input[name="search-text"]');
const listEl = document.querySelector('.js-gallery');

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
      console.log('Знайдено зображення:', responseData.hits);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    console.error('Помилка під час пошуку зображень:', error);
  } finally {
    inputEl.value = '';
  }
});
