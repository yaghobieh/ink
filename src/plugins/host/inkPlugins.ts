import { BUNDLED_HOST_PLUGINS } from '../../constants/plugins.const';
import type { InkHostPlugin, InkHostPluginId } from '../../types/plugin.types';

const installed = new Map<string, InkHostPlugin>();

const installBundled = (): void => {
  BUNDLED_HOST_PLUGINS.forEach((plugin) => {
    if (!installed.has(plugin.id)) {
      installed.set(plugin.id, plugin);
    }
  });
};

export const createInkPluginHost = () => {
  installBundled();
  return {
    install: (plugin: InkHostPlugin): void => {
      installed.set(plugin.id, plugin);
    },
    uninstall: (id: InkHostPluginId): void => {
      installed.delete(id);
    },
    isInstalled: (id: InkHostPluginId): boolean => installed.has(id),
    get: (id: InkHostPluginId): InkHostPlugin | undefined => installed.get(id),
    list: (): InkHostPlugin[] => Array.from(installed.values()),
  };
};

export const inkPlugins = createInkPluginHost();
