const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const incstr = require('incstr');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = (env, { mode }) => {
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
    if (mode === 'production') {
      return id;
    }
    return `${localName}_${id}`;
  }


  return {
    output: {
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
          options: {
            envName: mode,
          },
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
                  minimize: mode === 'production',
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
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
        },
      }),
      new ExtractTextPlugin('[hash].css'),
      new WebpackPwaManifest({
        name: 'Spellcard Generator',
        short_name: 'Spellcards',
        description: 'Test',
        background_color: '#8b6f12',
        theme_color: '#756408',
        start_url: '.',
        icons: [{
          src: path.join(__dirname, 'src/icon.svg'),
          sizes: [256, 512],
        }],
      }),
      new WebpackCleanupPlugin({
        quiet: true,
      }),
    ],
  };
};
