// loads ".env" when invoking config without args
require("dotenv").config();
// DefinePlugin plugin injects ENVs into our client
// HotModuleReplacementPlugin plugin replaces files in browser without a refresh
const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        RAPIDAPIHOST: JSON.stringify(process.env.RAPIDAPIHOST),
        RAPIDAPIKEY: JSON.stringify(process.env.RAPIDAPIKEY),
      },
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};
