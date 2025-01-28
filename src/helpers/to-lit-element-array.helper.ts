// Take an array of strings and return a string with each element separated by a comma and wrapped in double quotes
export function toLitElementArray(arr: string[]): string {
  return arr.map((e) => `"${e}"`).join(', ');
}
