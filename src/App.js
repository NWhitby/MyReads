import React from "react";
import MainPage from "./MainPage";
import Search from "./SearchPage";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  bookItems() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.bookItems();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path=""
          render={() => (
            <MainPage books={this.state.books} changeShelf={this.changeShelf} />
          )}
        />

        <Route
          path="/Search"
          render={() => (
            <Search books={this.state.books} changeShelf={this.changeShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
