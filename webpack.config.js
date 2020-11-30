const webpack = require('webpack');
const path = require('path');
// const { webpack } = require('webpack');

// need to create the main configuration object within the file.
// basic configuration, we need to provide webpack with three properties - 
// entry, output, and mode
// Entry point is the root of the bundle and the beginning of the dependency graph (give it the relative path to the clients code)

// Webpack will take the entry point we have provided, bundle it, and output that bundled code to a folder that we specify

// final piece is mode, in which we want webpack to run
// by default, webpack wants to run in production mode. We want our code to run in development mode 
module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jQuery",
            jQuery: 'jquery'
        }),
    ],
    mode: 'development'
};