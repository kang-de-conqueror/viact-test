import { ServerSideApi } from "@/graphql/api/server-side.api";
import { Movie } from "@/shared/types/movie.types";
import { cookies } from "next/headers";
import classes from "./movie-recommendation.module.css";
import PrimaryRecommendationMovieCard from "./primary-recommendation-movie-card/primary-recommendation-movie-card";
import SubRecommendationMovieCard from "./sub-recommendation-movie-card/sub-recommendation-movie.card";

export async function MovieRecommendation() {
    const token = cookies().get("accessToken")?.value;
    const data = await ServerSideApi.getRecommendations(token);

    if (!data.length) return null;

    return (
        <section className={classes.root}>
            <div className="container">
                <div className={classes.heading}>
                    <div className={classes.wrappedTitle}>
                        <h3 className={classes.title}>Recommended Movies</h3>
                    </div>
                </div>
                <PrimaryRecommendationMovieCard data={data?.[0]} />x
                <div className={classes.subRoot}>
                    {data
                        .slice(1, Math.min(5, data.length))
                        .map((item: Movie) => {
                            return (
                                <SubRecommendationMovieCard
                                    data={item}
                                    key={item?.id}
                                />
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
