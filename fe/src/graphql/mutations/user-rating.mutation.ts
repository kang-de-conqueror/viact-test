import { gql } from "@apollo/client";

export const RATE_MOVIE = gql`
    mutation rateMovie($movieId: Int!, $rating: Float!) {
        rateMovie(input: { movieId: $movieId, rating: $rating }) {
            id
            movieId
            rating
        }
    }
`;
