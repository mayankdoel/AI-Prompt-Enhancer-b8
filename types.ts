export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum AppMode {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface PromptSection {
  title: string;
  content: string;
}

export type StructuredPrompt = PromptSection[];
