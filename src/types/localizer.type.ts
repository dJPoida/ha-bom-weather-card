export type Localizer = (
  string: string,
  substitute?: Record<string, string | number>
) => string;
