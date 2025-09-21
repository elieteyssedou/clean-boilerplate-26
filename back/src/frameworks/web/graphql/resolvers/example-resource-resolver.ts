import { GraphQLArgs } from 'graphql';
import { container } from 'tsyringe';
import CreateExampleResourceUseCase from '@/use-cases/example-resources/CreateExampleResource';
import GetExampleResourceUseCase from '@/use-cases/example-resources/GetExampleResource';
import UpdateExampleResourceUseCase from '@/use-cases/example-resources/UpdateExampleResource';
import DeleteExampleResourceUseCase from '@/use-cases/example-resources/DeleteExampleResource';
import ListTeamExampleResourcesUseCase from '@/use-cases/example-resources/ListTeamExampleResources';
import GenerateResourceContentUseCase from '@/use-cases/ai/GenerateResourceContent';
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import { ExampleResourceId } from '@/domain/entities/ExampleResource';

interface CreateExampleResourceArgs extends GraphQLArgs {
  input: {
    name: string;
    description: string;
    content?: string;
    tags?: string[];
  };
}

interface UpdateExampleResourceArgs extends GraphQLArgs {
  id: string;
  input: {
    name?: string;
    description?: string;
    content?: string;
    tags?: string[];
  };
}

interface GetExampleResourceArgs extends GraphQLArgs {
  id: string;
}

interface DeleteExampleResourceArgs extends GraphQLArgs {
  id: string;
}

interface ListTeamExampleResourcesArgs extends GraphQLArgs {
  query?: string;
}

interface GenerateResourceContentArgs extends GraphQLArgs {
  input: {
    resourceName: string;
    resourceDescription: string;
    contentType?: string;
    maxTokens?: number;
  };
}

export default {
  Query: {
    exampleResource: async (
      _parent: undefined,
      args: GetExampleResourceArgs,
      context: AuthenticatedContext,
    ) => {
      const resource = await container
        .resolve(GetExampleResourceUseCase)
        .execute({ resourceId: args.id as ExampleResourceId }, context);

      return resource.getResourceInfo();
    },

    teamExampleResources: async (
      _parent: undefined,
      args: ListTeamExampleResourcesArgs,
      context: AuthenticatedContext,
    ) => {
      const resources = await container
        .resolve(ListTeamExampleResourcesUseCase)
        .execute({ query: args.query }, context);

      return resources.map((resource) => resource.getResourceInfo());
    },
  },

  Mutation: {
    createExampleResource: async (
      _parent: undefined,
      args: CreateExampleResourceArgs,
      context: AuthenticatedContext,
    ) => {
      const resource = await container
        .resolve(CreateExampleResourceUseCase)
        .execute({
          name: args.input.name,
          description: args.input.description,
          content: args.input.content,
          tags: args.input.tags,
        }, context);

      return resource.getResourceInfo();
    },

    updateExampleResource: async (
      _parent: undefined,
      args: UpdateExampleResourceArgs,
      context: AuthenticatedContext,
    ) => {
      const resource = await container
        .resolve(UpdateExampleResourceUseCase)
        .execute(
          {
            resourceId: args.id as ExampleResourceId,
            name: args.input.name,
            description: args.input.description,
            content: args.input.content,
            tags: args.input.tags,
          },
          context,
        );

      return resource.getResourceInfo();
    },

    deleteExampleResource: async (
      _parent: undefined,
      args: DeleteExampleResourceArgs,
      context: AuthenticatedContext,
    ) => {
      await container
        .resolve(DeleteExampleResourceUseCase)
        .execute({ resourceId: args.id as ExampleResourceId }, context);

      return true;
    },

    generateResourceContent: async (
      _parent: undefined,
      args: GenerateResourceContentArgs,
      context: AuthenticatedContext,
    ) => {
      const result = await container
        .resolve(GenerateResourceContentUseCase)
        .execute({
          resourceName: args.input.resourceName,
          resourceDescription: args.input.resourceDescription,
          contentType: args.input.contentType as 'documentation' | 'code' | 'tutorial' | 'summary',
          maxTokens: args.input.maxTokens,
        }, context);

      return result;
    },
  },
};
