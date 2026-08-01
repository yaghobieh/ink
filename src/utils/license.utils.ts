import { INK_PREMIUM_LICENSE_PREFIX } from '../constants';

const LICENSE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const LICENSE_SEGMENT_LENGTH = 4;
const LICENSE_SEGMENT_COUNT = 4;

const randomSegment = (): string => {
  const bytes = new Uint8Array(LICENSE_SEGMENT_LENGTH);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (byte) => LICENSE_ALPHABET[byte % LICENSE_ALPHABET.length]).join('');
};

export const mintInkPremiumLicenseKey = (): string => {
  const body = Array.from({ length: LICENSE_SEGMENT_COUNT }, () => randomSegment()).join('_');
  return `${INK_PREMIUM_LICENSE_PREFIX}${body}`;
};
