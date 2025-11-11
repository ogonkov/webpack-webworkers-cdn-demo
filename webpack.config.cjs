module.exports = (env) => {
  /** @type {import('webpack').Configuration} */
  const config = {
    mode: env.production ? "production" : "development",
    entry: ["./src/public-path.js", "./src/index.js"],
    output: {
      filename: env.production ? "[name].[contenthash:8].js" : "js/[name].js",
      chunkFilename: env.production
        ? "js/[name].[contenthash:8].chunk.js"
        : "js/[name].chunk.js",
    },
    devtool: env.production ? "source-map" : "cheap-module-source-map",
    devServer: {
      port: 8080,
      allowedHosts: ["foo-bar-cdn.me"],
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
  };

  return config;
};
