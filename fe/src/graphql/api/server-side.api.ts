import { GET_CURRENT_USER } from "../queries/auth.queries";
import { getClient } from "@/shared/lib/graphql-client";
import {
    GET_MOVIE_DETAIL,
    GET_RECOMMENDED_MOVIES,
    GET_TRENDING_MOVIES,
} from "../queries/movie.queries";

export class ServerSideApi {
    private static constructHeaderAuthorization(accessToken?: string) {
        return {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
        };
    }

    public static async getCurrentUser(accessToken?: string) {
        if (!accessToken) return null;

        try {
            const { data } = await getClient().query({
                query: GET_CURRENT_USER,
                context: {
                    ...ServerSideApi.constructHeaderAuthorization(accessToken),
                },
            });

            return data?.whoAmI;
        } catch (error) {
            console.error("error getting current user", error);
            return null;
        }
    }

    public static async getMovieDetail(id: number) {
        if (!id || isNaN(id)) return null;

        try {
            const { data } = await getClient().query({
                query: GET_MOVIE_DETAIL,
                variables: {
                    id: Number(id),
                },
            });

            return data?.movie;
        } catch (error) {
            console.error("error getting movie detail", error);
            return null;
        }
    }

    public static async getRecommendations(accessToken?: string) {
        if (!accessToken) return [];

        try {
            const { data } = await getClient().query({
                query: GET_RECOMMENDED_MOVIES,
                context: {
                    ...ServerSideApi.constructHeaderAuthorization(accessToken),
                },
            });

            return data?.recommendedMovies || [];
        } catch (error) {
            console.error("error getting recommendations", error);
            return [];
        }
    }

    public static async getTrendingMovies() {
        try {
            const { data } = await getClient().query({
                query: GET_TRENDING_MOVIES,
            });

            return data?.trendingMovies || [];
        } catch (error) {
            console.error("error getting trending movies", error);
            return [];
        }
    }
}
