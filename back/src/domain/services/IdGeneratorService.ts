export const IdGeneratorServiceToken = 'IdGeneratorService';

export default interface IdGeneratorService {
  generateId(): string;
}
