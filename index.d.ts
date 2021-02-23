import { WebpackPluginInstance } from 'webpack';

interface HtmlWebpackHarddiskPluginOptions {
  /**
   * Path where to save compiled assets
   */
  outputPath?: string;
}

interface HtmlWebpackHarddiskPlugin extends WebpackPluginInstance {
  new (options?: HtmlWebpackHarddiskPluginOptions): HtmlWebpackHarddiskPlugin;
}

declare const htmlWebpackHarddiskPlugin: HtmlWebpackHarddiskPlugin
export = htmlWebpackHarddiskPlugin
