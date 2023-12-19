import { GET_MOVIE_BY_KEYWORD } from "@/graphql/queries/movie.queries";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

export const useSearchPage = () => {
    const [search, { data, loading, error }] =
        useLazyQuery(GET_MOVIE_BY_KEYWORD);
    const [query, setQuery] = useState("");

    const triggerSearch = async (query: string, page: number) => {
        if (query.trim() === "") return;
        await search({
            variables: {
                query,
                page,
                perPage: 20,
            },
        });
    };

    const onSearch = () => {
        triggerSearch(query, 1);
    };

    const onChangePage = (page: number) => {
        triggerSearch(query, page);
    };

    return {
        data,
        error,
        loading,
        setQuery,
        onSearch,
        onChangePage,
    };
};
