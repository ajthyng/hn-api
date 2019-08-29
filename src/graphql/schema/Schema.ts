import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from '../resolvers'
import {
  DayJSDate,
  MutationResponse,
  HNStory
} from '../types'

const Query = `
  type Query {
    time: DayJSDate
    hackerNews: [HNStory]
  }

  type Mutation {
    noop: NoopResponse
  }
`

const typeDefs = [
  Query,
  DayJSDate,
  HNStory,
  MutationResponse
]

export const schema = makeExecutableSchema({
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  resolvers,
  typeDefs
})
