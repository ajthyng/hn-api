import { ApolloServer } from 'apollo-server-express'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { schema } from './graphql/schema'

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
morgan.token('graphql-operationName', (req) => {
  if (req.body.operationName === 'IntrospectionQuery') return
  return req.body.operationName
})

app.use('/api', morgan(':graphql-operationName'))

const apolloServer = new ApolloServer({
  schema
})

apolloServer.applyMiddleware({ app, path: '/api' })

const server = http.createServer(app)

server.listen(PORT, async () => {
  console.log('Server is ready.')
})
