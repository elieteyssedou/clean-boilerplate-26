export type UserId = string & { __brand: 'UserId' };

export interface HydrateUserParams {
  id: UserId;
  name: string;
}

export default class User {
  readonly id: UserId;

  readonly name: string;

  private constructor(params: HydrateUserParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static hydrate(params: HydrateUserParams): User {
    return new User(params);
  }

  public getUserInfo(): { id: UserId; name: string; } {
    return { id: this.id, name: this.name };
  }
}
