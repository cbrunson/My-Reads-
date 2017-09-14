import React from 'react'

class Book extends React.Component {
  state = {
    'valueOption': ''
  }

  handleChange(e) {
    this.setState({
      'valueOption': e.target.value
    }, () => {
      this.props.updateBook(this.props.book.id, this.state.valueOption);
    });
  }

  getShelf(a,b) {
    return a || b;
  }

  render() {
    let url = this.props.book.imageLinks && (this.props.book.imageLinks.thumbnail || this.props.book.imageLinks.smallThumbnail || ''),
        imageWidth = 128,
        imageHeight = 193;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: imageWidth, height: imageHeight, backgroundImage: 'url(' + url + ')'
          }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange.bind(this)} value={this.getShelf(this.props.bookShelf, this.props.book.shelf)} >
              <option value="none">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', ') : 'Unknown'}</div>
      </div>
    )
  }
}

export default Book;
