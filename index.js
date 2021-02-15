'use strict';
const fs = require('fs');
const path = require('path');

class HtmlWebpackHarddiskPlugin {
  constructor (options) {
    this.options = options || {};
    this.outputPath = this.options.outputPath;
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackHarddisk', (compilation) => {
      // HtmlWebPackPlugin 4.x
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.afterEmit.tapAsync('HtmlWebpackHarddisk', (htmlPluginData, callback) => {
        this.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
      });
    });
  }

  /**
   * Writes an asset to disk
   */
  writeAssetToDisk (compilation, htmlWebpackPluginOptions, webpackHtmlFilename, callback) {
    // Skip if the plugin configuration didn't set `alwaysWriteToDisk` to true
    if (!htmlWebpackPluginOptions.alwaysWriteToDisk) {
      return callback(null);
    }
    // Prepare the folder
    const fullPath = path.resolve(this.outputPath || compilation.compiler.outputPath, webpackHtmlFilename);
    const directory = path.dirname(fullPath);

    fs.mkdir(directory, { recursive: true }, function (err) {
      if (err) {
        return callback(err);
      }
      // Write to disk
      fs.writeFile(fullPath, compilation.assets[webpackHtmlFilename].source(), function (err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  }
}

module.exports = HtmlWebpackHarddiskPlugin;
module.exports.HtmlWebpackHarddiskPlugin = HtmlWebpackHarddiskPlugin;
