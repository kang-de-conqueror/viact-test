import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
    mutation register($username: String!, $password: String!, $name: String!) {
        register(input: { username: $username, password: $password, name: $name }) {
            accessToken
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
            accessToken
        }
    }
`;
