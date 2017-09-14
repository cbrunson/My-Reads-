import React from 'react'
import Book from './Book';

class Bookshelf extends React.Component {

  render() {
    let displayBooks = this.props.books.map((book, index) => {
      return (
        <li key={book.author + book.title + index}>
          <Book book={book} updateBook={this.props.updateBook}/>
        </li>
      )
    });

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {displayBooks}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;
