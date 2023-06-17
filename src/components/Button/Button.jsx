import './Button.scss';
import PropTypes from 'prop-types';

export const Button = ({ loadingMore }) => {
  return (
    <button className="btn" type="button" onClick={() => loadingMore()}>
      Loading more ...
    </button>
  );
};

Button.porpTypes = {
  loadingMore: PropTypes.func.isRequired,
};
