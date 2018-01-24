import { makeExecutableSchema } from 'graphql-tools';


const movies = [
    {
    id: '666',
    title: 'the fukkbois',
    imdb_id: '10',
    adult: true,
    budget: 400000000
},
{
    id: '333',
    title: 'whov cares',
    imdb_id: '12',
    adult: false,
    budget: 400000000
}]


 const typeDefs = `
    type Movie {
        id: ID!
        title: String!
        imbd_id: String
        adult: Boolean
        budget: Int
    }

    type Query {
        movies: [Movie],
    }
 `;

 const resolvers = {
     Query: {
         movies: () => movies
     },
 }

const schema = makeExecutableSchema({
     typeDefs,
     resolvers,
 })

 export default schema