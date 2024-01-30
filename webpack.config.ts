import path from 'path';

import webpack from 'webpack';

import { buildWebpackConfig } from './webpack/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './webpack/types/config';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    static: path.resolve(__dirname, 'public'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const mode = env?.mode || 'development';
  const port = env?.port || 3000;

  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
  });

  return config;
};
