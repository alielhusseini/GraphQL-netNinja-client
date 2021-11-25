import { useRef, useCallback } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries' // though we are importing 2 queries we can bind by the HOC only one query, so for the mutation we'll use 'compose'

function AddBook({ getAuthorsQuery: data, addBookMutation }) {
    
    const bookNameRef = useRef()
    const bookGenreRef = useRef()
    const authorRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()

        if (!bookNameRef.current.value ||!bookGenreRef.current.value || !authorRef.current.value) return alert('fields cannot be empty')

        addBookMutation({
            variables: {
                name: bookNameRef.current.value,
                genre: bookGenreRef.current.value,
                authorId: authorRef.current.value,
            }, // we can tell graphql to re-fetch a particular query which will end up in re-rendering the component -> no need for the useEffect here
            refetchQueries: [{ query: getBooksQuery}] // which will end up re-rendering the component which is responsible (getting data) for getBooksQuery -> BookList.jsx
        })

        bookNameRef.current.value = ""
        bookGenreRef.current.value = ""
        authorRef.current.value = ""
    }

    const displayAuthors = useCallback((data) => {
        if (data.loading) return (<option disabled>Loading Authors...</option>)
        return data.authors.map(author => (
            <option key={author.id} value={author.id}>{author.name}</option>
        ))
    },[])

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" ref={bookNameRef} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" ref={bookGenreRef} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select ref={authorRef}>
                    <option>Select author</option>
                    { displayAuthors(data) }
                </select>
            </div>
            <button type='submit'>+</button>
        </form>
    )
}

export default compose( // now we can list different queries & mutations unlike the down below
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'}),
)(AddBook) // binding the 2 queries to the component
// export default graphql(getAuthorsQuery)(AddBook) by can bind only one query by the HOC method
