/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateClipboardInput = {
  id?: string | null,
  payload: string,
};

export type ModelClipboardConditionInput = {
  payload?: ModelStringInput | null,
  and?: Array< ModelClipboardConditionInput | null > | null,
  or?: Array< ModelClipboardConditionInput | null > | null,
  not?: ModelClipboardConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateClipboardInput = {
  id: string,
  payload?: string | null,
};

export type DeleteClipboardInput = {
  id?: string | null,
};

export type ModelClipboardFilterInput = {
  id?: ModelIDInput | null,
  payload?: ModelStringInput | null,
  and?: Array< ModelClipboardFilterInput | null > | null,
  or?: Array< ModelClipboardFilterInput | null > | null,
  not?: ModelClipboardFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateClipboardMutationVariables = {
  input: CreateClipboardInput,
  condition?: ModelClipboardConditionInput | null,
};

export type CreateClipboardMutation = {
  createClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClipboardMutationVariables = {
  input: UpdateClipboardInput,
  condition?: ModelClipboardConditionInput | null,
};

export type UpdateClipboardMutation = {
  updateClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClipboardMutationVariables = {
  input: DeleteClipboardInput,
  condition?: ModelClipboardConditionInput | null,
};

export type DeleteClipboardMutation = {
  deleteClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetClipboardQueryVariables = {
  id: string,
};

export type GetClipboardQuery = {
  getClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClipboardsQueryVariables = {
  filter?: ModelClipboardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClipboardsQuery = {
  listClipboards:  {
    __typename: "ModelClipboardConnection",
    items:  Array< {
      __typename: "Clipboard",
      id: string,
      payload: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateClipboardSubscription = {
  onCreateClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClipboardSubscription = {
  onUpdateClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClipboardSubscription = {
  onDeleteClipboard:  {
    __typename: "Clipboard",
    id: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
