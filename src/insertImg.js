export { insertImg };

const divGallery = document.querySelector('.gallery');

const createlist = data => {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = data;
  return `
<a class="image-link" href="${largeImageURL}" title="${tags}">
          <div class="photo-card">
            <img class="photo-card-item" src="${webformatURL}" alt="${tags}" loading="lazy" title="${tags}" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
};
const generateContent = array =>
  array?.reduce((acc, data) => acc + createlist(data), '');

const insertImg = array => {
  const result = generateContent(array);
  divGallery.innerHTML = result;
};
