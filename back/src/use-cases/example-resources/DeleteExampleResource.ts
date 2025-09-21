import { inject, injectable } from 'tsyringe';
import ExampleResourceRepository, { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import { ExampleResourceId } from '@/domain/entities/ExampleResource';
import BaseUseCase from '../BaseUseCase';

interface Input {
  resourceId: ExampleResourceId;
}

type Output = void;

@injectable()
export default class DeleteExampleResourceUseCase
  extends BaseUseCase<Input, Output> {
  constructor(
    @inject(ExampleResourceRepositoryToken)
    private exampleResourceRepository: ExampleResourceRepository,
  ) {
    super();
  }

  async execute(input: Input): Promise<Output> {
    // TODO: Add team-based access control when repository supports it
    await this.exampleResourceRepository.delete(input.resourceId);
  }
}
