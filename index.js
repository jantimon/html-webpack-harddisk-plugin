'use strict';
var assert = require('assert');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

function HtmlWebpackHarddiskPlugin (options) {
  assert.equal(options, undefined, 'The HtmlWebpackHarddiskPlugin does not accept any options');
}

HtmlWebpackHarddiskPlugin.prototype.apply = function (compiler) {
  var self = this;
  // Hook into the html-webpack-plugin processing
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
      self.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
    });
  });
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
  var fullPath = path.resolve(compilation.compiler.outputPath, webpackHtmlFilename);
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
