import { Plugin } from 'webpack';

interface HtmlWebpackHarddiskPluginOptions {
  /**
   * Path where to save compiled assets
   */
  outputPath?: string;
}

interface HtmlWebpackHarddiskPlugin extends Plugin {
  new (options?: HtmlWebpackHarddiskPluginOptions): HtmlWebpackHarddiskPlugin;
}

declare const htmlWebpackHarddiskPlugin: HtmlWebpackHarddiskPlugin
export = htmlWebpackHarddiskPlugin
