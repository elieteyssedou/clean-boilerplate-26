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
  File: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Component = {
  __typename?: 'Component';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  stack: Stack;
  teamId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  versions: Array<ComponentVersion>;
};

export type ComponentVersion = {
  __typename?: 'ComponentVersion';
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  presets: Array<Preset>;
  prompt: Scalars['String']['output'];
  promptImageIds: Array<Scalars['ID']['output']>;
  technicalDocumentation: Scalars['String']['output'];
};

export type Dependency = {
  __typename?: 'Dependency';
  cdnUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Framework = {
  __typename?: 'Framework';
  name: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type FrameworkInput = {
  name: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type GenerateComponentInput = {
  imageIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
  stack: StackInput;
};

export type IterateOnComponentInput = {
  componentId: Scalars['ID']['input'];
  imageIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  iterationPrompt: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  deleteComponent: Scalars['Boolean']['output'];
  generateComponent: Component;
  iterateOnComponent: Component;
  uploadImage: PromptImage;
};


export type MutationDeleteComponentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGenerateComponentArgs = {
  input: GenerateComponentInput;
};


export type MutationIterateOnComponentArgs = {
  input: IterateOnComponentInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['File']['input'];
};

export type Preset = {
  __typename?: 'Preset';
  name: Scalars['String']['output'];
  props: Scalars['JSON']['output'];
};

export type PromptImage = {
  __typename?: 'PromptImage';
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  uploadedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  component?: Maybe<Component>;
  components: Array<Component>;
  me: User;
  systems: Array<Maybe<System>>;
};


export type QueryComponentArgs = {
  id: Scalars['ID']['input'];
};

export type Stack = {
  __typename?: 'Stack';
  dependencies: Array<Dependency>;
  framework: Framework;
  language: Scalars['String']['output'];
};

export type StackInput = {
  dependencyKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  framework: FrameworkInput;
  language: Scalars['String']['input'];
};

export type System = {
  __typename?: 'System';
  components: Array<Component>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GetComponentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetComponentQuery = { __typename?: 'Query', component?: { __typename?: 'Component', id: string, name: string, teamId: string, createdAt: string, updatedAt: string, versions: Array<{ __typename?: 'ComponentVersion', name: string, number: number, prompt: string, promptImageIds: Array<string>, code: string, description: string, technicalDocumentation: string, createdAt: string, presets: Array<{ __typename?: 'Preset', name: string, props: any }> }>, stack: { __typename?: 'Stack', language: string, framework: { __typename?: 'Framework', name: string, version: string }, dependencies: Array<{ __typename?: 'Dependency', key: string, name: string, version: string, type: string, cdnUrl?: string | null }> } } | null };

export type DeleteComponentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteComponentMutation = { __typename?: 'Mutation', deleteComponent: boolean };

export type ListComponentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListComponentsQuery = { __typename?: 'Query', components: Array<{ __typename?: 'Component', id: string, name: string, createdAt: string, updatedAt: string, versions: Array<{ __typename?: 'ComponentVersion', number: number }> }> };

export type GenerateComponentMutationVariables = Exact<{
  input: GenerateComponentInput;
}>;


export type GenerateComponentMutation = { __typename?: 'Mutation', generateComponent: { __typename?: 'Component', id: string, name: string, createdAt: string, updatedAt: string, versions: Array<{ __typename?: 'ComponentVersion', number: number, prompt: string, code: string, description: string, technicalDocumentation: string, createdAt: string, presets: Array<{ __typename?: 'Preset', name: string, props: any }> }>, stack: { __typename?: 'Stack', language: string, framework: { __typename?: 'Framework', name: string, version: string }, dependencies: Array<{ __typename?: 'Dependency', key: string, name: string, version: string, type: string, cdnUrl?: string | null }> } } };

export type IterateOnComponentMutationVariables = Exact<{
  input: IterateOnComponentInput;
}>;


export type IterateOnComponentMutation = { __typename?: 'Mutation', iterateOnComponent: { __typename?: 'Component', id: string, name: string, createdAt: string, updatedAt: string, versions: Array<{ __typename?: 'ComponentVersion', number: number, prompt: string, code: string, description: string, technicalDocumentation: string, createdAt: string, presets: Array<{ __typename?: 'Preset', name: string, props: any }> }>, stack: { __typename?: 'Stack', language: string, framework: { __typename?: 'Framework', name: string, version: string }, dependencies: Array<{ __typename?: 'Dependency', key: string, name: string, version: string, type: string, cdnUrl?: string | null }> } } };

export type ListSystemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSystemsQuery = { __typename?: 'Query', systems: Array<{ __typename?: 'System', id: string, name: string, components: Array<{ __typename?: 'Component', id: string, name: string, createdAt: string, updatedAt: string, versions: Array<{ __typename?: 'ComponentVersion', number: number }> }> } | null> };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['File']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'PromptImage', id: string, originalName: string, mimeType: string, size: number, uploadedAt: string } };


export const GetComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"component"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"promptImageIds"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"technicalDocumentation"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"presets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"props"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"stack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"framework"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cdnUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetComponentQuery, GetComponentQueryVariables>;
export const DeleteComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteComponentMutation, DeleteComponentMutationVariables>;
export const ListComponentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ListComponentsQuery, ListComponentsQueryVariables>;
export const GenerateComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateComponentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"technicalDocumentation"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"presets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"props"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"framework"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cdnUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GenerateComponentMutation, GenerateComponentMutationVariables>;
export const IterateOnComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IterateOnComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IterateOnComponentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iterateOnComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"technicalDocumentation"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"presets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"props"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"framework"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cdnUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<IterateOnComponentMutation, IterateOnComponentMutationVariables>;
export const ListSystemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListSystems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"systems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListSystemsQuery, ListSystemsQueryVariables>;
export const UploadImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedAt"}}]}}]}}]} as unknown as DocumentNode<UploadImageMutation, UploadImageMutationVariables>;