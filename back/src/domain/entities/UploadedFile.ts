import type { TeamId } from './Team';
import EntityMetaProperties, { type HydrateMetaParams } from './utils/EntityMetaProperties';

export type UploadedFileId = string & { readonly brand: unique symbol };
export type FileKey = string & { readonly brand: unique symbol };

export interface CreateUploadedFileParams {
  id: UploadedFileId;
  originalName: string;
  mimeType: string;
  size: number;
  key: FileKey;
  teamId: TeamId;
  _meta?: EntityMetaProperties;
}

export interface HydrateUploadedFileParams {
  id: UploadedFileId;
  originalName: string;
  mimeType: string;
  size: number;
  key: FileKey;
  teamId: TeamId;
  _meta: HydrateMetaParams;
}

export default class UploadedFile {
  readonly id: UploadedFileId;

  readonly originalName: string;

  readonly mimeType: string;

  readonly size: number;

  readonly key: FileKey;

  readonly teamId: TeamId;

  public _meta: EntityMetaProperties;

  private constructor(params: CreateUploadedFileParams) {
    this.id = params.id;
    this.originalName = params.originalName;
    this.mimeType = params.mimeType;
    this.size = params.size;
    this.key = params.key;
    this.teamId = params.teamId;
    this._meta = params._meta ?? new EntityMetaProperties();
  }

  static create(params: CreateUploadedFileParams): UploadedFile {
    return new UploadedFile(params);
  }

  static hydrate(params: HydrateUploadedFileParams): UploadedFile {
    return new UploadedFile({
      id: params.id,
      originalName: params.originalName,
      mimeType: params.mimeType,
      size: params.size,
      key: params.key,
      teamId: params.teamId,
      _meta: EntityMetaProperties.hydrate(params._meta),
    });
  }

  get uploadedAt(): Date {
    return this._meta.createdAt;
  }

  validate(): void {
    if (!this.originalName.trim()) {
      throw new Error('Original name cannot be empty');
    }

    if (!this.mimeType.trim()) {
      throw new Error('MIME type cannot be empty');
    }

    if (this.size <= 0) {
      throw new Error('File size must be greater than 0');
    }

    if (!this.key.trim()) {
      throw new Error('File key cannot be empty');
    }

    this._meta.validate();
  }

  getFileInfo() {
    return {
      id: this.id,
      originalName: this.originalName,
      mimeType: this.mimeType,
      size: this.size,
      uploadedAt: this.uploadedAt.toISOString(),
    };
  }
}
