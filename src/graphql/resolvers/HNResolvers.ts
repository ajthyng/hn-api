import { Context } from 'apollo-server-core'
import { GraphQLResolveInfo } from 'graphql'
import axios from 'axios'

export type Resolver = (parent: any, args: { [argName: string]: any }, context: Context, info: GraphQLResolveInfo) => any

interface ResolverStructure {
  query: {
    [index: string]: Resolver
  }
}

interface TopStory {
  title: string
  url: string
  time: number
  score: number
  replies: Reply[]
}

interface Reply {
  user: string
  text: string
  time: number
  replies: Reply[]
}

const getItem = async<T>(id: number): Promise<T> => {
  try {
    const item = await axios.get<T>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    return item.data
  } catch (err) {
    return null
  }
}

export const hackerNewsResolvers: ResolverStructure = {
  query: {
    topStories: async (parent, args, context, info): Promise<TopStory[]> => {
      const storyIds = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/beststories.json')

      const stories = await Promise.all(storyIds.data.map(id => getItem<TopStory>(id)))
      
      return stories.filter(story => story !== null)
    },
    replies: async (parent, args, context, info): Promise<Reply[]> => {
      if (!parent.kids) return []
      
      const replies: Reply[] = await Promise.all(parent.kids.map((id: number) => getItem<Reply>(id)))
      
      return replies.filter(reply => reply !== null)
    },
    user: (parent) => parent.by,
    time: (parent) => parent.time * 1000
  }
}
