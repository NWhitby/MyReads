import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    query: "",
    searchedBooks: []
  };

  updateQuery = query => {
    this.setState({
      query: query
    });
    this.displaySearchedBooks(query);
  };

  displaySearchedBooks = query => {
    if (query) {
      BooksAPI.search(query).then(searchedBooks => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: searchedBooks });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="" className="close-search">
            {" "}
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map(searchedBook => {
              let shelfState = "none";

              this.props.books.map(
                book =>
                  book.id === searchedBook.id ? (shelfState = book.shelf) : ""
              );
              return (
                <li key={searchedBook.id}>
                  <Books
                    book={searchedBook}
                    changeShelf={this.props.changeShelf}
                    currentShelf={shelfState}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
