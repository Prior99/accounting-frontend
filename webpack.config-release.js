const webpack = require("webpack");
const config = require("./webpack.config");
const merge = require("ramda").merge;

module.exports = merge(config, {
    devtool: "sou
    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": `"production"`
            }
        })
    ]
});
