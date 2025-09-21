import { faker } from '@faker-js/faker';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import type { TeamId } from '@/domain/entities/Team';

export default class ExampleResourceFactory {
  static createTestResource(overrides?: {
    id?: ExampleResourceId;
    teamId?: TeamId;
    name?: string;
    description?: string;
    content?: string;
    tags?: string[];
  }): ExampleResource {
    const resource = ExampleResource.create({
      id: overrides?.id ?? `resource-${faker.string.uuid()}` as ExampleResourceId,
      teamId: overrides?.teamId ?? `team-${faker.string.uuid()}` as TeamId,
      name: overrides?.name ?? faker.commerce.productName(),
      description: overrides?.description ?? faker.lorem.sentence(),
      content: overrides?.content ?? faker.lorem.paragraphs(2),
      tags: overrides?.tags ?? [faker.word.noun(), faker.word.adjective(), 'test'],
    });

    resource.validate();
    return resource;
  }
}
