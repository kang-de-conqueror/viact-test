"use client";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import ReactStars from "react-stars";
import { RATE_MOVIE } from "@/graphql/mutations/user-rating.mutation";
import { getAccessTokenInBrowser } from "@/shared/helper";
import classes from "./movie-rating.module.css";

type Props = {
    movieId: number;
    userId: number;
    currentRating: number;
    totalVote: number;
};

export const UpdatableMovieRating = ({
    userId,
    movieId,
    currentRating,
    totalVote,
}: Props) => {
    console.log("totalVote", totalVote);
    const [userRatingMutation] = useMutation(RATE_MOVIE);
    const [userRating, setUserRating] = useState(0);
    const accessToken = getAccessTokenInBrowser();

    const submitRating = async () => {
        await userRatingMutation({
            variables: {
                movieId,
                userId,
                rating: userRating,
            },
            context: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
            onCompleted: () => {
                window.location.reload();
            },
            onError: (error) => {
                console.log(
                    "error submitRating",
                    JSON.stringify(error, null, 2)
                );
            },
        });
    };

    return (
        <div>
            <div className={classes.starWrapper}>
                <ReactStars
                    count={10}
                    size={14}
                    value={currentRating}
                    edit={true}
                    color2={"#e40914"}
                    half={true}
                    onChange={(newRating) => {
                        setUserRating(newRating);
                    }}
                />
                <span>{currentRating} / 10</span>
            </div>
            <p className={classes.totalVote}>Total vote: {totalVote}</p>
            <button onClick={submitRating} className={classes.btnSubmit}>
                Submit rating
            </button>
        </div>
    );
};
