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
    "\n  query GetComponent($id: ID!) {\n    component(id: $id) {\n      id\n      name\n      teamId\n      versions {\n        name\n        number\n        prompt\n        promptImageIds\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetComponentDocument,
    "\n  mutation DeleteComponent($id: ID!) {\n    deleteComponent(id: $id)\n  }\n": types.DeleteComponentDocument,
    "\n  query ListComponents {\n    components {\n      id\n      name\n      versions {\n        number\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.ListComponentsDocument,
    "\n  mutation GenerateComponent($input: GenerateComponentInput!) {\n    generateComponent(input: $input) {\n      id\n      name\n      versions {\n        number\n        prompt\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      createdAt\n      updatedAt\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n    }\n  }\n": types.GenerateComponentDocument,
    "\n  mutation IterateOnComponent($input: IterateOnComponentInput!) {\n    iterateOnComponent(input: $input) {\n      id\n      name\n      versions {\n        number\n        prompt\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      createdAt\n      updatedAt\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n    }\n  }\n": types.IterateOnComponentDocument,
    "\n  query ListSystems {\n    systems {\n      id\n      name\n      components {\n        id\n        name\n        versions {\n          number\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.ListSystemsDocument,
    "\n  mutation UploadImage($file: File!) {\n    uploadImage(file: $file) {\n      id\n      originalName\n      mimeType\n      size\n      uploadedAt\n    }\n  }\n": types.UploadImageDocument,
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
export function gql(source: "\n  query GetComponent($id: ID!) {\n    component(id: $id) {\n      id\n      name\n      teamId\n      versions {\n        name\n        number\n        prompt\n        promptImageIds\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetComponent($id: ID!) {\n    component(id: $id) {\n      id\n      name\n      teamId\n      versions {\n        name\n        number\n        prompt\n        promptImageIds\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteComponent($id: ID!) {\n    deleteComponent(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteComponent($id: ID!) {\n    deleteComponent(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListComponents {\n    components {\n      id\n      name\n      versions {\n        number\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query ListComponents {\n    components {\n      id\n      name\n      versions {\n        number\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation GenerateComponent($input: GenerateComponentInput!) {\n    generateComponent(input: $input) {\n      id\n      name\n      versions {\n        number\n        prompt\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      createdAt\n      updatedAt\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation GenerateComponent($input: GenerateComponentInput!) {\n    generateComponent(input: $input) {\n      id\n      name\n      versions {\n        number\n        prompt\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      createdAt\n      updatedAt\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation IterateOnComponent($input: IterateOnComponentInput!) {\n    iterateOnComponent(input: $input) {\n      id\n      name\n      versions {\n        number\n        prompt\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      createdAt\n      updatedAt\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation IterateOnComponent($input: IterateOnComponentInput!) {\n    iterateOnComponent(input: $input) {\n      id\n      name\n      versions {\n        number\n        prompt\n        code\n        description\n        technicalDocumentation\n        createdAt\n        presets {\n          name\n          props\n        }\n      }\n      createdAt\n      updatedAt\n      stack {\n        language\n        framework {\n          name\n          version\n        }\n        dependencies {\n          key\n          name\n          version\n          type\n          cdnUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListSystems {\n    systems {\n      id\n      name\n      components {\n        id\n        name\n        versions {\n          number\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListSystems {\n    systems {\n      id\n      name\n      components {\n        id\n        name\n        versions {\n          number\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UploadImage($file: File!) {\n    uploadImage(file: $file) {\n      id\n      originalName\n      mimeType\n      size\n      uploadedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UploadImage($file: File!) {\n    uploadImage(file: $file) {\n      id\n      originalName\n      mimeType\n      size\n      uploadedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;