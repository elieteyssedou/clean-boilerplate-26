import { expect } from 'chai';
import ExampleResource, { ExampleResourceId } from '@/domain/entities/ExampleResource';
import { TeamId } from '@/domain/entities/Team';

describe('ExampleResource', () => {
  const validParams = {
    id: 'example-123' as ExampleResourceId,
    teamId: 'team-456' as TeamId,
    name: 'Test Resource',
    description: 'A test resource for unit testing',
    content: 'Some example content',
    tags: ['test', 'example'],
  };

  describe('create', () => {
    it('should create a valid ExampleResource', () => {
      const resource = ExampleResource.create(validParams);

      expect(resource.id).to.equal(validParams.id);
      expect(resource.teamId).to.equal(validParams.teamId);
      expect(resource.name).to.equal(validParams.name);
      expect(resource.description).to.equal(validParams.description);
      expect(resource.content).to.equal(validParams.content);
      expect(resource.tags).to.deep.equal(validParams.tags);
    });

    it('should work without optional content and tags', () => {
      const minimalParams = {
        id: validParams.id,
        teamId: validParams.teamId,
        name: validParams.name,
        description: validParams.description,
      };

      const resource = ExampleResource.create(minimalParams);

      expect(resource.content).to.equal('');
      expect(resource.tags).to.deep.equal([]);
    });
  });

  describe('validation', () => {
    it('should validate successfully with valid data', () => {
      const resource = ExampleResource.create(validParams);
      expect(() => resource.validate()).to.not.throw();
      expect(resource._meta.isReadyToSave()).to.be.true;
    });

    it('should fail validation with empty name', () => {
      const resource = ExampleResource.create({
        ...validParams,
        name: '',
      });

      expect(() => resource.validate()).to.throw('Name cannot be empty');
    });

    it('should fail validation with empty description', () => {
      const resource = ExampleResource.create({
        ...validParams,
        description: '',
      });

      expect(() => resource.validate()).to.throw('Description cannot be empty');
    });

    it('should fail validation with name too long', () => {
      const resource = ExampleResource.create({
        ...validParams,
        name: 'a'.repeat(201),
      });

      expect(() => resource.validate()).to.throw('Name cannot exceed 200 characters');
    });

    it('should fail validation with description too long', () => {
      const resource = ExampleResource.create({
        ...validParams,
        description: 'a'.repeat(1001),
      });

      expect(() => resource.validate()).to.throw('Description cannot exceed 1000 characters');
    });

    it('should fail validation with too many tags', () => {
      const resource = ExampleResource.create({
        ...validParams,
        tags: Array(21).fill('tag'),
      });

      expect(() => resource.validate()).to.throw('Cannot have more than 20 tags');
    });
  });

  describe('update method', () => {
    it('should update name successfully', () => {
      const resource = ExampleResource.create(validParams);
      const newName = 'Updated Name';

      resource.update({ name: newName });

      expect(resource.name).to.equal(newName);
      expect(resource._meta.isReadyToSave()).to.be.false; // Should be invalidated
    });

    it('should update description successfully', () => {
      const resource = ExampleResource.create(validParams);
      const newDescription = 'Updated description';

      resource.update({ description: newDescription });

      expect(resource.description).to.equal(newDescription);
    });

    it('should update content successfully', () => {
      const resource = ExampleResource.create(validParams);
      const newContent = 'Updated content';

      resource.update({ content: newContent });

      expect(resource.content).to.equal(newContent);
    });

    it('should update tags successfully', () => {
      const resource = ExampleResource.create(validParams);
      const newTags = ['updated', 'tags'];

      resource.update({ tags: newTags });

      expect(resource.tags).to.deep.equal(newTags);
    });

    it('should update multiple fields at once', () => {
      const resource = ExampleResource.create(validParams);
      const updates = {
        name: 'New Name',
        description: 'New Description',
        content: 'New Content',
        tags: ['new', 'tags'],
      };

      resource.update(updates);

      expect(resource.name).to.equal(updates.name);
      expect(resource.description).to.equal(updates.description);
      expect(resource.content).to.equal(updates.content);
      expect(resource.tags).to.deep.equal(updates.tags);
      expect(resource._meta.isReadyToSave()).to.be.false;
    });

    it('should only update provided fields', () => {
      const resource = ExampleResource.create(validParams);
      const originalName = resource.name;
      const originalDescription = resource.description;

      resource.update({ content: 'New Content Only' });

      expect(resource.name).to.equal(originalName);
      expect(resource.description).to.equal(originalDescription);
      expect(resource.content).to.equal('New Content Only');
    });

    it('should create defensive copy of tags array', () => {
      const resource = ExampleResource.create(validParams);
      const newTags = ['tag1', 'tag2'];

      resource.update({ tags: newTags });
      newTags.push('modified');

      expect(resource.tags).to.deep.equal(['tag1', 'tag2']);
      expect(resource.tags).to.not.equal(newTags);
    });
  });

  describe('hydrate', () => {
    it('should create resource from database data', () => {
      const dbData = {
        id: validParams.id,
        teamId: validParams.teamId,
        name: validParams.name,
        description: validParams.description,
        content: validParams.content,
        tags: validParams.tags,
        _meta: {
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
        },
      };

      const resource = ExampleResource.hydrate(dbData);

      expect(resource.id).to.equal(dbData.id);
      expect(resource.teamId).to.equal(dbData.teamId);
      expect(resource.name).to.equal(dbData.name);
      expect(resource.description).to.equal(dbData.description);
      expect(resource.content).to.equal(dbData.content);
      expect(resource.tags).to.deep.equal(dbData.tags);
      expect(resource._meta.createdAt).to.equal(dbData._meta.createdAt);
      expect(resource._meta.updatedAt).to.equal(dbData._meta.updatedAt);
    });
  });

  describe('getResourceInfo', () => {
    it('should return formatted resource info', () => {
      const resource = ExampleResource.create(validParams);
      const info = resource.getResourceInfo();

      expect(info).to.deep.equal({
        id: validParams.id,
        teamId: validParams.teamId,
        name: validParams.name,
        description: validParams.description,
        content: validParams.content,
        tags: validParams.tags,
        createdAt: resource._meta.getCreatedAtIso(),
        updatedAt: resource._meta.getUpdatedAtIso(),
      });
    });
  });
});
