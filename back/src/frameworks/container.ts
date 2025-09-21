import 'reflect-metadata';
import { container } from 'tsyringe';

import { AuthWebServiceToken } from '@/domain/services/AuthWebService';
import StackAuthWebService from '@/frameworks/web/services/StackAuthWebService';
import { UserRepositoryToken } from '@/domain/repositories/UserRepository';
import StackUserRepository from '@/frameworks/web/services/StackUserRepository';
import { TeamRepositoryToken } from '@/domain/repositories/TeamRepository';
import StackTeamRepository from '@/frameworks/web/services/StackTeamRepository';
import { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import MongoExampleResourceRepository from '@/frameworks/database/repositories/MongoExampleResourceRepository';
import { AIServiceToken } from '@/domain/services/AIService';
import AnthropicAiService from '@/frameworks/web/services/AnthropicAiService';
import { IdGeneratorServiceToken } from '@/domain/services/IdGeneratorService';
import UuidGeneratorService from '@/frameworks/web/services/UuidGeneratorService';
import { UploadRepositoryToken } from '@/domain/repositories/UploadRepository';
import S3UploadRepository from '@/frameworks/database/repositories/S3UploadRepository';

container.register(AuthWebServiceToken, { useClass: StackAuthWebService });
container.register(UserRepositoryToken, { useClass: StackUserRepository });
container.register(TeamRepositoryToken, { useClass: StackTeamRepository });
container.register(ExampleResourceRepositoryToken, { useClass: MongoExampleResourceRepository });
container.register(AIServiceToken, { useClass: AnthropicAiService });
container.register(IdGeneratorServiceToken, { useClass: UuidGeneratorService });
container.register(UploadRepositoryToken, { useClass: S3UploadRepository });
