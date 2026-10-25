import { describe, expect, it } from 'vitest';
import { isInkPremiumLicenseKey } from './premium.utils';

describe('isInkPremiumLicenseKey', () => {
  it('accepts a Lemon Squeezy license key', () => {
    expect(isInkPremiumLicenseKey('38b1460a-5104-4067-a91d-77b872934d51')).toBe(true);
  });

  it('accepts an Ink Pro key', () => {
    expect(isInkPremiumLicenseKey('ink_prem_AB12_CD34_EF56_GH78')).toBe(true);
  });

  it('rejects an empty or invented key', () => {
    expect(isInkPremiumLicenseKey('')).toBe(false);
    expect(isInkPremiumLicenseKey('not-a-key')).toBe(false);
  });
});
