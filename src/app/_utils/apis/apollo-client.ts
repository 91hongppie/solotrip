import { CreateSolplace } from "@/app/_stores/solplaceStore";
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

export const FETCH_SOLPLACE_LOG_NAME_SET = (page: number) => {
  return gql`query FetchSolplaceLogsForNameSet($page: Int! = ${page}) {
            fetchSolplaceLogsForNameSet(page: $page) {
              scalar
            }
          }`
}

export const CREATE_SOLPLACE_LOG = gql`
    mutation CreateSolplaceLogBySolplaceName($solplaceName: String!, $createSolplaceLogInput: CreateSolplaceLogInput!) {
        createSolplaceLogBySolplaceName(solplaceName: $solplaceName, createSolplaceLogInput: $createSolplaceLogInput) {
            id
            introduction
            solplaceName
            images
            userId
            createdAt
            updatedAt
            deletedAt
        }
    }
`;


export const DELETE_SOLPLACE = gql`
 mutation DeleteSolplaceLogById($id: ID!) {
        deleteSolplaceLogById(id: $id) {
            scalar
        }
    }
`

export default client