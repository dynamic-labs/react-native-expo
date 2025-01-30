// metro.config.js

const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const originalResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  try {
    return originalResolveRequest
      ? originalResolveRequest(context, moduleName, platform)
      : context.resolveRequest(context, moduleName, platform);
  } catch (error) {
    if (moduleName.endsWith(".js")) {
      const tsModuleName = moduleName.replace(/\.js$/, ".ts");
      return context.resolveRequest(context, tsModuleName, platform);
    }
    throw error;
  }
};

module.exports = config;
