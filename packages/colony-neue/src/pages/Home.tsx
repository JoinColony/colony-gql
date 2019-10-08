import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Home = () => {
  const { loading, data } = useQuery(gql`
    {
      colony(addressOrName: "daobros.colony.joincolony.eth") {
        profile {
          name
          avatarHash
        }
        address
        ensName
        domains {
          id
        }
        taskCount
        tasks {
          id
          specificationHash
          status
          dueDate
        }
      }
      user(addressOrName: "scott.user.joincolony.eth") {
        address
        ensName
        profile {
          name
        }
      }
    }
  `)
  return loading ? <p>Loading</p> : <p>Test: {JSON.stringify(data)}</p>
}

export default Home
