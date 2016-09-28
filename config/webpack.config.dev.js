var path = require('path');
var autoprefixer = require('autoprefixer'); // Adds vendor to css rule a {display: flex} -> a {display: -webkit*, -moz*, ...}
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/'
  ],
  output: {
    path: path.resolve('public'),
    filename: 'static/bundle.[hash:10].js',
    publicPath: '/'
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
        query: require('./babel.dev')
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
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
    configFile: path.join(__dirname,  'eslint.js'),
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
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('index.html')
    })
  ]
};
