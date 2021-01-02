/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClipboard = /* GraphQL */ `
  mutation CreateClipboard(
    $input: CreateClipboardInput!
    $condition: ModelClipboardConditionInput
  ) {
    createClipboard(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
    }
  }
`;
export const updateClipboard = /* GraphQL */ `
  mutation UpdateClipboard(
    $input: UpdateClipboardInput!
    $condition: ModelClipboardConditionInput
  ) {
    updateClipboard(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
    }
  }
`;
export const deleteClipboard = /* GraphQL */ `
  mutation DeleteClipboard(
    $input: DeleteClipboardInput!
    $condition: ModelClipboardConditionInput
  ) {
    deleteClipboard(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
    }
  }
`;
