import { makeExecutableSchema } from 'graphql-tools'

import schema from './schema'
import resolvers from './resolvers'
import { Context } from './utils'

export default makeExecutableSchema<Context>({
  typeDefs: schema,
  resolvers,
})
