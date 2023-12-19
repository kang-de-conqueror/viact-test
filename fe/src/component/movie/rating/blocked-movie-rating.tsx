"use client";

import React from "react";
import ReactStars from "react-stars";
import classes from "./movie-rating.module.css";

type Props = {
    currentRating: number;
    ratedScore?: number;
    totalVote: number;
};

const BlockedMovieRating = ({
    currentRating,
    ratedScore,
    totalVote,
}: Props) => {
    return (
        <div>
            <div className={classes.starWrapper}>
                <ReactStars
                    count={10}
                    size={14}
                    value={currentRating}
                    edit={false}
                    color2={"#e40914"}
                    half={true}
                />{" "}
                <span>{currentRating} / 10</span>
            </div>
            <span className={classes.totalVote}>Total vote: {totalVote}</span>
            {ratedScore && (
                <h5>You rated this movie {currentRating} out of 10</h5>
            )}
        </div>
    );
};

export default BlockedMovieRating;
