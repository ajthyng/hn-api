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
    replies: hackerNewsResolvers.query.replies
  },
  HNReply: {
    user: hackerNewsResolvers.query.user,
    replies: hackerNewsResolvers.query.replies
  }
}
