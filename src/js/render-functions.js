export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img 
                    class="gallery-image" 
                    src="${webformatURL}"
                    alt="${tags}"
                    width="360px"
                    height="152px"/>
            </a>
    <ul class="img-text-container"> 
    <li class="img-text">Likes<p class="img-data">${likes}</p></li>
    <li class="img-text">Views<p class="img-data">${views}</p></li>
    <li class="img-text">Comments<p class="img-data">${comments}</p></li>
    <li class="img-text">Downloads<p class="img-data">${downloads}</p></li>
    </ul>
   </li>`
    )
    .join('');
}
