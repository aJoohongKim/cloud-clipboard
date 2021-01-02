/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClipboard = /* GraphQL */ `
  query GetClipboard($id: ID!) {
    getClipboard(id: $id) {
      id
      payload
      createdAt
      updatedAt
    }
  }
`;
export const listClipboards = /* GraphQL */ `
  query ListClipboards(
    $filter: ModelClipboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClipboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        payload
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
