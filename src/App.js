import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './Search';
import Main from './Main';
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

	/*this state it's used on Search.js and Main.js*/
	state = {
	  books: []
	}
    
    /*fetching all the books into the books array by calling the getAll() method*/
    componentDidMount() {
	    BooksAPI.getAll().then((books) => {
	      this.setState({ books })
	    })
	}

  	changeShelf = (book, shelf) => {
  		BooksAPI.update(book, shelf);
  		BooksAPI.getAll().then((books) => {
	      this.setState({ books })
	    })
  	}

  render() {
    return (
      <div className="app">
      	<Route exact path="/" render={() => (
	      	<Main 
	      		/*to access the book array and the changeShelf() method in Main.js*/
	      		books = {this.state.books}
	      		changeShelf = {this.changeShelf}
	      	/> 
      		)}
      	/>

      	<Route exact path="/search" render={() => (
	      	<Search 
	      		/*to access the book array and the changeShelf() method in Search.js*/
	      		changeShelf = {this.changeShelf}
	      		books = {this.state.books}

	      	/>
	      	)}
      	/>
      </div>
    )
  }
}

export default BooksApp
