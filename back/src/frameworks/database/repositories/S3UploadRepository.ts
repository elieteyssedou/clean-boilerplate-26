import {
  S3Client, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand, GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { inject, singleton } from 'tsyringe';
import type { UploadRepository } from '@/domain/repositories/UploadRepository';
import UploadedFile, { type UploadedFileId, type FileKey } from '@/domain/entities/UploadedFile';
import type { TeamId } from '@/domain/entities/Team';
import { IdGeneratorServiceToken } from '@/domain/services/IdGeneratorService';
import type IdGeneratorService from '@/domain/services/IdGeneratorService';
import UploadNotFoundError from '@/domain/errors/UploadNotFoundError';
import FileUploadError from '@/domain/errors/FileUploadError';

@singleton()
export default class S3UploadRepository implements UploadRepository {
  private s3Client: S3Client;

  private bucketName: string;

  constructor(
    @inject(IdGeneratorServiceToken) private idGeneratorService: IdGeneratorService,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });

    this.bucketName = process.env.S3_BUCKET_NAME ?? '';
    if (!this.bucketName) {
      throw new FileUploadError('S3_BUCKET_NAME environment variable is required');
    }
  }

  async saveFile(file: File, teamId: TeamId): Promise<UploadedFile> {
    const fileId = this.idGeneratorService.generateId() as UploadedFileId;
    const s3Key = this.buildS3Key(teamId, fileId);

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new FileUploadError('File size must be less than 10MB');
    }

    try {
      // Convert File to ArrayBuffer and then to Buffer for S3
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Encode filename for S3 metadata - only ASCII characters allowed
      const sanitizedFileName = (file.name || 'unknown')
        .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters
        .replace(/[^\w\-_.]/g, '_'); // Replace special characters with underscore

      await this.s3Client.send(new PutObjectCommand({
        Bucket: this.bucketName,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
        Metadata: {
          originalName: sanitizedFileName,
          teamId,
        },
      }));

      // Create and validate the UploadedFile entity
      const uploadedFile = UploadedFile.create({
        id: fileId,
        originalName: file.name || 'unknown',
        mimeType: file.type,
        size: file.size,
        key: s3Key as FileKey,
        teamId,
      });

      uploadedFile.validate();

      return uploadedFile;
    } catch (error) {
      throw new FileUploadError(`Failed to upload file: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async generatePresignedUrlsForFiles(
    fileIds: UploadedFileId[],
    teamId: TeamId,
  ): Promise<Map<UploadedFileId, string>> {
    if (fileIds.length === 0) return new Map();

    // First validate all files exist and belong to team
    await this.validateFileAccess(fileIds, teamId);

    // Generate all presigned URLs in parallel
    const urlPromises = fileIds.map(async (fileId) => {
      const s3Key = this.buildS3Key(teamId, fileId);
      const url = await getSignedUrl(this.s3Client, new GetObjectCommand({
        Bucket: this.bucketName,
        Key: s3Key,
      }), { expiresIn: 900 }); // 15 minutes

      return [fileId, url] as [UploadedFileId, string];
    });

    const urlPairs = await Promise.all(urlPromises);
    return new Map(urlPairs);
  }

  async findFilesByIds(fileIds: UploadedFileId[], teamId: TeamId): Promise<UploadedFile[]> {
    if (fileIds.length === 0) return [];

    // Check all objects exist with team-scoped keys and get metadata
    const headPromises = fileIds.map(async (fileId) => {
      const s3Key = this.buildS3Key(teamId, fileId);
      try {
        const headResult = await this.s3Client.send(new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: s3Key,
        }));

        return UploadedFile.hydrate({
          id: fileId,
          originalName: headResult.Metadata?.originalname ?? 'unknown',
          mimeType: headResult.ContentType ?? 'application/octet-stream',
          size: headResult.ContentLength ?? 0,
          key: s3Key as FileKey,
          teamId,
          _meta: {
            createdAt: headResult.LastModified ?? new Date(),
            updatedAt: headResult.LastModified ?? new Date(),
          },
        });
      } catch (error) {
        throw new UploadNotFoundError(`Upload ${fileId} not found or not accessible for team ${teamId}`);
      }
    });

    return Promise.all(headPromises);
  }

  async deleteFile(id: UploadedFileId, teamId: TeamId): Promise<void> {
    const s3Key = this.buildS3Key(teamId, id);

    try {
      await this.s3Client.send(new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: s3Key,
      }));
    } catch (error) {
      throw new FileUploadError(`Failed to delete file: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async validateFileAccess(fileIds: UploadedFileId[], teamId: TeamId): Promise<void> {
    // Quick validation: check if all objects exist with team-scoped keys
    const headPromises = fileIds.map(async (fileId) => {
      const s3Key = this.buildS3Key(teamId, fileId);
      try {
        await this.s3Client.send(new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: s3Key,
        }));
      } catch (error) {
        throw new UploadNotFoundError(`Upload ${fileId} not found or not accessible for team ${teamId}`);
      }
    });

    await Promise.all(headPromises);
  }

  private buildS3Key(teamId: TeamId, fileId: UploadedFileId): string {
    return `${teamId}/${fileId}`;
  }
}
