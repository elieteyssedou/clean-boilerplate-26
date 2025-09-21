import mongoose, { Schema, model, Document } from 'mongoose';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import type { TeamId } from '@/domain/entities/Team';
import ExampleResourceRepository from '@/domain/repositories/ExampleResourceRepository';
import NotFoundError from '@/domain/errors/NotFoundError';
import MissingValidationError from '@/domain/errors/MissingValidationError';
import { EntityMetaDocument, entityMetaSchema } from '@/frameworks/database/schemas/EntityMetaSchema';

interface ExampleResourceDocument extends Document {
  _id: string;
  name: string;
  description: string;
  content?: string;
  tags?: string[];
  teamId: string;
  _meta: EntityMetaDocument;
}

const exampleResourceSchema = new Schema<ExampleResourceDocument>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: false },
  tags: { type: [String], required: false },
  teamId: { type: String, required: true, index: true },
  _meta: { type: entityMetaSchema, required: true },
});

// Use existing model if it exists, otherwise create new one
const ExampleResourceModel = (
  mongoose.models.ExampleResource as mongoose.Model<ExampleResourceDocument>
) || model<ExampleResourceDocument>('ExampleResource', exampleResourceSchema);

export default class MongoExampleResourceRepository implements ExampleResourceRepository {
  private static exampleResourceToDocument(resource: ExampleResource) {
    return {
      _id: resource.id,
      name: resource.name,
      description: resource.description,
      content: resource.content,
      tags: resource.tags,
      teamId: resource.teamId,
      _meta: {
        createdAt: resource._meta.createdAt,
        updatedAt: resource._meta.updatedAt,
      },
    };
  }

  private static documentToExampleResource(doc: ExampleResourceDocument): ExampleResource {
    return ExampleResource.hydrate({
      id: doc.id as ExampleResourceId,
      name: doc.name,
      description: doc.description,
      content: doc.content,
      tags: doc.tags,
      teamId: doc.teamId as TeamId,
      _meta: {
        createdAt: doc._meta.createdAt,
        updatedAt: doc._meta.updatedAt,
      },
    });
  }

  async create(resource: ExampleResource): Promise<ExampleResource> {
    if (!resource._meta.isReadyToSave()) {
      throw new MissingValidationError('ExampleResource must be validated before saving');
    }

    const document = MongoExampleResourceRepository.exampleResourceToDocument(resource);
    const savedDoc = await ExampleResourceModel.create(document);
    return MongoExampleResourceRepository.documentToExampleResource(savedDoc);
  }

  async get(resourceId: ExampleResourceId): Promise<ExampleResource> {
    const doc = await ExampleResourceModel.findById(resourceId);
    if (!doc) {
      throw new NotFoundError(`ExampleResource with id ${resourceId} not found`);
    }
    return MongoExampleResourceRepository.documentToExampleResource(doc);
  }

  async update(resource: ExampleResource): Promise<ExampleResource> {
    if (!resource._meta.isReadyToSave()) {
      throw new MissingValidationError('ExampleResource must be validated before saving');
    }

    const document = MongoExampleResourceRepository.exampleResourceToDocument(resource);
    const updatedDoc = await ExampleResourceModel.findByIdAndUpdate(
      resource.id,
      document,
      { new: true },
    );

    if (!updatedDoc) {
      throw new NotFoundError(`ExampleResource with id ${resource.id} not found`);
    }

    return MongoExampleResourceRepository.documentToExampleResource(updatedDoc);
  }

  async delete(resourceId: ExampleResourceId): Promise<void> {
    const result = await ExampleResourceModel.findByIdAndDelete(resourceId);
    if (!result) {
      throw new NotFoundError(`ExampleResource with id ${resourceId} not found`);
    }
  }

  async listByTeam(teamId: TeamId): Promise<ExampleResource[]> {
    const docs = await ExampleResourceModel.find({ teamId }).sort({ '_meta.createdAt': -1 });
    return docs.map((doc) => MongoExampleResourceRepository.documentToExampleResource(doc));
  }

  async search(teamId: TeamId, query: string): Promise<ExampleResource[]> {
    const searchRegex = new RegExp(query, 'i');
    const docs = await ExampleResourceModel.find({
      teamId,
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } },
      ],
    }).sort({ '_meta.createdAt': -1 });

    return docs.map((doc) => MongoExampleResourceRepository.documentToExampleResource(doc));
  }
}
