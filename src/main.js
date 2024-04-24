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
const btnLoadMore = document.querySelector('.gallery-load-btn');
let page = 1;
let request = null;
let totalPages;
let limit = 15;

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  loader.classList.toggle('loader');
  btnLoadMore.classList.add('hidden');
  galleryList.innerHTML = '';

  page = 1;

  request = event.target.elements.text.value.trim();

  if (!request) {
    loader.classList.remove('loader');
    iziToast.error({
      message: 'Please enter a search query!',
    });
    return;
  }
  try {
    const response = await serviceRequest(request);

    if (response.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      galleryList.innerHTML = createMarkup(response.hits);
      simpleLightbox.refresh();

      totalPages = Math.ceil(response.totalHits / limit);
      if (totalPages > 1) {
        btnLoadMore.classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      message:
        'Oops! There was a problem loading the images. Please try again later!',
    });
    alert(error.message);
  } finally {
    searchForm.reset();
    loader.classList.toggle('loader');
  }
}

btnLoadMore.addEventListener('click', loadMore);

async function loadMore() {
  page += 1;
  loader.classList.toggle('loader');

  try {
    const response = await serviceRequest(request, page);

    galleryList.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    simpleLightbox.refresh();

    const galleryElement = document.querySelector('.gallery');
    const cardHeight =
      galleryElement.firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (totalPages === page) {
      btnLoadMore.classList.add('hidden');
      iziToast.info({
        message: 'We are sorry, but you have reached the end of search results',
      });
    }
  } catch (error) {
    iziToast.error({
      message:
        'Oops! There was a problem loading the images. Please try again later!',
    });
    alert(error.message);
  } finally {
    loader.classList.toggle('loader');
  }
}
