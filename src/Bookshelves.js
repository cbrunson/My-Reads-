import React from 'react'
import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf';

const Bookshelves = ({ books, updateBook }) => (
  <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <Bookshelf key="currentlyReading" title="Currently Reading" books={books.filter(book => (book.shelf === "currentlyReading"))} updateBook={updateBook}/>
        <Bookshelf key="wantToRead" title="Want to Read" books={books.filter(book => (book.shelf === "wantToRead"))} updateBook={updateBook}/>
        <Bookshelf key="read" title="Read" books={books.filter(book => (book.shelf === "read"))} updateBook={updateBook}/>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
)

export default Bookshelves;
