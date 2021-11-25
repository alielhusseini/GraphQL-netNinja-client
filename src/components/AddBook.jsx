import { useRef, useCallback } from 'react'
import { graphql } from 'react-apollo'
import { getAuthorsQuery } from '../queries/queries'

function AddBook(props) {
    const data = props.data
    const bookNameRef = useRef()
    const bookGenreRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()

        console.log(bookNameRef.current.value, bookGenreRef.current.value)
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
                <select>
                    <option>Select author</option>
                    { displayAuthors(data) }
                </select>
            </div>
            <button type='submit'>+</button>
        </form>
    )
}

export default graphql(getAuthorsQuery)(AddBook)
