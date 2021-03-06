const webpack = require("webpack")
const merge = require("webpack-merge")
const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, "..", dir)
}

var config = {
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname + "/dist/"),
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.common.js",
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test"), resolve("node_modules/webpack-dev-server/client")],
            },
            {
                test: /\.css$/,
                loader: "style!less!css",
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{ loader: "file-loader" }],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                exclude: /node_modules/,
                loader: "file-loader",
            },
            {
                test: /\.(eot|ttf)$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname + "/src/"),
                to: path.resolve(__dirname + "/dist/"),
                ignore: [".DS_Store"],
            },
            {
                from: path.resolve(__dirname + "/src/"),
                to: path.resolve(__dirname + "/demo/src/components"),
                ignore: [".DS_Store"],
            },
        ]),
        new CleanWebpackPlugin(["dist"]),
    ],
    optimization: {},
}

module.exports = [
    // Config 1: For browser environment
    merge(config, {
        entry: path.resolve(__dirname, "./wrapper.js"),
        output: {
            filename: "vue-toolbar-button.js",
            libraryTarget: "window",
        },
    }),

    // Config 2: For Node-based development environments
    // merge(config, {
    // 	entry: path.resolve(__dirname, './single-select.vue'),
    // 	output: {
    // 	    filename: 'vue-clock.min.js',
    // 	    libraryTarget: 'umd',
    // 	}
    // })
]
if (process.env.NODE_ENV === "production") {
    module.exports.devtool = "#source-map"
    // http://vue-loader.vuejs.org/en/workflow/production.html
    // module.exports.plugins = (module.exports.plugins || []).concat([
    // 	new webpack.LoaderOptionsPlugin({
    //         minimize: true
    // 	})
    // ])
}
