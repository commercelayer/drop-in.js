export function format(first: string| undefined, middle: string| undefined, last: string| undefined): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
