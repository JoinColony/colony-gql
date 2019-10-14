import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Home = () => {
  const { loading, data } = useQuery(gql`
    {
      colony(addressOrName: "burn.colony.joincolony.eth") {
        task(id: 1) {
          manager {
            assignee {
              address
            }
            rateFail
          }
        }
      }
    }
  `)
  return loading ? (
    <p>Loading</p>
  ) : (
    <pre>Test: {JSON.stringify(data, null, 2)}</pre>
  )
}

export default Home
