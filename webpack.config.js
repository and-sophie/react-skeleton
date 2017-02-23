var webpack = require('webpack');
var path = require('path');
var environment = JSON.stringify(process.env.ENVIRONMENT || "development");

var APP_DIR = path.resolve(__dirname, "src");
var BUILD_DIR = path.resolve(__dirname, "build");

var config = {
    devtool: "source-map",
    entry: APP_DIR + "/index.js",
    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                include: APP_DIR,
                loaders: ["style", "css", "sass"]
            }
        ]

    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.ev': {
                'NODE_ENV': environment
            }
        })
    ]
};

//minify if not dev build
// if(environment !== JSON.stringify("development")) {
//     config.plugins.push(new webpack.optimize.UglifyJsPlugin());
// }

module.exports = config