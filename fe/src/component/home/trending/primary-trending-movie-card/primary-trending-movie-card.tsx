import { Movie } from "@/shared/types/movie.types";
import React from "react";
import classes from "./primary-trending-movie-card.module.css";
import Image from "next/image";
import Link from "next/link";
import ImDbScore from "@/component/shared/imdb-score/imdb-score";

type Props = {
    data: Movie;
};

const PrimaryTrendingMovieCard = ({ data }: Props) => {
    return (
        <Link href={`/movie/${data.id}`} className={classes.root}>
            <Image src={data?.posterPath || ""} alt={data?.title} fill></Image>

            <div className={classes.overlay}></div>

            <div className={classes.metadata}>
                <ImDbScore score={data?.voteAverage || 0} />
                <div className={classes.label}>Trend </div>
            </div>

            <div className={classes.content}>
                <h4 className={classes.title}>{data?.title}</h4>
                <div className={classes.info}>
                    <span className={classes.releaseDate}>
                        {data?.releaseDate || ""}
                    </span>
                </div>

                <div className={classes.description}>{data?.overview}</div>
            </div>
        </Link>
    );
};

export default PrimaryTrendingMovieCard;
