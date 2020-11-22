const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, './src')
            ],
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-react',
                    '@babel/preset-env'
                ]
            }
        }]
    }
};