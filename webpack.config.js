const path = require('path');

const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const incstr = require('incstr');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const webpack = require('webpack');


const generateLocalIdentName = incstr.idGenerator();


const cssContexts = {};


function getLocalIdent(context, localIdentName, localName) {
  const { resourcePath } = context;
  cssContexts[resourcePath] = cssContexts[resourcePath] || {};
  const classMap = cssContexts[resourcePath] || {};
  let id = classMap[localName];
  if (id == null) {
    do {
      id = generateLocalIdentName();
    } while (!Number.isNaN(Number(id)));
    classMap[localName] = id;
  }
  if (process.env.NODE_ENV === 'production') {
    return id;
  }
  return `${localName}_${id}`;
}


const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html'),
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
    },
  }),
  new ExtractTextPlugin('[contenthash].css'),
  new WebpackCleanupPlugin({
    quiet: true,
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BabelMinifyPlugin(null, {
      comments: false,
    }),
  );
} else {
  plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = {
  entry: path.resolve(__dirname, 'app/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  resolveLoader: {
    modules: ['node_modules', 'loaders'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'app'),
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: process.env.NODE_ENV === 'production',
                modules: true,
                camelCase: true,
                getLocalIdent,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'file-loader',
      },
      {
        test: /\/spells\.csv$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].json',
            },
          },
          { loader: 'stringify-json-loader' },
          { loader: 'spells-loader' },
          { loader: 'csv-loader' },
        ],
      },
    ],
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 1337,
    noInfo: true,
  },
  plugins,
};
