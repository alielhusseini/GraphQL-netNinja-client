import { gql } from 'apollo-boost' // to parse the query

// query construction

export const getAuthorsQuery = gql `
    {
        authors{
            name
            id
        }
    }
`

export const getBooksQuery = gql `
    {
        books{
            name
            id
        }
    }
`