import React from 'react'
import { gql } from 'apollo-boost' // to parse the query
import { graphql } from 'react-apollo' // react-apollo is respnsible for binding the query to the component

// 1st you need to construct the query
// 2nd take the query and you bind it to the component (then inside the component you'll have access to all the data that comes from the query)

// query construction
const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

function BookList(props) {
    console.log(props)
    return (
        <div>
            <ul id="book-list">
                <li>Book name</li>
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList) // binding the query with the component
