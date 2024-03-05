/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new task */
  createTask: Task;
  /** Delete a task */
  deleteTask: Task;
  /** Update a task */
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input?: InputMaybe<CreateTaskInput>;
};


export type MutationDeleteTaskArgs = {
  input?: InputMaybe<DeleteTaskInput>;
};


export type MutationUpdateTaskArgs = {
  input?: InputMaybe<UpdateTaskInput>;
};

export type Query = {
  __typename?: 'Query';
  /** List of all Tasks of this project. */
  featuredTasks: Array<Task>;
  /** List of all states of this project. */
  states?: Maybe<Array<State>>;
  /** Retrieves a specific playlist. */
  task?: Maybe<Task>;
  /** List of tasks associated to a state */
  tasksByState?: Maybe<Array<Maybe<Task>>>;
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTasksByStateArgs = {
  id: Scalars['Int']['input'];
};

/** Define the status of a story to be done Todo, In Progress, Done */
export type State = {
  __typename?: 'State';
  /** The id of the status */
  id: Scalars['Int']['output'];
  /** The position of the status */
  index: Scalars['Int']['output'];
  /** The tasks associated to this status */
  tasks?: Maybe<Array<Maybe<Task>>>;
  /** The name of the status */
  title: Scalars['String']['output'];
};

/** Define a story to be done */
export type Task = {
  __typename?: 'Task';
  /** The description of the task */
  description?: Maybe<Scalars['String']['output']>;
  /** The id of the task */
  id: Scalars['Int']['output'];
  /** Who is the owner of this task */
  owner?: Maybe<User>;
  /** The state of the task - ToDo, OnGoing, Done */
  state: Scalars['Int']['output'];
  /** The title of the task */
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  /** The email of the user */
  email: Scalars['String']['output'];
  /** The name of the user */
  firstName: Scalars['String']['output'];
  /** The id of the user */
  id: Scalars['Int']['output'];
  /** The last name of the user */
  lastName: Scalars['String']['output'];
  /** List of tasks ids' handled by this user */
  tasks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CreateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type DeleteTaskInput = {
  id: Scalars['Int']['input'];
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatesQuery = { __typename?: 'Query', states?: Array<{ __typename?: 'State', id: number, title: string, index: number }> | null };

export type TasksByStateQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type TasksByStateQuery = { __typename?: 'Query', tasksByState?: Array<{ __typename?: 'Task', id: number } | null> | null };

export type TaskQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type TaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: number, title: string, description?: string | null } | null };


export const GetStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"states"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<GetStatesQuery, GetStatesQueryVariables>;
export const TasksByStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tasksByState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasksByState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TasksByStateQuery, TasksByStateQueryVariables>;
export const TaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"task"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<TaskQuery, TaskQueryVariables>;