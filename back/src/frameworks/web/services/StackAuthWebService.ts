import * as jose from 'jose';
import AuthWebService from '@/domain/services/AuthWebService';
import User, { UserId } from '@/domain/entities/User';
import Team, { TeamId } from '@/domain/entities/Team';
import AuthenticationError from '@/domain/errors/AuthenticationError';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import logger from '@/frameworks/utils/logger';

export default class StackAuthWebService implements AuthWebService {
  private jwks: () => Promise<jose.KeyLike>;

  private readonly headers: Record<string, string>;

  constructor() {
    const jwksetUrl = new URL(`https://api.stack-auth.com/api/v1/projects/${process.env.STACK_AUTH_PROJECT_ID}/.well-known/jwks.json`);
    const jwks = jose.createRemoteJWKSet(jwksetUrl);
    this.jwks = jwks;
    this.headers = {
      'X-Stack-Access-Type': 'server',
      'X-Stack-Project-Id': process.env.STACK_AUTH_PROJECT_ID || '',
      'X-Stack-Secret-Server-Key': process.env.STACK_AUTH_SECRET_SERVER_KEY || '',
    };
  }

  async verifyToken(authToken: string): Promise<UserId> {
    const { payload } = await jose.jwtVerify(authToken, this.jwks);

    if (!payload.sub) throw new AuthenticationError('Invalid token');

    return payload.sub as UserId;
  }

  async verifyAndGetUserInfo(authToken: string): Promise<AuthenticatedContext> {
    // Get user info with selected team from StackAuth API
    const userUrl = 'https://api.stack-auth.com/api/v1/users/me';
    const userResponse = await fetch(userUrl, {
      method: 'GET',
      headers: {
        ...this.headers,
        'x-stack-access-token': authToken,
      },
    });

    if (!userResponse.ok) {
      const errorRes = await userResponse.json() as {
        code: string;
        error: string;
      };
      logger.debug(`${errorRes.code} - ${errorRes.error}`);

      throw new AuthenticationError('Failed to fetch user info');
    }

    const userData = await userResponse.json() as {
      id: string;
      display_name: string;
      selected_team_id?: string;
      selected_team?: {
        id: string;
        display_name: string;
      };
    };

    const user = User.hydrate({ id: userData.id as UserId, name: userData.display_name });

    let currentTeam: Team | undefined;
    if (userData.selected_team) {
      currentTeam = new Team({
        id: userData.selected_team.id as TeamId,
        name: userData.selected_team.display_name,
      });
    }

    return {
      user,
      currentTeam,
    };
  }
}
