import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom';
import Book from './Book';

class Search extends React.Component {
  state = {
    search: '',
    searchResults: []
  }

  handleSubmit() {
    BooksAPI.search(this.state.search).then((data) => {
      this.setState({ searchResults: data });
    }).catch(err => {
      this.setState({ searchResults: [] });
    });
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      search: e.target.value
    }, () => {
      this.debounce(this.handleSubmit(),3000);
    })
  }

  debounce(func, delay) {
    var inDebounce = undefined;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(inDebounce);
      return inDebounce = setTimeout(function() {
        return func.apply(context, args);
      }, delay);
    }
  }

  render() {
    let displayBooks = this.state.searchResults.map((searchResult, index) => {
      const existingBook = this.props.books.find(book => book.id === searchResult.id);

      if (existingBook) {
        searchResult.shelf = existingBook.shelf;
      } else {
        searchResult.shelf = "none";
      }

      return <Book
        book={searchResult}
        key={searchResult.author + searchResult.title + index}
        updateBook={this.props.updateBook}
        bookShelf={searchResult.shelf}
      />
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.handleChange.bind(this)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {displayBooks}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
