import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Home = () => {
  const { loading, data } = useQuery(gql`
    {
      colony(addressOrName: "daobros.colony.joincolony.eth") {
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
          id
          balance(addressOrName: "0x278133a25c71d71f7b197983E69B9fAa769722FD") {
            amount
          }
        }
      }
    }
  `)
  return loading ? <p>Loading</p> : <p>Test: {JSON.stringify(data)}</p>
}

export default Home
