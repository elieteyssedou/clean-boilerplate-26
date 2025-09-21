import Team, { TeamId } from '@/domain/entities/Team';
import type { UserId } from '@/domain/entities/User';
import NotFoundError from '@/domain/errors/NotFoundError';
import TeamRepository from '@/domain/repositories/TeamRepository';

export default class StackTeamRepository implements TeamRepository {
  private readonly baseUrl: string;

  private readonly headers: Record<string, string>;

  constructor() {
    this.baseUrl = 'https://api.stack-auth.com/api/v1';
    this.headers = {
      'X-Stack-Access-Type': 'server',
      'X-Stack-Project-Id': process.env.STACK_AUTH_PROJECT_ID || '',
      'X-Stack-Secret-Server-Key': process.env.STACK_AUTH_SECRET_SERVER_KEY || '',
    };
  }

  async get(teamId: TeamId): Promise<Team> {
    const url = `${this.baseUrl}/teams/${teamId}`;
    const options = { method: 'GET', headers: this.headers };

    const response = await fetch(url, options);

    if (!response.ok) throw new NotFoundError('Failed to get team');

    const data = await response.json() as { id: string; name: string };

    return new Team({ id: teamId, name: data.name });
  }

  async getUserTeams(userId: UserId): Promise<Team[]> {
    const url = `${this.baseUrl}/users/${userId}/teams`;
    const options = { method: 'GET', headers: this.headers };

    const response = await fetch(url, options);

    if (!response.ok) throw new NotFoundError('Failed to get user teams');

    const data = await response.json() as {
      teams: { id: string; name: string }[];
    };

    return data.teams.map((team) => new Team({ id: team.id as TeamId, name: team.name }));
  }
}
