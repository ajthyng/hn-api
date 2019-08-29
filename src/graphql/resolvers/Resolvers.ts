import dayjs from 'dayjs'
import { DayJSDateType } from '../types'
import { hackerNewsResolvers } from './HNResolvers'

export const resolvers = {
  DayJSDate: DayJSDateType,
  Mutation: {},
  Query: {
    time: () => dayjs(),
    hackerNews: hackerNewsResolvers.query.topStories
  },
  HNStory: {
    replies: hackerNewsResolvers.query.replies,
    time: hackerNewsResolvers.query.time
  },
  HNReply: {
    user: hackerNewsResolvers.query.user,
    replies: hackerNewsResolvers.query.replies,
    time: hackerNewsResolvers.query.time
  }
}
