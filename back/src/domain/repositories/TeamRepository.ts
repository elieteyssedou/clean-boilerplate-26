import Team, { TeamId } from '@/domain/entities/Team';
import type { UserId } from '@/domain/entities/User';

export const TeamRepositoryToken = 'TeamRepository';

export default interface TeamRepository {
  get(teamId: TeamId): Promise<Team>;
  getUserTeams(userId: UserId): Promise<Team[]>;
}
