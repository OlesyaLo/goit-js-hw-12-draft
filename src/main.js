// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'normalize.css';

import { serviceRequest } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.gallery-loader');

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  loader.classList.toggle('loader');
  galleryList.innerHTML = '';

  const request = event.target.elements.text.value.trim();

  if (!request) {
    loader.classList.remove('loader');
    iziToast.error({
      message: 'Please enter a search query!',
    });
    return;
  }

  serviceRequest(request)
    .then(response => {
      if (response.total === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        galleryList.innerHTML = createMarkup(response.hits);
        simpleLightbox.refresh();
      }
    })
    .catch(error => {
      iziToast.error({
        message:
          'Oops! There was a problem loading the images. Please try again later!',
      });
      alert(error.message);
    })
    .finally(() => {
      searchForm.reset();
      loader.classList.toggle('loader');
    });
}
