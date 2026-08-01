import type {
  InkPremiumConfig,
  InkPremiumFeature,
  InkResolvedPremium,
  InkThemeTokens,
} from '../types';
import {
  INK_PREMIUM_FEATURES,
  INK_PREMIUM_LICENSE_PREFIX,
  INK_THEME_CSS_VARS,
} from '../constants';

const allFeaturesOff = (): Record<InkPremiumFeature, boolean> =>
  Object.fromEntries(INK_PREMIUM_FEATURES.map((feature) => [feature, false])) as Record<
    InkPremiumFeature,
    boolean
  >;

const allFeaturesOn = (): Record<InkPremiumFeature, boolean> =>
  Object.fromEntries(INK_PREMIUM_FEATURES.map((feature) => [feature, true])) as Record<
    InkPremiumFeature,
    boolean
  >;

const LICENSE_BODY_PATTERN = /^[A-Z0-9]{4}(?:_[A-Z0-9]{4}){3}$/;

export const isInkPremiumLicenseKey = (licenseKey?: string): boolean => {
  if (!licenseKey) return false;
  const trimmed = licenseKey.trim();
  if (!trimmed.startsWith(INK_PREMIUM_LICENSE_PREFIX)) return false;
  const body = trimmed.slice(INK_PREMIUM_LICENSE_PREFIX.length);
  return LICENSE_BODY_PATTERN.test(body);
};

export const resolveInkPremium = (config?: InkPremiumConfig): InkResolvedPremium => {
  const active = Boolean(config?.enabled || isInkPremiumLicenseKey(config?.licenseKey));
  if (!active) {
    return { active: false, features: allFeaturesOff() };
  }
  const features = allFeaturesOn();
  if (config?.features) {
    for (const feature of INK_PREMIUM_FEATURES) {
      if (config.features[feature] === false) {
        features[feature] = false;
      }
    }
  }
  return { active, features };
};

export const hasInkPremiumFeature = (
  premium: InkResolvedPremium,
  feature: InkPremiumFeature,
): boolean => premium.active && premium.features[feature];

export const themeTokensToStyle = (theme?: InkThemeTokens): Record<string, string> => {
  if (!theme) return {};
  const style: Record<string, string> = {};
  (Object.keys(INK_THEME_CSS_VARS) as (keyof InkThemeTokens)[]).forEach((key) => {
    const value = theme[key];
    if (value) {
      style[INK_THEME_CSS_VARS[key]] = value;
    }
  });
  return style;
};
