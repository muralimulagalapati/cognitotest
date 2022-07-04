const path = require('path');

module.exports = {
  mode: 'development',
  devtool: "cheap-eval-source-map",
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
       },
      { 
        test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  }
}
