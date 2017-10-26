const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'antd-mobile': "./antd-mobile-test",
    'lodash': "./lodash-test",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  resolve: {
    modules: ['node_modules'],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use:  
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
          })
      },
      {
        test: /\.less$/,
        use:  
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', 'less-loader' ]
          })
      },
      {
        enforce: "pre",
        test: /\.(js|ts)$/,
        use: {
          loader: 'module-decompose-loader',
          options: {
            modules: {
              'antd-mobile': {
                components: 'lib',
                style: 'css',
                camel2Dash: true
              },
              lodash: {
                // nothing
              }
            }
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
}