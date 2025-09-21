import { inject, injectable } from 'tsyringe';
import ExampleResourceRepository, { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import ExampleResource from '@/domain/entities/ExampleResource';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import BaseUseCase from '../BaseUseCase';

interface Input {
  query?: string;
}

type Output = ExampleResource[];

@injectable()
export default class ListTeamExampleResourcesUseCase
  extends BaseUseCase<Input, Output> {
  constructor(
    @inject(ExampleResourceRepositoryToken)
    private exampleResourceRepository: ExampleResourceRepository,
  ) {
    super();
  }

  async execute(
    input: Input,
    authenticatedContext: AuthenticatedContext,
  ): Promise<Output> {
    if (input.query) {
      return this.exampleResourceRepository.search(
        authenticatedContext.currentTeam!.id,
        input.query,
      );
    }

    return this.exampleResourceRepository.listByTeam(
      authenticatedContext.currentTeam!.id,
    );
  }
}
