import { Movie } from "@/shared/types/movie.types";
import React from "react";
import classes from "./search-item.module.css";
import Image from "next/image";
import Link from "next/link";
import ImDbScore from "@/component/shared/imdb-score/imdb-score";

type Props = {
    data: Movie;
};

const SearchMovieItem = ({ data }: Props) => {
    return (
        <Link href={`/movie/${data.id}`} className={classes.root}>
            <figure className={classes.imgWrapper}>
                <Image
                    src={data?.posterPath || ""}
                    alt={data?.title}
                    fill
                    className={classes.img}
                ></Image>
                <div className={classes.overlay} />
            </figure>

            <div className={classes.metadata}>
                <ImDbScore score={data?.voteAverage || 0} />
            </div>

            <div className={classes.content}>
                <h4 className={classes.title}>{data?.title}</h4>
            </div>
        </Link>
    );
};

export default SearchMovieItem;
