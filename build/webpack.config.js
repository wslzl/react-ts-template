const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolvePath = (..._path) => {
  return path.resolve(__dirname, ..._path);
};

const isProduction = process.env.NODE_ENV === "production";

module.exports = function () {
  const getStyleLoaders = () => {
    return [
      isProduction
        ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          }
        : { loader: "style-loader" },
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass"),
          sourceMap: true,
        },
      },
    ].filter(Boolean);
  };
  return {
    mode: "development",
    stats: isProduction ? "" : "errors-only",
    entry: resolvePath("../src/index.tsx"),
    output: {
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js",
      publicPath: "/",
      path: resolvePath("../dist"),
      clean: true,
      chunkFilename: isProduction
        ? "js/[name].[contenthash:8].chunk.js"
        : "js/[name].chunk.js",
    },
    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?)$/,
          loader: require.resolve("babel-loader"),
          include: resolvePath("../src"),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              "@babel/preset-react",
              "@babel/preset-env",
              "@babel/preset-typescript",
            ],
            plugins: [require.resolve("@babel/plugin-transform-runtime")],
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: getStyleLoaders(),
          exclude: /node_modules/,
        },
        {
          test: /\.wasm$/,
          type: "webassembly/async",
          generator: {
            filename: "static/[name].wasm",
          },
        },
        {
          test: /\.svg$/,
          type: "asset/inline",
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: "asset/resource",
          generator: {
            filename: "static/[name].[hash:8].[ext]",
          },
        },
      ],
    },
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            filename: "index.html",
            inject: true,
            template: resolvePath("../public", "index.html"),
          },
          isProduction
            ? {
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
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].chunk.css",
        }),
      new ESLintWebpackPlugin({
        extensions: ["js", "mjs", "jsx", "ts", "tsx"],
        eslintPath: require.resolve("eslint"),
        context: resolvePath("../src"),
        cache: true,
        cacheLocation: path.resolve(
          resolvePath("../node_modules"),
          ".cache/.eslintcache"
        ),
        resolvePluginsRelativeTo: __dirname,
      }),
    ].filter(Boolean),
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".wasm"],
      alias: {
        "@": resolvePath("../src/"),
      },
    },
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true,
    },
    devServer: {
      compress: true,
      host: "127.0.0.1",
      hot: true,
      open: true,
      port: 5555,
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserWebpackPlugin()],
      splitChunks: {
        chunks: "all",
        minSize: {
          javascript: 30000,
          webassembly: 50000,
        },
      },
    },
  };
};
