/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const broadcastLiveMessage = /* GraphQL */ `mutation BroadcastLiveMessage($message: String) {
  broadcastLiveMessage(message: $message)
}
` as GeneratedMutation<
  APITypes.BroadcastLiveMessageMutationVariables,
  APITypes.BroadcastLiveMessageMutation
>;
export const createBlog = /* GraphQL */ `mutation CreateBlog(
  $input: CreateBlogInput!
  $condition: ModelBlogConditionInput
) {
  createBlog(input: $input, condition: $condition) {
    title
    content
    authors
    id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBlogMutationVariables,
  APITypes.CreateBlogMutation
>;
export const updateBlog = /* GraphQL */ `mutation UpdateBlog(
  $input: UpdateBlogInput!
  $condition: ModelBlogConditionInput
) {
  updateBlog(input: $input, condition: $condition) {
    title
    content
    authors
    id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBlogMutationVariables,
  APITypes.UpdateBlogMutation
>;
export const deleteBlog = /* GraphQL */ `mutation DeleteBlog(
  $input: DeleteBlogInput!
  $condition: ModelBlogConditionInput
) {
  deleteBlog(input: $input, condition: $condition) {
    title
    content
    authors
    id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBlogMutationVariables,
  APITypes.DeleteBlogMutation
>;
