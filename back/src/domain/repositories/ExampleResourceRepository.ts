import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import type { TeamId } from '@/domain/entities/Team';

export const ExampleResourceRepositoryToken = 'ExampleResourceRepository';

export default interface ExampleResourceRepository {
  create(resource: ExampleResource): Promise<ExampleResource>;
  get(resourceId: ExampleResourceId): Promise<ExampleResource>;
  update(resource: ExampleResource): Promise<ExampleResource>;
  delete(resourceId: ExampleResourceId): Promise<void>;
  listByTeam(teamId: TeamId): Promise<ExampleResource[]>;
  search(teamId: TeamId, query: string): Promise<ExampleResource[]>;
}
