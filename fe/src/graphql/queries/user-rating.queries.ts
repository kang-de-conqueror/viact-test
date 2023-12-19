import { gql } from "@apollo/client";

export const GET_CURRENT_USER_RATING_OF_CURRENT_MOVIE = gql`
    query getCurrentUserRatingOfCurrentMovie($movieId: Float!) {
        userRatingOfMovie(movieId: $movieId) {
            id
            movieId
            rating
        }
    }
`;
