import { inject, injectable } from 'tsyringe';
import ExampleResourceRepository, { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import IdGeneratorService, { IdGeneratorServiceToken } from '@/domain/services/IdGeneratorService';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import BaseUseCase from '../BaseUseCase';

interface Input {
  name: string;
  description: string;
  content?: string;
  tags?: string[];
}

type Output = ExampleResource;

@injectable()
export default class CreateExampleResourceUseCase extends BaseUseCase<Input, Output> {
  constructor(
    @inject(ExampleResourceRepositoryToken)
    private exampleResourceRepository: ExampleResourceRepository,
    @inject(IdGeneratorServiceToken) private idGeneratorService: IdGeneratorService,
  ) {
    super();
  }

  async execute(input: Input, authenticatedContext: AuthenticatedContext) {
    if (!authenticatedContext.currentTeam) {
      throw new Error('User must have a current team to create resources');
    }

    const id = this.idGeneratorService.generateId() as ExampleResourceId;

    const exampleResource = ExampleResource.create({
      id,
      teamId: authenticatedContext.currentTeam.id,
      name: input.name,
      description: input.description,
      content: input.content,
      tags: input.tags,
    });

    exampleResource.validate();

    return this.exampleResourceRepository.create(exampleResource);
  }
}
