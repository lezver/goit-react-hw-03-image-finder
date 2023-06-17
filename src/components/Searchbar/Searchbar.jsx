import './Searchbar.scss';
import { Component } from 'react';
import Notiflix from 'notiflix';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

Notiflix.Notify.init({ fontSize: '18px' });

export class Searchbar extends Component {
  handleForm = e => {
    e.preventDefault();

    const { value } = e.currentTarget.elements[1];
    const { handleSearch } = this.props;

    value === ''
      ? Notiflix.Notify.info('Sorry, but the search is empty.')
      : handleSearch(value.trim().split(' ').join('+'));

    e.currentTarget.reset();
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleForm}>
          <button type="submit" className="button">
            <FiSearch size={24} />
          </button>

          <input
            className="input"
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
