import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo' // binding apollo to react where react is understanding apollo (we need to wrap our app with it & inject the data we recieve from the server based on which endpoint, into our app)

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql' // requests to this endpoint
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
// git config --get remote.origin.url to know the remote version
// git remote -v this is another way to know the remote
// git pull origin master to pull
