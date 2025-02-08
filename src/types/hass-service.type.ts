/* eslint-disable @typescript-eslint/no-explicit-any */
export type HassService = {
  description: string;
  fields: Record<string, {description: string; example?: any}>;
};
