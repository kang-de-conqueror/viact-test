import { gql } from "@apollo/client";

export const GENRE_QUERY = gql`
    query {
        genres{
            id
            name
        }
    }
`;