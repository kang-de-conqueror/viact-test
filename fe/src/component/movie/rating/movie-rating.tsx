"use client";

import { GET_CURRENT_USER_RATING_OF_CURRENT_MOVIE } from "@/graphql/queries/user-rating.queries";
import { useQuery } from "@apollo/client";
import { UpdatableMovieRating } from "./updatable-movie-rating";
import BlockedMovieRating from "./blocked-movie-rating";
import { getAccessTokenInBrowser } from "@/shared/helper";

type Props = {
    movieId: number;
    userId: number;
    totalVote: number;
    currentRating: number;
};

export const MovieRating = ({
    userId,
    movieId,
    currentRating,
    totalVote,
}: Props) => {
    const accessToken = getAccessTokenInBrowser();
    const { data, loading } = useQuery(
        GET_CURRENT_USER_RATING_OF_CURRENT_MOVIE,
        {
            variables: {
                movieId,
                userId,
            },
            context: {
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : "",
                },
            },
        }
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log("data?.userRatingOfMovie", data?.userRatingOfMovie);

    if (data?.userRatingOfMovie?.rating) {
        return (
            <BlockedMovieRating
                currentRating={currentRating}
                totalVote={totalVote}
                ratedScore={data?.userRatingOfMovie?.rating}
            />
        );
    }

    return (
        <UpdatableMovieRating
            movieId={movieId}
            userId={userId}
            currentRating={currentRating}
            totalVote={totalVote}
        />
    );
};
