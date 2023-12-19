import BlockedMovieRating from "@/component/movie/rating/blocked-movie-rating";
import { MovieRating } from "@/component/movie/rating/movie-rating";
import { ServerSideApi } from "@/graphql/api/server-side.api";
import { cookies } from "next/headers";
import Image from "next/image";
import classes from "./movie-detail.module.css";

const Page = async ({ params }: { params: { id: string } }) => {
    const accessToken = cookies().get("accessToken")?.value;
    const { id } = params;
    const currentUser = await ServerSideApi.getCurrentUser(accessToken);
    const userId = currentUser?.id;

    const data = await ServerSideApi.getMovieDetail(Number(id));
    const currentRating = data?.voteAverage;

    console.log("data", data);

    return (
        <article className={classes.root}>
            <div className="container">
                <div className={classes.main}>
                    <div className={classes.left}>
                        <figure className={classes.imgWrapper}>
                            <Image
                                src={data?.posterPath || ""}
                                alt={data?.title}
                                fill
                                className={classes.img}
                            />
                        </figure>
                    </div>
                    <div className={classes.right}>
                        <h1 className={classes.title}>{data?.title}</h1>
                        <p className={classes.releaseDate}>
                            {data?.releaseDate || ""}
                        </p>
                        <p className={classes.description}>
                            {data?.overview || ""}
                        </p>
                        <div className={classes.rating}>
                            {(userId && (
                                <MovieRating
                                    movieId={data?.id}
                                    userId={userId}
                                    currentRating={currentRating}
                                    totalVote={data?.voteCount}
                                />
                            )) || (
                                <BlockedMovieRating
                                    currentRating={currentRating}
                                    totalVote={data?.voteCount}
                                />
                            )}
                        </div>
                        <div className={classes.productionCompanyWrapper}>
                            <h3 className={classes.productionCompanyHeading}>
                                Production companies
                            </h3>
                            <ul className={classes.productionCompanyList}>
                                {data?.productionCompanies?.map((item) => (
                                    <li
                                        className={
                                            classes.productionCompanyItem
                                        }
                                        key={item?.id}
                                    >
                                        {item?.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={classes.genreWrapper}>
                            <h3 className={classes.genreHeading}>Genres</h3>
                            <ul className={classes.genreList}>
                                {data?.genres?.map((item) => (
                                    <li
                                        className={classes.genreItem}
                                        key={item?.id}
                                    >
                                        {item?.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Page;
