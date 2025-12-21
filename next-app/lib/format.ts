export function toBnDigits(value: number | string): string {
  const text = String(value);
  let out = '';
  for (const ch of text) {
    if (ch >= '0' && ch <= '9') {
      const digit = ch.charCodeAt(0) - 48;
      out += String.fromCharCode(0x09e6 + digit);
    } else {
      out += ch;
    }
  }
  return out;
}
