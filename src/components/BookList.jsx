import React, { useState } from 'react'
import { graphql } from 'react-apollo' // react-apollo is responsible for binding the query to the component
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

// 1st you need to construct the query
// 2nd take the query and you bind it to the component by HOC (then inside the component you'll have access to all the data that comes from the query by props)

function BookList(props) {

    const [selected, setSelected] = useState()
    let data = props.data

    if(data.loading) return <div>Loading books...</div>

    return (
        <div>
            <ul id="book-list">
            {data.books.map(book => (
                <li key={book.id} onClick={e => setSelected(book.id)}>{book.name}</li>
            ))}
            </ul>
            <BookDetails bookId={selected}/>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList) // binding the query with the component
