export function isValidJSON(data: string) {
  return /^\s*(\{.*\}|\[.*\])\s*$/.test(data);
}