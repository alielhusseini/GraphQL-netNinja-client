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

// using query variables for injecting data (! means required & not null) / in this example we are naming the mutation
export const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`

export const getBookQuery = gql`
    query($id: ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                books{
                    name
                    id
                }
            }
        }
    }
`