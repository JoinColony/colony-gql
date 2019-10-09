import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Home = () => {
  const { loading, data } = useQuery(gql`
    {
      colony(addressOrName: "burn.colony.joincolony.eth") {
        fundingPots {
          type
          associated {
            id
          }
        }
        id
        address
        ensName
        balances {
          amount
          token {
            address
            symbol
            name
            decimals
          }
        }
        domains {
          fundingPot {
            type
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
