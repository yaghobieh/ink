#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import {
  INK_PACKAGE_NAME,
  INSTALL_FAILED,
  NPM_INSTALL,
  NPM_INSTALL_ARGS,
  PLUGIN_FLAG,
  PLUGIN_PACKAGE_BY_NAME,
  UNKNOWN_PLUGIN_PREFIX,
  USAGE_LINES,
} from './ink.const.mjs';

const collectPluginNames = (argv) => {
  const names = [];
  let taking = false;
  argv.forEach((arg) => {
    if (arg === PLUGIN_FLAG) {
      taking = true;
      return;
    }
    if (arg.startsWith(`${PLUGIN_FLAG}=`)) {
      taking = false;
      names.push(arg.slice(PLUGIN_FLAG.length + 1));
      return;
    }
    if (arg.startsWith('-')) {
      taking = false;
      return;
    }
    if (taking) names.push(arg);
  });
  return names.filter(Boolean);
};

const pluginNames = collectPluginNames(process.argv.slice(2));
const unknown = pluginNames.filter((name) => !PLUGIN_PACKAGE_BY_NAME[name]);
if (unknown.length > 0) {
  process.stderr.write(`${UNKNOWN_PLUGIN_PREFIX} ${unknown.join(', ')}\n`);
  process.stderr.write(`${USAGE_LINES.join('\n')}\n`);
  process.exit(1);
}

const packages = [
  INK_PACKAGE_NAME,
  ...pluginNames.map((name) => PLUGIN_PACKAGE_BY_NAME[name]),
];

const result = spawnSync(NPM_INSTALL, [...NPM_INSTALL_ARGS, ...packages], {
  stdio: 'inherit',
  shell: false,
});

if (result.status !== 0) {
  process.stderr.write(`${INSTALL_FAILED}\n`);
  process.exit(result.status ?? 1);
}
