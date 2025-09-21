export interface CreateEntityMetaPropertiesParams {
  isValidated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HydrateMetaParams {
  createdAt: Date;
  updatedAt: Date;
}

export default class EntityMetaProperties {
  public isValidated: boolean;

  public createdAt: Date;

  public updatedAt: Date;

  constructor({
    isValidated = false,
    createdAt,
    updatedAt,
  }: CreateEntityMetaPropertiesParams = {}) {
    this.isValidated = isValidated;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? this.createdAt;
  }

  static hydrate(params: HydrateMetaParams): EntityMetaProperties {
    return new EntityMetaProperties({
      isValidated: false,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
  }

  public validate(): void {
    this.isValidated = true;
  }

  public hasBeenUpdated(): void {
    this.updatedAt = new Date();
    this.isValidated = false;
  }

  public isReadyToSave(): boolean {
    return this.isValidated;
  }

  public getCreatedAtIso(): string {
    return this.createdAt.toISOString();
  }

  public getUpdatedAtIso(): string {
    return this.updatedAt.toISOString();
  }
}
