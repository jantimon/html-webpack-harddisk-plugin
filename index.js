'use strict';
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

function HtmlWebpackHarddiskPlugin (options) {
  options = options || {};
  this.outputPath = options.outputPath;
}

HtmlWebpackHarddiskPlugin.prototype.apply = function (compiler) {
  var self = this;

  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('HtmlWebpackHarddisk', function (compilation) {
      if (compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('HtmlWebpackHarddisk', function (htmlPluginData, callback) {
          self.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
        });
      } else {
        // HtmlWebPackPlugin 4.x
        var HtmlWebpackPlugin = require('html-webpack-plugin');
        var hooks = HtmlWebpackPlugin.getHooks(compilation);

        hooks.afterEmit.tapAsync('HtmlWebpackHarddisk', function (htmlPluginData, callback) {
          self.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
        });
      }
    });
  } else {
    // webpack 3 support
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
        self.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
      });
    });
  }
};

/**
 * Writes an asset to disk
 */
HtmlWebpackHarddiskPlugin.prototype.writeAssetToDisk = function (compilation, htmlWebpackPluginOptions, webpackHtmlFilename, callback) {
  // Skip if the plugin configuration didn't set `alwaysWriteToDisk` to true
  if (!htmlWebpackPluginOptions.alwaysWriteToDisk) {
    return callback(null);
  }
  // Prepare the folder
  var fullPath = path.resolve(this.outputPath || compilation.compiler.outputPath, webpackHtmlFilename);
  var directory = path.dirname(fullPath);
  mkdirp(directory, function (err) {
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
};

module.exports = HtmlWebpackHarddiskPlugin;
