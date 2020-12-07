'use strict'

const { makeExecutableSchema } = require('@graphql-tools/schema')
const { addMocksToSchema } = require('@graphql-tools/mock')
const { graphql } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const { log } = require('./utils')

// Fill this in with the schema string
const schemaString = `
type Person {
    name: String!
    age: Int!
}

# the schema allows the following query:
type Query {
    persons: [Person]
}
`

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString })

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema })

const query = `
 query getPersonInfo {
   persons {
       name
   }
}`

log('start')
graphql(schemaWithMocks, query).then(result => log('Got result', JSON.stringify(result, null, 4)))

function createMiddleware(options) {
    return graphqlHTTP({
        schema: schemaWithMocks,
        graphiql: true,
    })
}

module.exports = {
    createMiddleware,
}
