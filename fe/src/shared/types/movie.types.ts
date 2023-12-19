import { Genre } from "./genre.types";

type ProductionCompany = {
    id: number;
    name: string;
};

type ProductionCountry = {
    iso31661: string;
    name: string;
};

export type Movie = {
    id: number;
    imdbid: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    tagLine: string;
    releaseDate: string;
    runtime: number;
    adult: boolean;
    status: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    genres: Genre[];
    productionCompanies: ProductionCompany[];
    productionCountries: ProductionCountry[];
};
