import { gql } from "@apollo/client";

export const GET_RECOMMENDED_MOVIES = gql`
    query {
        recommendedMovies {
            id
            title
            overview
            posterPath
            releaseDate
            voteAverage
        }
    }
`;

export const GET_TRENDING_MOVIES = gql`
    query {
        trendingMovies {
            id
            title
            overview
            posterPath
            releaseDate
            voteAverage
        }
    }
`;

export const GET_POPULAR_MOVIES = gql`
    query {
        popularMovies {
            id
            title
            posterPath
            voteAverage
            productionCompanies {
                id
                name
            }
            productionCountries {
                id
                name
            }
        }
    }
`;

export const GET_MOVIES_BY_GENRE = gql`
    query getMoviesByGenre($genreId: Int!, $page: Int, $perPage: Int) {
        findMoviesByGenre(
            genreId: $genreId
            pagination: { page: $page, perPage: $perPage }
        ) {
            items {
                id
                title
                posterPath
            }
            total
            page
            perPage
        }
    }
`;

export const GET_MOVIE_DETAIL = gql`
    query getMovieById($id: Int!) {
        movie(id: $id) {
            id
            title
            voteAverage
            posterPath
            voteCount
            releaseDate
            overview
            genres {
                id
                name
            }
            productionCompanies {
                id
                name
            }
        }
    }
`;

export const GET_MOVIE_BY_KEYWORD = gql`
    query getMoviesByKeyword($query: String!, $page: Int, $perPage: Int) {
        searchMovies(
            query: $query
            pagination: { page: $page, perPage: $perPage }
        ) {
            items {
                id
                title
                posterPath
                voteAverage
            }
            total
            page
            perPage
        }
    }
`;
