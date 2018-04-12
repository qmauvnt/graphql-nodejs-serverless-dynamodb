
var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');
var dynamoConnection = require('./dynamodb.js');

var typeDefs = [`
type movie {
    title: String
    year: String
}

type Query {
  movies: [movie]
}
 
schema {
  query: Query
}`];

var resolvers = {
    Query: {
        movies(root) {
            let tableName = 'Movies';
            return dynamoConnection.getMovie(tableName)
        }
    }
};

var schema = makeExecutableSchema({ typeDefs, resolvers });
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
console.log('waiting for dynamodb response.....');
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
