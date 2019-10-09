import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from '@apollo/react-hooks'
import schema from 'colony-gql'
import getColonyNetworkClient from 'colony-js'
import ColonyData from 'colony-data'

import * as serviceWorker from './serviceWorker'

import Home from './pages/Home'

const colonyNetworkClient = getColonyNetworkClient('homestead')
const colonyData = new ColonyData(1)

const context = {
  colonyNetworkClient,
  colonyData,
}

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
    }),
    new SchemaLink({ schema, context }),
  ]),
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
