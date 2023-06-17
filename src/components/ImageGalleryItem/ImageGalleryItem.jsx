import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ searchData, hiddenHandler }) => {
  return (
    <>
      {searchData.map(({ id, tags, webformatURL, largeImageURL }) => (
        <li className="gallery-item" key={id}>
          <img
            src={webformatURL}
            alt={tags}
            onClick={() => hiddenHandler({ url: largeImageURL, tags })}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  searchData: PropTypes.array.isRequired,
  hiddenHandler: PropTypes.func.isRequired,
};
