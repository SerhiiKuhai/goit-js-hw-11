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

async function onFormSearch(evt) {
  evt.preventDefault();

  query = evt.currentTarget.searchQuery.value.trim();

  divGallery.innerHTML = '';
  btnLoadMore.hidden = true;
  page = 1;
  try {
    const data = await fetchImg(query, page, perPage);
    renderImg(data);
  } catch (error) {
    errorFetchImg();
  }
}

function renderImg(data) {
  if (data.data.totalHits === 0 || query === '') {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    divGallery.innerHTML = '';
    page = 1;
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

async function onFindMore() {
  try {
    page += 1;
    const data = await fetchImg(query, page, perPage);
    nextRenderImg(data);
  } catch (error) {
    errorFetchImg();
  }
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
