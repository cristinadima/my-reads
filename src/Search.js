import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import { Link } from 'react-router-dom'

class Search extends Component{

	state = {
	    query: '',
	    /*books that match the query*/
	    searchedBooks: []
	}

	updateQuery = (query) => {
	   this.setState({ query: query })
	   this.getSearchedBooks(query);
	}

	/*fetch the books that match a query, if the query exists*/
	getSearchedBooks = (query) => {
		if(query) {
			BooksAPI.search(query).then((searchedBooks) => {
				if(searchedBooks.error){
					this.setState({ searchedBooks: [] });
				}
				else{
					this.setState({ searchedBooks})
				}
			})
		}
		else {
			this.setState({ searchedBooks: [] });
		}
	}

	render(){
		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link 
              	to="/"
                className="close-search">Close
              </Link>
              <div className="search-books-input-wrapper">

                <input type="text" placeholder="Search by title or author"
                		value = {this.state.query}
                		onChange = {(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>

            <div className="search-books-results">

            {/*for each book inside the searchedBook array, display the book information*/}
              <ol className="books-grid">
              	{
              		this.state.searchedBooks.map(searchedBook => {
              			let shelf = "none";

              			/*if the book already exists in the books array, it assign the correct shelf in the Search.js*/
              			this.props.books.map(book => (
              				book.id===searchedBook.id ?
              				shelf = book.shelf :
              				''
              				))
              			return (
              				<li key = {searchedBook.id}>
              					<Book
              						book = {searchedBook}
              						changeShelf = {this.props.changeShelf}
              						currentShelf={shelf}
              					/>
              				</li>
              			)
              		})

              	}
              </ol>
            </div>
          </div>
		)
	}
}

export default Search;