import type { TeamId } from '@/domain/entities/Team';
import type UploadedFile from '@/domain/entities/UploadedFile';
import type { UploadedFileId } from '@/domain/entities/UploadedFile';

export interface UploadRepository {
  saveFile(file: File, teamId: TeamId): Promise<UploadedFile>;

  // BATCH OPERATION: Get all presigned URLs in one call
  generatePresignedUrlsForFiles(
    fileIds: UploadedFileId[],
    teamId: TeamId,
  ): Promise<Map<UploadedFileId, string>>; // Returns Map of fileId -> presignedUrl

  // Will throw error if any file not found or doesn't belong to team
  findFilesByIds(fileIds: UploadedFileId[], teamId: TeamId): Promise<UploadedFile[]>;

  deleteFile(id: UploadedFileId, teamId: TeamId): Promise<void>;
}

export const UploadRepositoryToken = Symbol.for('UploadRepository');
