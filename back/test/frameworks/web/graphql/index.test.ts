import expect from '@test/chai';
import app from '@test/server';
import { authenticatedRequest } from '@test/helpers/auth-helpers';

describe('Resolvers', () => {
  it('should return 200 with empty query', async () => {
    // ACT
    const response = await authenticatedRequest(app, '{ me { id } }');

    // ASSERT
    expect(response.status).to.equal(200);
  });
});
