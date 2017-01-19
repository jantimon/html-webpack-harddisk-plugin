Harddisk extension for the HTML Webpack Plugin
========================================
[![npm version](https://badge.fury.io/js/html-webpack-harddisk-plugin.svg)](http://badge.fury.io/js/html-webpack-harddisk-plugin) [![Dependency Status](https://david-dm.org/jantimon/html-webpack-harddisk-plugin.svg)](https://david-dm.org/jantimon/html-webpack-harddisk-plugin) [![Build status](https://travis-ci.org/jantimon/html-webpack-harddisk-plugin.svg)](https://travis-ci.org/jantimon/html-webpack-harddisk-plugin) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
functionality by adding the `{alwaysWriteToDisk: true|false}` option.

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) - a plugin that simplifies the creation of HTML files to serve your webpack bundles.

Installation
------------
You must be running webpack on node 0.12.x or higher

Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-harddisk-plugin
```

Basic Usage
-----------
Require the plugin in your webpack config:

```javascript
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackHarddiskPlugin()
]  
```
The above configuration will actually do nothing due to the configuration defaults.

As soon as you now set `alwaysWriteToDisk` to `true` the generated output of the HtmlWebpackPlugin will
always be written to disk. This is very useful if you want to pick up the output with another middleware.
```javascript
plugins: [
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: true
	}),
  new HtmlWebpackHarddiskPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackHarddiskPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: true
	}),
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: 'demo.html'
	}),
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: false,
		filename: 'test.html'
	}),
  new HtmlWebpackHarddiskPlugin()
]  
```

If you need to set the output path explicitly (for example when using with webpack-dev-server middleware) then pass in the `outputPath` option:

```
new HtmlWebpackHarddiskPlugin({
  outputPath: path.resolve(__dirname, 'views')
})
```
