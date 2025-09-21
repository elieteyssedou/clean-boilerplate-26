import { inject, injectable } from 'tsyringe';
import ExampleResourceRepository, { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import BaseUseCase from '../BaseUseCase';

interface Input {
  resourceId: ExampleResourceId;
  name?: string;
  description?: string;
  content?: string;
  tags?: string[];
}

type Output = ExampleResource;

@injectable()
export default class UpdateExampleResourceUseCase extends BaseUseCase<Input, Output> {
  constructor(
    @inject(
      ExampleResourceRepositoryToken,
    ) private exampleResourceRepository: ExampleResourceRepository,
  ) {
    super();
  }

  async execute(input: Input, authenticatedContext: AuthenticatedContext): Promise<Output> {
    if (!authenticatedContext.currentTeam) {
      throw new Error('User must have a selected team to update resources');
    }

    const resource = await this.exampleResourceRepository.get(input.resourceId);

    // Verify the resource belongs to the user's current team
    if (resource.teamId !== authenticatedContext.currentTeam.id) {
      throw new Error('Resource not found or access denied');
    }

    resource.update({
      name: input.name,
      description: input.description,
      content: input.content,
      tags: input.tags,
    });

    resource.validate();

    return this.exampleResourceRepository.update(resource);
  }
}
