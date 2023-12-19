"use client";

import SearchMovieItem from "@/component/movie/search-item/search-item";
import { Movie } from "@/shared/types/movie.types";
import classes from "./search.module.css";
import { useSearchPage } from "./use-search-page";

const Page = () => {
    const { data, error, loading, onSearch, onChangePage, setQuery } =
        useSearchPage();

    const items = data?.searchMovies?.items || [];
    const total = data?.searchMovies?.total || 0;
    const numberOfPages = Math.ceil(total / 20);

    return (
        <div className={classes.root}>
            <div className="container">
                <h3 className={classes.heading}>Search page</h3>
                <div className={classes.searchForm}>
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        className={classes.searchInput}
                        placeholder="Search movies"
                    />
                    <button onClick={onSearch} className={classes.btnSearch}>
                        Search
                    </button>
                </div>
                <section className={classes.searchResultContainer}>
                    <div className={classes.pagination}>
                        {Array.from(Array(numberOfPages).keys()).map((item) => (
                            <button
                                onClick={() => onChangePage(item + 1)}
                                className={classes.paginationItem}
                                style={{
                                    backgroundColor:
                                        item + 1 === data?.searchMovies?.page
                                            ? "red"
                                            : "transparent",
                                }}
                                key={item}
                            >
                                {item + 1}
                            </button>
                        ))}
                    </div>
                    {loading && <p>Loading...</p>}
                    <div className={classes.searchResults}>
                        {!loading &&
                            !error &&
                            items.map((item: Movie) => (
                                <SearchMovieItem data={item} key={item?.id} />
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Page;
