import { makeExecutableSchema } from 'graphql-tools';

export const Movie = `
    type Movie {
        id: ID!
        title: String!
        imbd_id: String
        adult: Boolean
        budget(currency: Currency = EUR): Int
    }
 `;

//  enum Currency {
//      EUR
//      GBP
//      USD
//  }