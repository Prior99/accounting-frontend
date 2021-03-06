const Webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css');
const gitRevision = new GitRevisionPlugin({ lightweightTags: true });

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/dist"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules")
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|woff|ttf|woff2|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            hash: "sha512",
                            digest: "hex",
                            name: "[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.tsx?/,
                loader: "awesome-typescript-loader",
                exclude: [/__tests__/]
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { sourceMap: true }
                        },
                        {
                            loader: "resolve-url-loader"
                        }
                    ]
                })
            },
            {
                test: /\.(scss)$/,
                loader: extractCSS.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: "resolve-url-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/' }
            ]
        }
    },
    plugins: [
        extractCSS,
        new Webpack.DefinePlugin({
            // Taken and adapted from the official README.
            // See: https://www.npmjs.com/package/git-revision-webpack-plugin
            "ACCOUNTING_SOFTWARE_VERSION": JSON.stringify(gitRevision.version())
        }),
        new ProgressBarPlugin()
    ],
};
