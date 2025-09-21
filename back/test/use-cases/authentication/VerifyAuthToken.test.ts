import expect from '@test/chai';
import sinon from 'sinon';
import VerifyAuthTokenUseCase from '@/use-cases/authentication/VerifyAuthToken';
import AuthWebService from '@/domain/services/AuthWebService';
import User, { UserId } from '@/domain/entities/User';
import Team, { TeamId } from '@/domain/entities/Team';
import type AuthenticatedContext from '@/domain/types/AuthenticatedContext';

describe('VerifyAuthToken', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('verify auth token through an AuthWebService', async () => {
    // Arrange
    const authToken = 'authToken';
    const user = User.hydrate({
      id: 'userId' as UserId,
      name: 'Test User',
    });
    const team = new Team({
      id: 'teamId' as TeamId,
      name: 'Test Team',
    });
    const mockAuthenticatedContext: AuthenticatedContext = {
      user,
      currentTeam: team,
    };

    const verifyAndGetUserInfoStub = sinon.stub().resolves(mockAuthenticatedContext);
    const authWebService: AuthWebService = {
      verifyToken: sinon.stub().resolves('userId' as UserId),
      verifyAndGetUserInfo: verifyAndGetUserInfoStub,
    };

    // Act
    const verifyAuthTokenUseCase = new VerifyAuthTokenUseCase(authWebService);
    const result = await verifyAuthTokenUseCase.execute({ authToken });

    // Assert
    expect(verifyAndGetUserInfoStub).to.have.been.calledOnceWith(authToken);
    expect(result).to.equal(mockAuthenticatedContext);
  });
});
