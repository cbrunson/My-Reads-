import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import './App.css'
import Bookshelves from './Bookshelves';
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  updateBook(id, shelf) {
    BooksAPI.update({
      id: id
    }, shelf).then((data) => {
      this.getBookByID(id, shelf);
    });
  }

  updateStatus(book, value) {
    book.shelf = value

    BooksAPI.update(book, value).then(res => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  getBookByID(id, shelf) {
    BooksAPI.get(id).then((data) => {
      this.setState((state) => ({
             books: state.books.filter(item => (data.id !== item.id)).concat(data)
      }));
    });
  }

  getAllBooks() {
    BooksAPI.getAll().then((data) => {
      this.setState({books: data});
    });
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => {
          return <Bookshelves books={this.state.books} updateBook={this.updateBook.bind(this)}/>
        }}/>

        <Route path="/search" render={({history}) => (<Search books={this.state.books} updateBook={(id, shelf) => {
          this.updateBook(id, shelf);
        }}/>)}/>

      </div>
    )
  }
}

export default BooksApp;
