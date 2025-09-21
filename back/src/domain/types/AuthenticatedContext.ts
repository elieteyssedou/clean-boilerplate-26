import User from '@/domain/entities/User';
import Team from '@/domain/entities/Team';

export default interface AuthenticatedContext {
  user: User;
  currentTeam?: Team;
}
