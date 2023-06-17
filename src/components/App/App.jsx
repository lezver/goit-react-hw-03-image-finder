import { Component } from 'react';
import './App.scss';
import { Searchbar, ImageGallery } from 'components';

export class App extends Component {
  state = {
    searchText: '',
  };

  handleSearch = searchText => {
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;

    return (
      <div className="app">
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searchText={searchText} />
      </div>
    );
  }
}
