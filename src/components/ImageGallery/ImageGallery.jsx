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

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      try {
        this.setState({ searchData: [], isLoading: true, page: 1 });

        search.resetPage();

        const { searchText } = this.props;

        const searchData = await search.fetchImages(searchText);

        const {
          data: { hits },
        } = searchData;

        if (hits.length === 0) {
          Notiflix.Notify.warning(
            "We're sorry, but we didn't find anything for your search..."
          );
          this.setState({ isLoading: false });
        } else {
          const value = searchText.split('+').join(' ');

          Notiflix.Notify.success(
            `Here's what we found on your request: ${value.toUpperCase()}`
          );

          this.setState({
            searchData: [...hits],
            isLoading: false,
          });
        }
      } catch (error) {
        this.setState({
          error,
        });
      }
    } else if (prevState.page !== this.state.page) {
      try {
        this.setState({ isLoading: true });

        const { searchText } = this.props;

        const searchData = await search.fetchImages(searchText);

        const {
          data: { hits },
        } = searchData;

        this.setState({
          searchData: [...prevState.searchData, ...hits],
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          error,
        });
      }
    }
  }

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
    search.changePage();
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
