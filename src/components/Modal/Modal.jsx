import './Modal.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = ({ code, currentTarget, target }) => {
    if (currentTarget === target) {
      this.props.closeModal();
    } else if (code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { isHidden, dataFormModal } = this.props;
    return (
      <>
        {isHidden && (
          <div className="overlay" onClick={this.handleCloseModal}>
            <div className="modal">
              <img src={dataFormModal.url} alt={dataFormModal.tags} />
            </div>
          </div>
        )}
      </>
    );
  }
}

Modal.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  dataFormModal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
