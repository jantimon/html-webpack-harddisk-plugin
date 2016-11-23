/* eslint-env jasmine */
var path = require('path');
var fs = require('fs');
var MemoryFileSystem = require('memory-fs');
var webpack = require('webpack');
var rm_rf = require('rimraf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('../');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

var OUTPUT_DIR = path.join(__dirname, '../dist');

describe('HtmlWebpackHarddiskPlugin', function () {
  beforeEach(function (done) {
    rm_rf(OUTPUT_DIR, done);
  });

  it('should not generate files by default', function (done) {
    var compiler = webpack({
      entry: path.join(__dirname, 'fixtures', 'entry.js'),
      output: {
        path: OUTPUT_DIR
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackHarddiskPlugin()
      ]
    }, function (err) {
      expect(err).toBeFalsy();
      var htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(false);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });

  it('generates the file even if webpack is set to memory-fs', function (done) {
    var compiler = webpack({
      entry: path.join(__dirname, 'fixtures', 'entry.js'),
      output: {
        path: OUTPUT_DIR
      },
      plugins: [
        new HtmlWebpackPlugin({
          alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
      ]
    }, function (err) {
      expect(err).toBeFalsy();
      var htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(true);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });

  it('generates multiple files even if webpack is set to memory-fs', function (done) {
    var compiler = webpack({
      entry: path.join(__dirname, 'fixtures', 'entry_with_script.js'),
      output: {
        path: OUTPUT_DIR
      },
      plugins: [
        new HtmlWebpackPlugin({
          alwaysWriteToDisk: true
        }),
        new HtmlWebpackPlugin({
          filename: 'demo.html',
          alwaysWriteToDisk: true
        }),
        new HtmlWebpackPlugin({
          filename: 'skip.html'
        }),
        new HtmlWebpackHarddiskPlugin()
      ]
    }, function (err) {
      expect(err).toBeFalsy();
      var htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(true);
      var demoHtmlFile = path.resolve(__dirname, '../dist/demo.html');
      expect(fs.existsSync(demoHtmlFile)).toBe(true);
      var skipHtmlFile = path.resolve(__dirname, '../dist/skip.html');
      expect(fs.existsSync(skipHtmlFile)).toBe(false);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });

  it('works alongside other plugins on the same event', function (done) {
    var compiler = webpack({
      entry: path.join(__dirname, 'fixtures', 'entry_with_script.js'),
      output: {
        path: OUTPUT_DIR
      },
      plugins: [
        new HtmlWebpackPlugin({
          alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new ScriptExtHtmlWebpackPlugin({
          inline: [/\.js?/]
        })
      ]
    }, function (err) {
      expect(err).toBeFalsy();
      var htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(true);
      var htmlContent = fs.readFileSync(htmlFile).toString();
      expect(htmlContent).toContain('an inlined script');
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });
});
