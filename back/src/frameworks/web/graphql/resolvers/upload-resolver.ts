import { container } from 'tsyringe';
import UploadImageUseCase from '@/use-cases/images/UploadImage';
import type AuthenticatedContext from '@/domain/types/AuthenticatedContext';

interface UploadFileArgs {
  file: File;
}

export default {
  Mutation: {
    uploadFile: async (
      _parent: undefined,
      args: UploadFileArgs,
      context: AuthenticatedContext,
    ) => {
      const uploadedFile = await container
        .resolve(UploadImageUseCase)
        .execute({ file: args.file }, context);

      return uploadedFile.getFileInfo();
    },
  },
};
