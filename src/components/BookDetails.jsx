import React, { useCallback } from 'react'
import { graphql } from 'react-apollo' // react-apollo is responsible for binding the query to the component
import { getBookQuery } from '../queries/queries'


function BookDetails(props) {
    
    const displayBookDetails = useCallback((props) => {
        const { book } = props.data
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by the author:</p>
                    <ul className='other-books'>
                        {book.author.books.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return <div>No book selected...</div>
        }
    },[])

    return (
        <div id="book-details">
            {displayBookDetails(props)}
        </div>
    )
}

export default graphql(getBookQuery, { // now we'll attach the query variable into the  query
    options: (props) => { // whenever we update the props the options function will fire
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
