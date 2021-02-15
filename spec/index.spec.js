/* eslint-env jasmine */
const path = require('path');
const fs = require('fs');
const MemoryFileSystem = require('memory-fs');
const webpack = require('webpack');
const rimraf = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('../');

const OUTPUT_DIR = path.join(__dirname, '../dist');

describe('HtmlWebpackHarddiskPlugin', function () {
  beforeEach(function (done) {
    rimraf(OUTPUT_DIR, done);
  });

  it('should not generate files by default', function (done) {
    const compiler = webpack({
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
      const htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(false);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });

  it('generates the file even if webpack is set to memory-fs', function (done) {
    const compiler = webpack({
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
      const htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(true);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });

  it('generates multiple files even if webpack is set to memory-fs', function (done) {
    const compiler = webpack({
      entry: path.join(__dirname, 'fixtures', 'entry.js'),
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
      const htmlFile = path.resolve(__dirname, '../dist/index.html');
      expect(fs.existsSync(htmlFile)).toBe(true);
      const demoHtmlFile = path.resolve(__dirname, '../dist/demo.html');
      expect(fs.existsSync(demoHtmlFile)).toBe(true);
      const skipHtmlFile = path.resolve(__dirname, '../dist/skip.html');
      expect(fs.existsSync(skipHtmlFile)).toBe(false);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });

  it('writes to specific outputPath if specified in options', function (done) {
    const compiler = webpack({
      entry: path.join(__dirname, 'fixtures', 'entry.js'),
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
        new HtmlWebpackHarddiskPlugin({
          outputPath: path.resolve(OUTPUT_DIR, 'foo')
        })
      ]
    }, function (err) {
      expect(err).toBeFalsy();
      const htmlFile = path.resolve(__dirname, '../dist/foo/index.html');
      expect(fs.existsSync(htmlFile)).toBe(true);
      const demoHtmlFile = path.resolve(__dirname, '../dist/foo/demo.html');
      expect(fs.existsSync(demoHtmlFile)).toBe(true);
      const skipHtmlFile = path.resolve(__dirname, '../dist/foo/skip.html');
      expect(fs.existsSync(skipHtmlFile)).toBe(false);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });
});
