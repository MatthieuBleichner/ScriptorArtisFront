/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query task($id: Int!) {\n    task(id: $id) {\n      id\n      title\n      description\n      priority\n      date\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n": types.TaskDocument,
    "\n  mutation CreateTask($input: createTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      state {\n        id\n      }\n    }\n  }\n": types.CreateTaskDocument,
    "\n  query users {\n    users {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.UsersDocument,
    "\n  mutation login($input: loginInput!) {\n    login(input: $input)\n  }\n": types.LoginDocument,
    "\n  mutation UpdateTask($input: updateTaskInput!) {\n    updateTask(input: $input) {\n      id\n      title\n      description\n      state {\n        id\n      }\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  mutation DeleteTask($input: deleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n      state {\n        id\n      }\n    }\n  }\n": types.DeleteTaskDocument,
    "\n  query GetStates {\n    states {\n      id\n      title\n      index\n    }\n  }\n": types.GetStatesDocument,
    "\n  query GetFeaturedTasks($filter: TaskFilters!) {\n    featuredTasks(filter: $filter) {\n      id\n      state {\n        id\n      }\n    }\n  }\n": types.GetFeaturedTasksDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query task($id: Int!) {\n    task(id: $id) {\n      id\n      title\n      description\n      priority\n      date\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query task($id: Int!) {\n    task(id: $id) {\n      id\n      title\n      description\n      priority\n      date\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTask($input: createTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      state {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($input: createTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      state {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query users {\n    users {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query users {\n    users {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($input: loginInput!) {\n    login(input: $input)\n  }\n"): (typeof documents)["\n  mutation login($input: loginInput!) {\n    login(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTask($input: updateTaskInput!) {\n    updateTask(input: $input) {\n      id\n      title\n      description\n      state {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($input: updateTaskInput!) {\n    updateTask(input: $input) {\n      id\n      title\n      description\n      state {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTask($input: deleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n      state {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTask($input: deleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n      state {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStates {\n    states {\n      id\n      title\n      index\n    }\n  }\n"): (typeof documents)["\n  query GetStates {\n    states {\n      id\n      title\n      index\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFeaturedTasks($filter: TaskFilters!) {\n    featuredTasks(filter: $filter) {\n      id\n      state {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFeaturedTasks($filter: TaskFilters!) {\n    featuredTasks(filter: $filter) {\n      id\n      state {\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;