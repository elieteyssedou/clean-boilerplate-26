import Team, { CreateTeamParams, TeamId } from '@/domain/entities/Team';

export default class TeamFactory {
  static createTestTeam(overrides?: Partial<CreateTeamParams>): Team {
    const params: CreateTeamParams = {
      id: (overrides?.id ?? 'test-team-123') as TeamId,
      name: overrides?.name ?? 'Test Team',
    };
    return new Team(params);
  }
}
