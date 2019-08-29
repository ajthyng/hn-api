import { gql } from 'apollo-server-express'

export const HNStory = gql`
  type HNStory {
    title: String
    url: String
    time: DayJSDate
    score: Int
    replies: [HNReply]
  }

  type HNReply {
    user: String
    text: String
    time: DayJSDate
    replies: [HNReply]
  }
`
