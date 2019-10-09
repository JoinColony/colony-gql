import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Home = () => {
  const { loading, data } = useQuery(gql`
    {
      colony(addressOrName: "burn.colony.joincolony.eth") {
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
  return loading ? <p>Loading</p> : <p>Test: {JSON.stringify(data)}</p>
}

export default Home
