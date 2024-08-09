const BundleTracker = require("webpack-bundle-tracker");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve("./bundles/"),
    filename: "[name]-[hash].js",
    publicPath: "/static/bundles/",
  },
  plugins: [
    new BundleTracker({ path: __dirname, filename: "webpack-stats.json" }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
