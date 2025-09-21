import request from 'supertest';
import { container } from 'tsyringe';
// import { Application } from 'express';
import type MockAuthWebService from '@test/mocks/MockAuthWebService';
import { GraphQLResponse } from '@test/types/graphql-types';
import { AuthWebServiceToken } from '@/domain/services/AuthWebService';

export interface GraphQLTestResponse {
  status: number;
  body: GraphQLResponse<unknown>;
}

export async function authenticatedRequest(
  app: any, // Express app type
  query: string,
  variables?: Record<string, unknown>,
  customToken?: string,
): Promise<GraphQLTestResponse> {
  const payload: { query: string; variables?: Record<string, unknown> } = { query };
  if (variables) {
    payload.variables = variables;
  }

  // Use a unique token per request to ensure test isolation
  let token = customToken;
  if (!token) {
    const mockAuthService = container.resolve<MockAuthWebService>(AuthWebServiceToken);
    token = mockAuthService.createAutoToken();
  }

  const response = await request(app)
    .post('/graphql')
    .set('x-access-token', token)
    .send(payload);

  return {
    status: response.status,
    body: response.body as GraphQLResponse<unknown>,
  };
}
