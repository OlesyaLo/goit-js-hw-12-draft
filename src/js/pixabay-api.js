const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43527026-7407a6885caf79748912d7a12';
export function serviceRequest(request) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
