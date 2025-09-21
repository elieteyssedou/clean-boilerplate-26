import type { TeamId } from './Team';
import EntityMetaProperties, { type HydrateMetaParams } from './utils/EntityMetaProperties';
import type { MutableEntity } from './utils/MutableEntity';

export type ExampleResourceId = string & { __brand: 'ExampleResourceId' };

export interface CreateExampleResourceParams {
  id: ExampleResourceId;
  teamId: TeamId;
  name: string;
  description: string;
  content?: string;
  tags?: string[];
  _meta?: EntityMetaProperties;
}

export interface UpdateExampleResourceData {
  name?: string;
  description?: string;
  content?: string;
  tags?: string[];
}

export interface HydrateExampleResourceParams {
  id: ExampleResourceId;
  teamId: TeamId;
  name: string;
  description: string;
  content?: string;
  tags?: string[];
  _meta: HydrateMetaParams;
}

type MutableFields = 'name' | 'description' | 'content' | 'tags';

export default class ExampleResource {
  readonly id: ExampleResourceId;

  readonly teamId: TeamId;

  readonly name: string;

  readonly description: string;

  readonly content: string;

  readonly tags: string[];

  public _meta: EntityMetaProperties;

  private constructor(params: CreateExampleResourceParams) {
    this.id = params.id;
    this.teamId = params.teamId;
    this.name = params.name;
    this.description = params.description;
    this.content = params.content ?? '';
    this.tags = params.tags ?? [];
    this._meta = params._meta ?? new EntityMetaProperties();
  }

  static create(params: CreateExampleResourceParams): ExampleResource {
    return new ExampleResource(params);
  }

  static hydrate(params: HydrateExampleResourceParams): ExampleResource {
    return new ExampleResource({
      id: params.id,
      teamId: params.teamId,
      name: params.name,
      description: params.description,
      content: params.content,
      tags: params.tags,
      _meta: EntityMetaProperties.hydrate(params._meta),
    });
  }

  public update(data: UpdateExampleResourceData): void {
    const mutableThis = this as MutableEntity<ExampleResource, MutableFields>;

    if (data.name !== undefined) {
      mutableThis.name = data.name;
    }
    if (data.description !== undefined) {
      mutableThis.description = data.description;
    }
    if (data.content !== undefined) {
      mutableThis.content = data.content;
    }
    if (data.tags !== undefined) {
      mutableThis.tags = [...data.tags];
    }
    this._meta.hasBeenUpdated();
  }

  public validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (this.name.length > 200) {
      throw new Error('Name cannot exceed 200 characters');
    }
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
    if (this.description.length > 1000) {
      throw new Error('Description cannot exceed 1000 characters');
    }
    if (this.tags.length > 20) {
      throw new Error('Cannot have more than 20 tags');
    }
    this._meta.validate();
  }

  public getResourceInfo(): {
    id: ExampleResourceId;
    teamId: TeamId;
    name: string;
    description: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id,
      teamId: this.teamId,
      name: this.name,
      description: this.description,
      content: this.content,
      tags: [...this.tags],
      createdAt: this._meta.getCreatedAtIso(),
      updatedAt: this._meta.getUpdatedAtIso(),
    };
  }
}
