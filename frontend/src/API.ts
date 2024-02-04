/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBlogInput = {
  title?: string | null,
  content?: string | null,
  authors?: Array< string | null > | null,
  id?: string | null,
};

export type ModelBlogConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  authors?: ModelStringInput | null,
  and?: Array< ModelBlogConditionInput | null > | null,
  or?: Array< ModelBlogConditionInput | null > | null,
  not?: ModelBlogConditionInput | null,
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

export type Blog = {
  __typename: "Blog",
  title?: string | null,
  content?: string | null,
  authors?: Array< string | null > | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateBlogInput = {
  title?: string | null,
  content?: string | null,
  authors?: Array< string | null > | null,
  id: string,
};

export type DeleteBlogInput = {
  id: string,
};

export type ModelBlogFilterInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  authors?: ModelStringInput | null,
  and?: Array< ModelBlogFilterInput | null > | null,
  or?: Array< ModelBlogFilterInput | null > | null,
  not?: ModelBlogFilterInput | null,
};

export type ModelBlogConnection = {
  __typename: "ModelBlogConnection",
  items:  Array<Blog | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionBlogFilterInput = {
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  authors?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBlogFilterInput | null > | null,
  or?: Array< ModelSubscriptionBlogFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type BroadcastLiveMessageMutationVariables = {
  message?: string | null,
};

export type BroadcastLiveMessageMutation = {
  broadcastLiveMessage?: string | null,
};

export type CreateBlogMutationVariables = {
  input: CreateBlogInput,
  condition?: ModelBlogConditionInput | null,
};

export type CreateBlogMutation = {
  createBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateBlogMutationVariables = {
  input: UpdateBlogInput,
  condition?: ModelBlogConditionInput | null,
};

export type UpdateBlogMutation = {
  updateBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteBlogMutationVariables = {
  input: DeleteBlogInput,
  condition?: ModelBlogConditionInput | null,
};

export type DeleteBlogMutation = {
  deleteBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetBlogQueryVariables = {
  id: string,
};

export type GetBlogQuery = {
  getBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListBlogsQueryVariables = {
  filter?: ModelBlogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBlogsQuery = {
  listBlogs?:  {
    __typename: "ModelBlogConnection",
    items:  Array< {
      __typename: "Blog",
      title?: string | null,
      content?: string | null,
      authors?: Array< string | null > | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SubscriveToLiveMessagesSubscriptionVariables = {
};

export type SubscriveToLiveMessagesSubscription = {
  subscriveToLiveMessages?: string | null,
};

export type OnCreateBlogSubscriptionVariables = {
  filter?: ModelSubscriptionBlogFilterInput | null,
  owner?: string | null,
};

export type OnCreateBlogSubscription = {
  onCreateBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateBlogSubscriptionVariables = {
  filter?: ModelSubscriptionBlogFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBlogSubscription = {
  onUpdateBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteBlogSubscriptionVariables = {
  filter?: ModelSubscriptionBlogFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBlogSubscription = {
  onDeleteBlog?:  {
    __typename: "Blog",
    title?: string | null,
    content?: string | null,
    authors?: Array< string | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
