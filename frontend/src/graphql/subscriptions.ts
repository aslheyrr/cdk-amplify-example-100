/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const subscriveToLiveMessages = /* GraphQL */ `subscription SubscriveToLiveMessages {
  subscriveToLiveMessages
}
` as GeneratedSubscription<
  APITypes.SubscriveToLiveMessagesSubscriptionVariables,
  APITypes.SubscriveToLiveMessagesSubscription
>;
export const onCreateBlog = /* GraphQL */ `subscription OnCreateBlog(
  $filter: ModelSubscriptionBlogFilterInput
  $owner: String
) {
  onCreateBlog(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBlogSubscriptionVariables,
  APITypes.OnCreateBlogSubscription
>;
export const onUpdateBlog = /* GraphQL */ `subscription OnUpdateBlog(
  $filter: ModelSubscriptionBlogFilterInput
  $owner: String
) {
  onUpdateBlog(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBlogSubscriptionVariables,
  APITypes.OnUpdateBlogSubscription
>;
export const onDeleteBlog = /* GraphQL */ `subscription OnDeleteBlog(
  $filter: ModelSubscriptionBlogFilterInput
  $owner: String
) {
  onDeleteBlog(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBlogSubscriptionVariables,
  APITypes.OnDeleteBlogSubscription
>;
