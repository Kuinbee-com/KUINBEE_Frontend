
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a secure UUID for dataset unique IDs
 * Format: D + uuidv4()
 */
export function generateDatasetUniqueId(): string {
  return 'D' + uuidv4();
}

/**
 * Generates a general UUID string
 */
export function generateUniqueId(): string {
  return uuidv4();
}
