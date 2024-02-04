/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBlog = /* GraphQL */ `query GetBlog($id: ID!) {
  getBlog(id: $id) {
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
` as GeneratedQuery<APITypes.GetBlogQueryVariables, APITypes.GetBlogQuery>;
export const listBlogs = /* GraphQL */ `query ListBlogs(
  $filter: ModelBlogFilterInput
  $limit: Int
  $nextToken: String
) {
  listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      title
      content
      authors
      id
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListBlogsQueryVariables, APITypes.ListBlogsQuery>;
