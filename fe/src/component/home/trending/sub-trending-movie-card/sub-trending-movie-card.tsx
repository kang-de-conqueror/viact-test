import { Movie } from "@/shared/types/movie.types";
import React from "react";
import classes from "./sub-trending-movie-card.module.css";
import Image from "next/image";
import Link from "next/link";
import ImDbScore from "@/component/shared/imdb-score/imdb-score";

type Props = {
    data: Movie;
};

const SubTrendingMovieCard = ({ data }: Props) => {
    return (
        <Link href={`/movie/${data.id}`} className={classes.root}>
            <Image src={data?.posterPath || ""} alt={data?.title} fill></Image>
            <div className={classes.overlay} />

            <div className={classes.metadata}>
                <ImDbScore score={data?.voteAverage || 0} />
                <div className={classes.label}>Hot </div>
            </div>

            <div className={classes.content}>
                <h4 className={classes.title}>{data?.title}</h4>
            </div>
        </Link>
    );
};

export default SubTrendingMovieCard;
