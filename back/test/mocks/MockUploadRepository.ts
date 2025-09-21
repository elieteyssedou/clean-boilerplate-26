import { singleton } from 'tsyringe';
import type { UploadRepository } from '@/domain/repositories/UploadRepository';
import UploadedFile, { type UploadedFileId, type FileKey } from '@/domain/entities/UploadedFile';
import type { TeamId } from '@/domain/entities/Team';
import UploadNotFoundError from '@/domain/errors/UploadNotFoundError';

@singleton()
export default class MockUploadRepository implements UploadRepository {
  private uploads = new Map<string, UploadedFile>();

  saveFile(file: File, teamId: TeamId): Promise<UploadedFile> {
    const fileId = `mock-file-${Date.now()}` as UploadedFileId;
    const fileKey = `${teamId}/${fileId}` as FileKey;

    const upload = UploadedFile.create({
      id: fileId,
      originalName: file.name || 'mock-file.txt',
      mimeType: file.type || 'application/octet-stream',
      size: file.size || 1024,
      key: fileKey,
      teamId,
    });

    upload.validate();

    const key = `${teamId}/${fileId}`;
    this.uploads.set(key, upload);
    return Promise.resolve(upload);
  }

  generatePresignedUrlsForFiles(
    fileIds: UploadedFileId[],
    teamId: TeamId,
  ): Promise<Map<UploadedFileId, string>> {
    const urlMap = new Map<UploadedFileId, string>();

    for (const fileId of fileIds) {
      const key = `${teamId}/${fileId}`;
      const upload = this.uploads.get(key);

      if (!upload) {
        throw new UploadNotFoundError(`Upload ${fileId} not found for team ${teamId}`);
      }

      urlMap.set(fileId, `https://mock-s3-bucket.com/${key}`);
    }

    return Promise.resolve(urlMap);
  }

  findFilesByIds(fileIds: UploadedFileId[], teamId: TeamId): Promise<UploadedFile[]> {
    const results: UploadedFile[] = [];

    for (const fileId of fileIds) {
      const key = `${teamId}/${fileId}`;
      const upload = this.uploads.get(key);

      if (!upload) {
        throw new UploadNotFoundError(`Upload ${fileId} not found for team ${teamId}`);
      }

      results.push(upload);
    }

    return Promise.resolve(results);
  }

  deleteFile(id: UploadedFileId, teamId: TeamId): Promise<void> {
    const key = `${teamId}/${id}`;
    this.uploads.delete(key);
    return Promise.resolve();
  }

  // Test helper methods
  clear(): void {
    this.uploads.clear();
  }

  addMockUpload(teamId: TeamId, fileId: UploadedFileId, originalName = 'test.txt'): UploadedFile {
    const fileKey = `${teamId}/${fileId}` as FileKey;

    const upload = UploadedFile.hydrate({
      id: fileId,
      originalName,
      mimeType: 'text/plain',
      size: 1024,
      key: fileKey,
      teamId,
      _meta: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const key = `${teamId}/${fileId}`;
    this.uploads.set(key, upload);
    return upload;
  }
}
