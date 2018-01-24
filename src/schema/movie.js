import { makeExecutableSchema } from 'graphql-tools';


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

    type TVShow implements Media {
        id: ID!
        title: String!
        media_type: String!
        Episodes: [Episode]!
        running: Boolean
    }

    type Person {
        name: String
        popularity: Float
        known_for: [Media]
    }

    type Query {
        movies: [Movie],
        movie(id: ID, imdb_id: String!): Movie
        search(q: String!): SearchResult
    }

    type Mutation {
        upvoteMovie (
            movieId: Int!
        ): Movie
        rateMovie (
            movieId: Int!
            userRating: String!
        ): Movie
    }

    query ReleaseYearForSearchResult($query: String!) {
        search(q: $query) {
            ... on Media {
                title
                release_date
            }
            ... on Person {
                firstName
                lastName
                birthYear
            }
            ... on Company {
                name
                founded_on
            }
        }
    }

    union SearchResult = Movie | TVShow | TVShowEpisode | Company | Person

    enum Currency {
        EUR
        GBP
        USD
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