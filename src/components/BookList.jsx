import React from 'react'
import { graphql } from 'react-apollo' // react-apollo is respnsible for binding the query to the component
import { getBooksQuery } from '../queries/queries'

// 1st you need to construct the query
// 2nd take the query and you bind it to the component (then inside the component you'll have access to all the data that comes from the query)

function BookList(props) {
    let data = props.data

    if(data.loading) return <div>Loading books...</div>

    return (
        data.books.map(book => (
            <li key={book.id}>{book.name}</li>
        ))
    )
}

export default graphql(getBooksQuery)(BookList) // binding the query with the component
