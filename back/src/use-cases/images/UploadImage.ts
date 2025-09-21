import { inject, injectable } from 'tsyringe';
import type { UploadRepository } from '@/domain/repositories/UploadRepository';
import { UploadRepositoryToken } from '@/domain/repositories/UploadRepository';
import type UploadedFile from '@/domain/entities/UploadedFile';
import type AuthenticatedContext from '@/domain/types/AuthenticatedContext';
import TeamRequiredError from '@/domain/errors/TeamRequiredError';
import BaseUseCase from '../BaseUseCase';

interface Input {
  file: File;
}

type Output = UploadedFile;

@injectable()
export default class UploadImageUseCase extends BaseUseCase<Input, Output> {
  constructor(
    @inject(UploadRepositoryToken) private uploadRepository: UploadRepository,
  ) {
    super();
  }

  async execute(input: Input, authenticatedContext: AuthenticatedContext): Promise<Output> {
    if (!authenticatedContext.currentTeam) {
      throw new TeamRequiredError('User must have a selected team to upload files');
    }

    return this.uploadRepository.saveFile(
      input.file,
      authenticatedContext.currentTeam.id,
    );
  }
}
