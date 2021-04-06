const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  devtool: "source-map",
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          // 아래부터 거꾸로 수행된다.
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", //webpack이 css를 이해할수있게한다.
          },
          {
            loader: "postcss-loader", //css를 받아서 내가 주는 plugin을 갖고 css를 변환해줄것이다. (css호환성문제 해결)
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    // {
                    //   browsers: "cover 99.5%",
                    // },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", // scss를 일반 css로 바꿔준다.
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css",
    }),
  ],
};

module.exports = config;
