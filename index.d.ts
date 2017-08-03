// Type definitions for html-webpack-harddisk-plugin 0.4.0
// Project: https://github.com/alexindigo/webpack-chunk-hash
// Definitions by: Cristian Lorenzo <https://github.com/dogmatico>

import { Plugin } from "webpack";

declare class HtmlWebpackHarddiskPlugin extends Plugin {
  constructor(options?: HtmlWebpackHarddiskPlugin.Options);
}

declare namespace HtmlWebpackHarddiskPlugin {
  interface Options {
  /**
   * Path where to save compiled assets
   */
    outputPath?: string;
  }
}

export = HtmlWebpackHarddiskPlugin;
