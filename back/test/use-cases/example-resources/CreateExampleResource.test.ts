import { expect } from 'chai';
import { createSandbox } from 'sinon';
import CreateExampleResourceUseCase from '@/use-cases/example-resources/CreateExampleResource';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import type ExampleResourceRepository from '@/domain/repositories/ExampleResourceRepository';
import type IdGeneratorService from '@/domain/services/IdGeneratorService';
import type AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import type User from '@/domain/entities/User';
import type Team from '@/domain/entities/Team';
import { TeamId } from '@/domain/entities/Team';

describe('CreateExampleResourceUseCase', () => {
  const sandbox = createSandbox();
  let useCase: CreateExampleResourceUseCase;
  let mockRepository: ExampleResourceRepository;
  let mockIdGenerator: IdGeneratorService;
  let mockContext: AuthenticatedContext;
  let createStub: sinon.SinonStub;
  let generateIdStub: sinon.SinonStub;

  beforeEach(() => {
    const createStubTemp = sandbox.stub();
    const generateIdStubTemp = sandbox.stub().returns('generated-id');

    mockRepository = {
      create: createStubTemp,
      get: sandbox.stub(),
      update: sandbox.stub(),
      delete: sandbox.stub(),
      listByTeam: sandbox.stub(),
      search: sandbox.stub(),
    };

    mockIdGenerator = {
      generateId: generateIdStubTemp,
    };

    createStub = createStubTemp;
    generateIdStub = generateIdStubTemp;

    const mockTeam = {
      id: 'team-123' as TeamId,
    } as Team;

    mockContext = {
      user: {} as User,
      currentTeam: mockTeam,
    };

    useCase = new CreateExampleResourceUseCase(mockRepository, mockIdGenerator);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('execute', () => {
    const validInput = {
      name: 'Test Resource',
      description: 'A test resource',
      content: 'Some content',
      tags: ['test', 'example'],
    };

    it('should create a new example resource successfully', async () => {
      const expectedResource = ExampleResource.create({
        id: 'generated-id' as ExampleResourceId,
        teamId: mockContext.currentTeam!.id,
        name: validInput.name,
        description: validInput.description,
        content: validInput.content,
        tags: validInput.tags,
      });

      createStub.resolves(expectedResource);

      const result = await useCase.execute(validInput, mockContext);

      expect(generateIdStub).to.have.been.calledOnce;
      expect(createStub).to.have.been.calledOnce;

      const createdResource = createStub.getCall(0).args[0];
      expect(createdResource).to.be.instanceOf(ExampleResource);
      expect(createdResource.id).to.equal('generated-id');
      expect(createdResource.teamId).to.equal(mockContext.currentTeam!.id);
      expect(createdResource.name).to.equal(validInput.name);
      expect(createdResource.description).to.equal(validInput.description);
      expect(createdResource.content).to.equal(validInput.content);
      expect(createdResource.tags).to.deep.equal(validInput.tags);

      expect(result).to.equal(expectedResource);
    });

    it('should create resource without optional fields', async () => {
      const minimalInput = {
        name: validInput.name,
        description: validInput.description,
      };

      const expectedResource = ExampleResource.create({
        id: 'generated-id' as ExampleResourceId,
        teamId: mockContext.currentTeam!.id,
        name: minimalInput.name,
        description: minimalInput.description,
      });

      createStub.resolves(expectedResource);

      const result = await useCase.execute(minimalInput, mockContext);

      const createdResource = createStub.getCall(0).args[0];
      expect(createdResource.content).to.equal('');
      expect(createdResource.tags).to.deep.equal([]);

      expect(result).to.equal(expectedResource);
    });

    it('should throw error if user has no current team', async () => {
      const contextWithoutTeam = {
        user: {} as User,
        currentTeam: undefined,
      };

      try {
        await useCase.execute(validInput, contextWithoutTeam);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).to.include('team');
      }
    });

    it('should validate the resource before creating', async () => {
      const invalidInput = {
        name: '', // Invalid empty name
        description: validInput.description,
      };

      try {
        await useCase.execute(invalidInput, mockContext);
        expect.fail('Should have thrown a validation error');
      } catch (error) {
        expect((error as Error).message).to.include('Name cannot be empty');
      }

      expect(createStub).to.not.have.been.called;
    });

    it('should propagate repository errors', async () => {
      const repositoryError = new Error('Database connection failed');
      createStub.rejects(repositoryError);

      try {
        await useCase.execute(validInput, mockContext);
        expect.fail('Should have thrown repository error');
      } catch (error) {
        expect(error).to.equal(repositoryError);
      }
    });
  });
});
