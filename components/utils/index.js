export function trimText(text, size = 10) {
  const words = text.split(' ');
  return words.length > size ? words.slice(0, size).join(' ') + '...' : text;
}
