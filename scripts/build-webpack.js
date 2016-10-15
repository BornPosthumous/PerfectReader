const webpack = require('webpack')
const path = require('path')

const webpackOpts = {
  target: 'node',
  entry: path.resolve(__dirname, '..', 'src', 'main.ts'),
  output: {
    filename: path.resolve(__dirname, '..', 'dist', 'index.js'),
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, query: {
        configFileName: path.resolve(__dirname, '..', 'tsconfig.json'),
      } },
      { test: /\.json$/, loader: "json-loader" }
    ],

    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  externals: [require('webpack-node-externals')()],
}

const compiler = webpack(webpackOpts)

const log = (err, stats) => {
  if (err) {
    console.log(err)
  }

  if (stats.compillation && stats.compillation.errors) {
    console.log(stats.compillation.errors)
  }
}

void function Main() {
  let [,, watch] = process.argv

  if (watch === '--watch' || watch === '-w') {
    return compiler.watch({
      aggregateTimeout: 300,
      poll: false,
    }, log)
  }

  compiler.run(log)
}()
