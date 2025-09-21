import expect from '@test/chai';
import sinon from 'sinon';
import EntityMetaProperties from '@/domain/entities/utils/EntityMetaProperties';

describe('EntityMetaProperties', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });
  describe('constructor', () => {
    it('should create instance with default values', () => {
      // Act
      const meta = new EntityMetaProperties();

      // Assert
      expect(meta.isValidated).to.be.false;
      expect(meta.createdAt).to.be.instanceOf(Date);
      expect(meta.updatedAt).to.be.instanceOf(Date);
      expect(meta.createdAt.getTime()).to.equal(meta.updatedAt.getTime());
    });

    it('should create instance with provided isValidated value', () => {
      // Act
      const meta = new EntityMetaProperties({ isValidated: true });

      // Assert
      expect(meta.isValidated).to.be.true;
      expect(meta.createdAt).to.be.instanceOf(Date);
      expect(meta.updatedAt).to.be.instanceOf(Date);
    });

    it('should create instance with isValidated false when explicitly set', () => {
      // Act
      const meta = new EntityMetaProperties({ isValidated: false });

      // Assert
      expect(meta.isValidated).to.be.false;
      expect(meta.createdAt).to.be.instanceOf(Date);
      expect(meta.updatedAt).to.be.instanceOf(Date);
    });

    it('should handle empty object parameter', () => {
      // Act
      const meta = new EntityMetaProperties({});

      // Assert
      expect(meta.isValidated).to.be.false;
      expect(meta.createdAt).to.be.instanceOf(Date);
      expect(meta.updatedAt).to.be.instanceOf(Date);
    });

    it('should create instance with provided createdAt and updatedAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T10:00:00Z');
      const updatedAt = new Date('2023-01-02T10:00:00Z');

      // Act
      const meta = new EntityMetaProperties({ createdAt, updatedAt });

      // Assert
      expect(meta.createdAt).to.equal(createdAt);
      expect(meta.updatedAt).to.equal(updatedAt);
      expect(meta.isValidated).to.be.false;
    });

    it('should use createdAt as updatedAt when only createdAt is provided', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T10:00:00Z');

      // Act
      const meta = new EntityMetaProperties({ createdAt });

      // Assert
      expect(meta.createdAt).to.equal(createdAt);
      expect(meta.updatedAt).to.equal(createdAt);
    });
  });

  describe('validate', () => {
    it('should set isValidated to true', () => {
      // Arrange
      const meta = new EntityMetaProperties();
      expect(meta.isValidated).to.be.false;

      // Act
      meta.validate();

      // Assert
      expect(meta.isValidated).to.be.true;
    });

    it('should set isValidated to true when already true', () => {
      // Arrange
      const meta = new EntityMetaProperties({ isValidated: true });
      expect(meta.isValidated).to.be.true;

      // Act
      meta.validate();

      // Assert
      expect(meta.isValidated).to.be.true;
    });
  });

  describe('hasBeenUpdated', () => {
    it('should set isValidated to false and update updatedAt timestamp', () => {
      // Arrange
      const meta = new EntityMetaProperties({ isValidated: true });
      const originalUpdatedAt = meta.updatedAt;
      expect(meta.isValidated).to.be.true;

      // Advance time
      clock.tick(1000);

      // Act
      meta.hasBeenUpdated();

      // Assert
      expect(meta.isValidated).to.be.false;
      expect(meta.updatedAt.getTime()).to.be.greaterThan(originalUpdatedAt.getTime());
    });

    it('should set isValidated to false and update updatedAt when already false', () => {
      // Arrange
      const meta = new EntityMetaProperties();
      const originalUpdatedAt = meta.updatedAt;
      expect(meta.isValidated).to.be.false;

      // Advance time
      clock.tick(1000);

      // Act
      meta.hasBeenUpdated();

      // Assert
      expect(meta.isValidated).to.be.false;
      expect(meta.updatedAt.getTime()).to.be.greaterThan(originalUpdatedAt.getTime());
    });

    it('should not modify createdAt timestamp', () => {
      // Arrange
      const meta = new EntityMetaProperties();
      const originalCreatedAt = meta.createdAt;

      // Act
      meta.hasBeenUpdated();

      // Assert
      expect(meta.createdAt).to.equal(originalCreatedAt);
    });
  });

  describe('isReadyToSave', () => {
    it('should return true when entity is validated', () => {
      // Arrange
      const meta = new EntityMetaProperties({ isValidated: true });

      // Act
      const result = meta.isReadyToSave();

      // Assert
      expect(result).to.be.true;
    });

    it('should return false when entity is not validated', () => {
      // Arrange
      const meta = new EntityMetaProperties();

      // Act
      const result = meta.isReadyToSave();

      // Assert
      expect(result).to.be.false;
    });

    it('should return correct value after validation', () => {
      // Arrange
      const meta = new EntityMetaProperties();
      expect(meta.isReadyToSave()).to.be.false;

      // Act
      meta.validate();

      // Assert
      expect(meta.isReadyToSave()).to.be.true;
    });

    it('should return correct value after hasBeenUpdated', () => {
      // Arrange
      const meta = new EntityMetaProperties({ isValidated: true });
      expect(meta.isReadyToSave()).to.be.true;

      // Act
      meta.hasBeenUpdated();

      // Assert
      expect(meta.isReadyToSave()).to.be.false;
    });
  });

  describe('state transitions', () => {
    it('should handle multiple validate and hasBeenUpdated calls', () => {
      // Arrange
      const meta = new EntityMetaProperties();
      const originalUpdatedAt = meta.updatedAt;

      // Act & Assert - Initial state
      expect(meta.isValidated).to.be.false;
      expect(meta.isReadyToSave()).to.be.false;

      // Act & Assert - First validation
      meta.validate();
      expect(meta.isValidated).to.be.true;
      expect(meta.isReadyToSave()).to.be.true;
      expect(meta.updatedAt).to.equal(originalUpdatedAt); // validate() doesn't change updatedAt

      // Act & Assert - hasBeenUpdated
      clock.tick(1000);
      meta.hasBeenUpdated();
      expect(meta.isValidated).to.be.false;
      expect(meta.isReadyToSave()).to.be.false;
      expect(meta.updatedAt.getTime()).to.be.greaterThan(originalUpdatedAt.getTime());

      // Act & Assert - Second validation
      meta.validate();
      expect(meta.isValidated).to.be.true;
      expect(meta.isReadyToSave()).to.be.true;
    });

    it('should maintain consistency between isValidated and isReadyToSave', () => {
      // Arrange
      const meta = new EntityMetaProperties();

      // Assert initial consistency
      expect(meta.isValidated).to.equal(meta.isReadyToSave());

      // Act & Assert after validation
      meta.validate();
      expect(meta.isValidated).to.equal(meta.isReadyToSave());

      // Act & Assert after hasBeenUpdated
      meta.hasBeenUpdated();
      expect(meta.isValidated).to.equal(meta.isReadyToSave());
    });
  });

  describe('getCreatedAtIso', () => {
    it('should return createdAt timestamp as ISO string', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T10:00:00Z');
      const meta = new EntityMetaProperties({ createdAt });

      // Act
      const result = meta.getCreatedAtIso();

      // Assert
      expect(result).to.equal('2023-01-01T10:00:00.000Z');
      expect(result).to.be.a('string');
    });
  });

  describe('getUpdatedAtIso', () => {
    it('should return updatedAt timestamp as ISO string', () => {
      // Arrange
      const updatedAt = new Date('2023-01-02T15:30:00Z');
      const meta = new EntityMetaProperties({ updatedAt });

      // Act
      const result = meta.getUpdatedAtIso();

      // Assert
      expect(result).to.equal('2023-01-02T15:30:00.000Z');
      expect(result).to.be.a('string');
    });

    it('should return current updatedAt after hasBeenUpdated is called', () => {
      // Arrange
      const meta = new EntityMetaProperties();
      const originalIso = meta.getUpdatedAtIso();

      // Advance time
      clock.tick(1000);

      // Act
      meta.hasBeenUpdated();
      const newIso = meta.getUpdatedAtIso();

      // Assert
      expect(newIso).to.not.equal(originalIso);
      expect(newIso).to.be.a('string');
      expect(new Date(newIso).getTime()).to.be.greaterThan(new Date(originalIso).getTime());
    });
  });
});
