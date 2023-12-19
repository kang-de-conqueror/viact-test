import { Movie } from "@/shared/types/movie.types";
import Link from "next/link";
import classes from "./sub-recommendation.module.css";
import Image from "next/image";

type Props = {
    data: Movie;
};

const SubRecommendationMovieCard = ({ data }: Props) => {
    return (
        <div className={classes.root}>
            <figure className={classes.imgWrapper}>
                <Image
                    src={data?.posterPath || ""}
                    alt={data?.title}
                    fill
                    className={classes.img}
                ></Image>
            </figure>
            <Link href={`/movie/${data?.id}`} className={classes.title}>
                {data?.title || ""}
            </Link>
            <div className={classes.releaseDate}>{data?.releaseDate}</div>
        </div>
    );
};

export default SubRecommendationMovieCard;
