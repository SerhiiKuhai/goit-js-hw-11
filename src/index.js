import { fetchImg } from './fetchImg.js';
import Notiflix from 'notiflix';
import { insertImg } from './insertImg.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const divGallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let query = '';
let page = 1;
const perPage = 40;
let simpleLightBox;

searchForm.addEventListener('submit', onFormSearch);
btnLoadMore.addEventListener('click', onFindMore);

function onFormSearch(evt) {
  evt.preventDefault();

  query = evt.currentTarget.searchQuery.value.trim();

  divGallery.innerHTML = '';
  btnLoadMore.hidden = true;

  fetchImg(query, page, perPage).then(renderImg).catch(errorFetchImg);
}

function renderImg(data) {
  if (data.data.totalHits === 0 || query === '') {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    divGallery.innerHTML = '';
  } else {
    insertImg(data.data.hits);
    simpleLightBoxImg();

    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    btnLoadMore.hidden = false;
  }
}

function errorFetchImg() {
  Notiflix.Notify.failure(`${error}`);
  console.log(error);
}

function onFindMore() {
  page += 1;
  fetchImg(query, page, perPage).then(nextRenderImg).catch(errorFetchImg);
}

function nextRenderImg(data) {
  insertImg(data.data.hits);
  simpleLightBoxImg();

  const totalPages = Math.ceil(data.data.totalHits / perPage);

  if (page >= totalPages) {
    btnLoadMore.hidden = true;
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function simpleLightBoxImg() {
  simpleLightBox = new SimpleLightbox('.gallery a').refresh();
}
