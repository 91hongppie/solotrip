import { ApolloClient, InMemoryCache, gql, useMutation} from "@apollo/client";


const client = new ApolloClient({
  uri: "https://exam.backend.solotrip.kr/graphql",
  cache: new InMemoryCache(),
})

export const LOGIN = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            accessToken
            name
        }
    }
`;


export default client