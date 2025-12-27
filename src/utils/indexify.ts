export function indexify(value: string) {
  return value.replaceAll(/\D/g, '').trim()
}
