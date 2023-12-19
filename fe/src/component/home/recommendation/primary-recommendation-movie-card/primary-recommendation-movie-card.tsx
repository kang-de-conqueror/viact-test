import ImDbScore from "@/component/shared/imdb-score/imdb-score";
import { Movie } from "@/shared/types/movie.types";
import classes from "./primary-recommendation-movie-card.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
    data: Movie;
};

const PrimaryRecommendationMovieCard = ({ data }: Props) => {
    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <div className={classes.leftMain}>
                    <Image
                        src={data?.posterPath || ""}
                        alt={data?.title}
                        fill
                        className={classes.img}
                    ></Image>
                    <div className={classes.overlay}></div>
                    <div className={classes.metadata}>
                        <ImDbScore score={data?.voteAverage || 0} />
                    </div>
                    <Image
                        src="/images/play.png"
                        alt="play"
                        width={50}
                        height={50}
                        className={classes.btnPlay}
                    />
                </div>
            </div>
            <div className={classes.right}>
                <Link href={`/movie/${data?.id}`} className={classes.title}>
                    {data?.title || ""}
                </Link>

                <span className={classes.releaseDate}>{data?.releaseDate}</span>
                <div className={classes.description}>{data?.overview}</div>
                <Link href={`/movie/${data?.id}`} className={classes.btnMore}>
                    View
                </Link>
            </div>
        </div>
    );
};

export default PrimaryRecommendationMovieCard;
