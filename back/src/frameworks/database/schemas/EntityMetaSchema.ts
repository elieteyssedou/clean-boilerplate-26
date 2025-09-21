import { Schema } from 'mongoose';

// Schema for EntityMetaProperties - only includes persisted fields
export interface EntityMetaDocument {
  createdAt: Date;
  updatedAt: Date;
}

export const entityMetaSchema = new Schema<EntityMetaDocument>({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
