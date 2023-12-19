import { ServerSideApi } from "@/graphql/api/server-side.api";
import { Movie } from "@/shared/types/movie.types";
import PrimaryTrendingMovieCard from "./primary-trending-movie-card/primary-trending-movie-card";
import SubTrendingMovieCard from "./sub-trending-movie-card/sub-trending-movie-card";
import classes from "./trending.module.css";

export async function Trending() {
    const data = await ServerSideApi.getTrendingMovies();

    return (
        <section className={classes.root}>
            <div className="container">
                <div className={classes.heading}>
                    <div className={classes.wrappedTitle}>
                        <h3 className={classes.title}>Trending Movies </h3>
                    </div>
                </div>
                {data?.length > 0 && (
                    <div className={classes.grid}>
                        <PrimaryTrendingMovieCard data={data?.[0]} />
                        {data
                            ?.slice(1, Math.min(9, data.length))
                            .map((item: Movie, idx: number) => {
                                return (
                                    <SubTrendingMovieCard
                                        data={item}
                                        key={item?.id || idx}
                                    />
                                );
                            })}
                    </div>
                )}
            </div>
        </section>
    );
}
