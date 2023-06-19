import axios from 'axios';

export class Search {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.KEY = 'key=35889864-226fb2b19f733dcfa0ea78ac8';
    this.OTHER_SETTINGS = 'image_type=photo&orientation=horizontal&per_page=12';
    this.PAGE = 1;
  }

  async fetchImages(value) {
    const response = await axios.get(
      `${this.BASE_URL}?${this.KEY}&q=${value}&${this.OTHER_SETTINGS}&page=${this.PAGE}`
    );
    return response.data.hits;
  }

  changePage(value) {
    this.PAGE += value;
  }

  resetPage() {
    this.PAGE = 1;
  }
}
