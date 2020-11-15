import { Character } from './Character';

export interface APIResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  },
  results: Array<Character>;
}
