import { expect } from 'chai';
import {
  GraphQLResponse, GraphQLSuccessResponse, GraphQLErrorResponse,
} from '@test/types/graphql-types';
import { GraphQLTestResponse } from '@test/helpers/auth-helpers';

/**
 * Validates that a GraphQL response is successful and returns the typed data
 */
export function expectGraphQLSuccess<T>(response: GraphQLTestResponse): T {
  expect(response.status).to.equal(200);
  expect(response.body).to.not.have.property('errors');
  expect(response.body).to.have.property('data');
  expect(response.body.data).to.exist;

  // Type assertion is safe here because we've validated the response structure above
  return response.body.data as T;
}

/**
 * Validates that a GraphQL response has errors
 */
export function expectGraphQLError(response: GraphQLTestResponse): GraphQLErrorResponse {
  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('errors');
  expect(response.body.errors).to.be.an('array');
  expect(response.body.errors).to.have.length.greaterThan(0);

  return response.body as GraphQLErrorResponse;
}

/**
 * Validates that a GraphQL response is successful and returns the typed data,
 * or returns null if the response has errors (for conditional testing)
 */
export function getGraphQLDataOrNull<T>(
  response: { status: number; body: GraphQLResponse<T> },
): T | null {
  expect(response.status).to.equal(200);

  if (response.body.errors) {
    return null;
  }

  expect(response.body).to.have.property('data');
  expect(response.body.data).to.exist;

  return response.body.data as T;
}

/**
 * Type guard to check if GraphQL response is successful
 */
export function isGraphQLSuccess<T>(
  response: GraphQLResponse<T>,
): response is GraphQLSuccessResponse<T> {
  return response.data !== undefined && response.errors === undefined;
}

/**
 * Type guard to check if GraphQL response has errors
 */
export function isGraphQLError<T>(
  response: GraphQLResponse<T>,
) {
  return response.errors !== undefined && response.errors.length > 0;
}
