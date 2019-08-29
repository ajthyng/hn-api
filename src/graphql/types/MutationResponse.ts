export const MutationResponse = `
  interface MutationResponse {
    code: Int!
    message: String!
  }

  type NoopResponse implements MutationResponse {
    code: Int!
    message: String!
    noop: Boolean!
  }
`
