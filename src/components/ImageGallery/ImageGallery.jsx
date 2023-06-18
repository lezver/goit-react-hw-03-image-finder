import './ImageGallery.scss';
import { Component } from 'react';
import { ImageGalleryItem } from 'components';
import { Search } from '../Services/Api';
import { Modal, Loader, Button } from 'components';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

Notiflix.Notify.init({ fontSize: '18px' });

const search = new Search();

export class ImageGallery extends Component {
  state = {
    searchData: [],
    isHidden: false,
    dataFormModal: {},
    error: null,
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchText } = this.props;

    if (prevProps.searchText !== searchText) {
      this.setState({ searchData: [], isLoading: true, page: 1 });

      this.handleSearch(searchText);
    }
  }

  handleSearch = async searchText => {
    try {
      const searchData = await search.fetchImages(searchText);
      if (searchData.length) {
        const value = searchText.split('+').join(' ');

        Notiflix.Notify.success(
          `Here's what we found on your request: ${value.toUpperCase()}`
        );

        this.setState({
          searchData: [...searchData],
          isLoading: false,
        });
      } else {
        Notiflix.Notify.warning(
          "We're sorry, but we didn't find anything for your search..."
        );
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  handleUpdatePage = async searchText => {
    try {
      this.setState({ isLoading: true });
      const searchData = await search.fetchImages(searchText);
      this.setState(prevState => ({
        isLoading: false,
        searchData: [...prevState.searchData, ...searchData],
      }));
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  hiddenHandler = data => {
    if (data) {
      this.setState(prevState => ({
        isHidden: !prevState.isHidden,
        dataFormModal: data,
      }));
    } else {
      this.setState(prevState => ({
        isHidden: !prevState.isHidden,
      }));
    }
  };

  loadingMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    search.changePage(this.state.page);
    this.handleUpdatePage(this.props.searchText);
  };

  render() {
    const { searchData, isHidden, dataFormModal, isLoading, error } =
      this.state;

    return (
      <>
        {error ? (
          Notiflix.Notify.failure('Something is wrong... Try again later.')
        ) : (
          <>
            <ul className="gallery">
              <ImageGalleryItem
                searchData={searchData}
                hiddenHandler={this.hiddenHandler}
              />
            </ul>
            {isLoading && <Loader />}
            {searchData.length >= 12 && (
              <Button loadingMore={this.loadingMore} />
            )}
            <Modal
              closeModal={this.hiddenHandler}
              isHidden={isHidden}
              dataFormModal={dataFormModal}
            />
          </>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};
