export const CODEX_ERROR = {} as const;

export type SchemaPortal = {
  name: string;
  collection: string;
};

export const CODEX_PORTAL_SCHEMA = ['article'] as const;

export type CodexPortalSchema = typeof CODEX_PORTAL_SCHEMA[number];

const CodexPortal = 'CodexPortal_' as const;

export const CODEX_PORTAL_MONGO: Record<CodexPortalSchema, SchemaPortal> = {
  article: {
    name: CodexPortal + 'Article',
    collection: CodexPortal + 'Article',
  },
};
