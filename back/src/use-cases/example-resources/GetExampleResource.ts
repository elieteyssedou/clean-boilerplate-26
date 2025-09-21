import { inject, injectable } from 'tsyringe';
import ExampleResourceRepository, { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import BaseUseCase from '../BaseUseCase';

interface Input {
  resourceId: ExampleResourceId;
}

type Output = ExampleResource;

@injectable()
export default class GetExampleResourceUseCase extends BaseUseCase<Input, Output> {
  constructor(
    @inject(
      ExampleResourceRepositoryToken,
    ) private exampleResourceRepository: ExampleResourceRepository,
  ) {
    super();
  }

  async execute(input: Input): Promise<Output> {
    // TODO: Add team-based access control when repository supports it
    return this.exampleResourceRepository.get(input.resourceId);
  }
}
