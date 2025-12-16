import {apiClient} from './client';
import type {TechStackSearchResponse} from '../model/types';

export async function searchTechStacks(keyword: string): Promise<string[]> {
  const data = await apiClient<TechStackSearchResponse>(
    `/api/tech-stacks?keyword=${encodeURIComponent(keyword)}`
  );
  return data.results.map((stack) => stack.name);
}

export async function createTechStack(name: string): Promise<void> {
  await apiClient<void, {name: string}>('/api/tech-stacks', {
    method: 'POST',
    body: {name},
  });
}
