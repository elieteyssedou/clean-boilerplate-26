import 'reflect-metadata';
import { container } from 'tsyringe';

import MockAuthWebService from '@test/mocks/MockAuthWebService';
import MockAIService from '@test/mocks/MockAIService';
import MockUploadRepository from '@test/mocks/MockUploadRepository';
import { AuthWebServiceToken } from '@/domain/services/AuthWebService';
import { AIServiceToken } from '@/domain/services/AIService';
import { UploadRepositoryToken } from '@/domain/repositories/UploadRepository';

// Import production container to get all repository registrations
import '@/frameworks/container';

// Override services with mocks for tests
container.register(AuthWebServiceToken, { useValue: new MockAuthWebService() });
container.register(AIServiceToken, { useValue: new MockAIService() });
container.register(UploadRepositoryToken, { useValue: new MockUploadRepository() });
