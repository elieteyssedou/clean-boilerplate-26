// GraphQL Response Types for Testing

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
}

export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: GraphQLError[];
}

// Component-related GraphQL types
export interface ComponentVersionData {
  number: number;
  prompt: string;
  code: string;
  createdAt: string;
}

export interface ComponentData {
  id: string;
  teamId: string;
  name: string;
  versions: ComponentVersionData[];
  createdAt: string;
  updatedAt: string;
}

export interface GenerateComponentData {
  generateComponent: ComponentData;
}

export interface GenerateComponentResponse extends GraphQLResponse<GenerateComponentData> {
  data?: GenerateComponentData;
}

// Utility type for successful GraphQL responses
export type GraphQLSuccessResponse<T> = Required<Pick<GraphQLResponse<T>, 'data'>> & {
  errors?: never;
};

// Utility type for error GraphQL responses
export type GraphQLErrorResponse = Required<Pick<GraphQLResponse<never>, 'errors'>> & {
  data?: null;
};
