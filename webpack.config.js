const path = require("path");

module.exports = {
    entry: {
        app:"./assets/index.js"
    },
    output: {
        path: path.join(__dirname, "public/dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/../assets/img/[name].[ext]"
            }
        ]
    }
};