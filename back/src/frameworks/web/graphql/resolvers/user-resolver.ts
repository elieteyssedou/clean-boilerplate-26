import { GraphQLArgs } from 'graphql';
import { container } from 'tsyringe';
import GetMeUseCase from '@/use-cases/users/GetMe';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';

export default {
  Query: {
    me: async (parent: undefined, args: GraphQLArgs, context: AuthenticatedContext) => {
      const user = await container
        .resolve(GetMeUseCase)
        .execute({ userId: context.user.getUserInfo().id });

      return user;
    },
  },
};
