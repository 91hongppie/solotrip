import { ApolloClient, InMemoryCache, gql, useMutation, useQuery} from "@apollo/client";


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


export const FETCH_SOLPLACE_LOG = (page: number) => {
  return gql`query FetchSolplaceLogs($page: Int! = ${page}) {
            fetchSolplaceLogs(page: $page) {
              id
              introduction
              solplaceName
              images
              userId
              createdAt
              updatedAt
              deletedAt
            }
          }`
}


export default client