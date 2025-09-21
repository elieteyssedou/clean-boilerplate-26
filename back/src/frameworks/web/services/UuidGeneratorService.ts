import { randomUUID } from 'crypto';
import IdGeneratorService from '@/domain/services/IdGeneratorService';

export default class UuidGeneratorService implements IdGeneratorService {
  generateId(): string {
    return randomUUID();
  }
}
