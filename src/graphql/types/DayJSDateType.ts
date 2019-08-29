import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { GraphQLScalarType } from 'graphql'

dayjs.extend(utc)

export const DayJSDate = 'scalar DayJSDate'

export const DayJSDateType = new GraphQLScalarType({
  description: 'ISO 8601 formatted date string.',
  name: 'DayJSDate',
  parseLiteral: (ast) => {
    switch (ast.kind) {
      case 'StringValue':
        return dayjs(ast.value).utc()
      case 'IntValue':
        return dayjs(ast.value).utc()
      default:
        throw new Error(`Cannot parse ${ast.kind} as date`)
    }
  },
  parseValue: (value) => dayjs(value).utc(),
  serialize: (value) => dayjs(value).utc().format()
})
