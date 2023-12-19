"use client";

import React from "react";
import PopularMovieCard from "./popular-movie-card/popular-movie-card";
import { GET_POPULAR_MOVIES } from "@/graphql/queries/movie.queries";
import { Movie } from "@/shared/types/movie.types";
import { useQuery } from "@apollo/client";
import Slider from "react-slick";
import classes from "./popular.module.css";

const options = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
};

export default function PopularMovies() {
    const { data } = useQuery(GET_POPULAR_MOVIES);

    const popularMovies = data?.popularMovies || [];

    return (
        <section className={classes.root}>
            <div className="container">
                <div className={classes.heading}>
                    <h3 className={classes.title}>Popular Movies</h3>
                </div>
                <div>
                    {popularMovies?.length > 0 && (
                        <Slider {...options}>
                            {popularMovies.map((item: Movie) => (
                                <PopularMovieCard data={item} key={item?.id} />
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
        </section>
    );
}
