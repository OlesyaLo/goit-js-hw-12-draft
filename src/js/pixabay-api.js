import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43527026-7407a6885caf79748912d7a12';
export async function serviceRequest(request, page) {
  const serviceResponse = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return serviceResponse.data;
}
