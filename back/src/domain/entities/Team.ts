export type TeamId = string & { __brand: 'TeamId' };

export interface CreateTeamParams {
  id: TeamId;
  name: string;
}

export default class Team {
  readonly id: TeamId;

  readonly name: string;

  constructor(params: CreateTeamParams) {
    this.id = params.id;
    this.name = params.name;
  }

  public getTeamInfo(): { id: string; name: string; } {
    return { id: this.id, name: this.name };
  }
}
