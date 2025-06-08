export const isPlainObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);
