const path = require('path') 
const webpack = require('webpack')
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


module.exports= {
  name: 'react-without-cra',
  mode: 'development', // 실서비스 : production
  devtool:'eval',
  resolve: {
    extensions: ['.js', '.jsx'] 
  },

  entry : {
    app: ['./client']
  },
  module: {
    rules: [{
      test: /\.jsx?/, 
      loader: 'babel-loader',
      options: {
        presets: [
					['@babel/preset-env',{
						targets: {
							browsers: ['>5% in KR','last 2 chrome versions']
						},
            debug: true,
          }],
					'@babel/preset-react'  
				],
        plugins:[
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel'
        ],
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({debug: true}),
    new RefreshWebpackPlugin()
  ],
  output : {
    path: path.join(__dirname, 'dist'), 
    filename: 'app.js'
  },
  devServer: {
    devMiddleware: {publicPath: '/dist'},
    static: {directory: path.resolve(__dirname)},
    hot: true
  }
}