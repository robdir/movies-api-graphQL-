import { makeExecutableSchema } from 'graphql-tools';
import http from 'request-promise-json';


const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// all of the graphQL definitions must be set and exported as a string
 const typeDefs = `
    interface Media {
        id: ID!
        title: String!
        media_type: String!
    }

    type Movie implements Media {
        id: ID!
        title: String!
        media_type: String!
        duration: Int!
        box_office: Int!
        imbd_id: String
        adult: Boolean
        budget(currency: Currency = EUR): Int
        userVotes: Int
        userRating: Int
    }

    type Person {
        name: String
        popularity: Float
        known_for: [Media]
    }

    type RatingInput {
        value: Int!
        comment: String!
    }

    type Query {
        movies: [Movie],
        movie(id: ID, imdb_id: String!): Movie
    }

    type Mutation {
        upvoteMovie (
            movieId: Int!
        ): Movie
    }

    enum Currency {
        EUR
        GBP
        USD
    }
 `;

const resolvers = {
    Query: {
        movie: async (obj, args, context, info) => {
            if (args.id) {
                return http
                    .get(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${MOVIE_DB_API_KEY}&language=en-US`)
            }
            if (args.imdb_id) {
                const results = await http
                    .get(`https://api.themoviedb.org/3/find/${args.imdb_id}?api_key=${MOVIE_DB_API_KEY}&language=en-US&external_source=imdb_id`)

                if (results.movie_results.length > 0) {
                    const movieId = results.movie_results[0].id
                    return http
                        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_DB_API_KEY}&language=en-US`)
                }
            }
        },
        movies: (obj, args, context, info) => {
            // TODO: implement this
        },
    },
};

const schema = makeExecutableSchema({
     typeDefs,
     resolvers,
 })

 export default schema