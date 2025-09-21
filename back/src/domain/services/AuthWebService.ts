import { UserId } from '@/domain/entities/User';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';

export const AuthWebServiceToken = 'AuthWebService';

export default interface AuthWebService {
  verifyToken(authToken: string): Promise<UserId>;
  verifyAndGetUserInfo(authToken: string): Promise<AuthenticatedContext>;
}
