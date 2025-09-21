import AuthenticatedContext from '@/domain/types/AuthenticatedContext';

export default abstract class BaseUseCase<TInput, TOutput> {
  abstract execute(input: TInput, authenticatedContext: AuthenticatedContext): Promise<TOutput>;
}
