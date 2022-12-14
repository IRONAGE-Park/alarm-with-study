"use strict";

const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
  babelrc: true,
  presets: [
    [require.resolve("babel-preset-react-app"), { runtime: "automatic" }],
  ],
});
