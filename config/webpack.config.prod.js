var path = require('path');
var autoprefixer = require('autoprefixer'); // Adds vendor to css rule a {display: flex} -> a {display: -webkit*, -moz*, ...}
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var url = require('url');

var homepagePath = require(path.resolve('package.json')).homepage;
var publicPath = homepagePath ? url.parse(homepagePath).pathname : '/';
if (!publicPath.endsWith('/')) {
  publicPath += '/'; // Prevents incorrect paths in file-loader
}

module.exports = {
  bail: true, //Don't attempt to continue if there are any errors.
  devtool: 'cheap-module-source-map',
  entry: [
    './client/'
  ],
  output: {
    path: path.resolve('public'),
    pathinfo: true,
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  resolveLoader: {
    root: path.resolve('node_modules'),
    moduleTemplates: ['*-loader']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.resolve('client')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('client'),
        loader: 'babel',
        query: require('./babel.prod')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'res/files/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\/favicon.ico$/,
        include: [path.resolve('client')],
        loader: 'file',
        query: {
          name: 'favicon.ico?[hash:8]'
        }
      },
     {
       test: /\.html$/,
       loader: 'html',
       query: {
         attrs: ['link:href'], // resources link href="../"
       }
     }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('res/css/[name].[contenthash:8].css')
  ]
};
