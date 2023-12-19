import { Movie } from "@/shared/types/movie.types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImDbScore from "@/component/shared/imdb-score/imdb-score";
import classes from "./popular-movie-card.module.css";

type Props = {
    data: Movie;
};

const PopularMovieCard = ({ data }: Props) => {
    return (
        <article className={classes.root}>
            <div className={classes.banner}>
                <figure className={classes.imgWrapper}>
                    <Image
                        src={data?.posterPath || ""}
                        alt={data?.title}
                        fill
                        className={classes.img}
                    ></Image>
                </figure>

                <div className={classes.overlay}></div>

                <div className={classes.metadata}>
                    <ImDbScore score={data?.voteAverage || 0} />

                    <div className={classes.labels}>
                        <div className={classes.label}>Popular </div>
                    </div>
                </div>

                <Link href={`/movie/${data?.id}`} className={classes.btnPlay}>
                    <Image
                        src="/images/play.png"
                        alt="play"
                        width={50}
                        height={50}
                    />
                </Link>
            </div>

            <h4 className={classes.title}>
                <Link href={`/movie/${data?.id}`}>{data?.title || ""}</Link>
            </h4>

            <div className={classes.tagLine}>{data?.tagLine} </div>
        </article>
    );
};

export default PopularMovieCard;
