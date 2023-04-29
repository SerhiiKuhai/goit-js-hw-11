import axios from 'axios';

export { fetchImg };

const KEY = '35734098-001978243a4da1dc94d78ecd1';
const URL = 'https://pixabay.com/api/';

async function fetchImg(query, page, perPage) {
  const response = await axios.get(
    `${URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}
