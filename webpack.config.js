module.exports = {
  entry: "./src/client.js",
  output: {
    path: __dirname + "/public",
    filename: "client-bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }]
  }
};