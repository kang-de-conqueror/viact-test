import PopularMovies from "@/component/home/popular/popular";
import { MovieRecommendation } from "@/component/home/recommendation/movie-recommendation";
import { Trending } from "@/component/home/trending/trending";

export default async function Home() {
    return (
        <main>
            <MovieRecommendation />
            <PopularMovies />
            <Trending />
        </main>
    );
}
