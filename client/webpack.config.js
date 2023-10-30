const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// module.exports = () => {
module.exports = {
  // return {
  mode: "development",
  entry: {
    main: "./src/js/index.js",
    install: "./src/js/install.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "JATE",
    }),
    new InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "service-worker.js",
    }),
    new WebpackPwaManifest({
      name: "Just Another Text Editor",
      short_name: "J.A.T.E",
      description: "Takes notes with JavaScript syntax highlighting!",
      background_color: "#0e0f0c",
      theme_color: "#0e0f0c",
      crossorigin: "use-credentials",
      publicPath: "./",
      icons: [
        {
          src: path.resolve("./src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets"),
        },
      ],
      orientation: "portrait",
      display: "standalone",
      start_url: "./",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/transform-runtime",
            ],
          },
        },
      },
    ],
  },
};
// };
