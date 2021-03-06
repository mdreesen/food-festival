const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackPwaManifest = require("webpack-pwa-manifest");
// const { webpack } = require('webpack');

// need to create the main configuration object within the file.
// basic configuration, we need to provide webpack with three properties - 
// entry, output, and mode
// Entry point is the root of the bundle and the beginning of the dependency graph (give it the relative path to the clients code)

// Webpack will take the entry point we have provided, bundle it, and output that bundled code to a folder that we specify

// final piece is mode, in which we want webpack to run
// by default, webpack wants to run in production mode. We want our code to run in development mode 
module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jQuery",
            jQuery: 'jquery'
        }),
        // We can set this value to disable to temporarily stop the reporting and automatic opening of this report in the browser
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        }),
        new webpackPwaManifest({ // new means that we invoking a new constructor function
            name: "food Event",
            short_name: "foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // fingerprints and injection are specific to the manifest plugin
            fingerprints: false, // telss webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated - 
            // it looks like this manifest.lhge325d.json, this is why its set to false
            inject: false, // injection property determines whether the link to the manifest.json is added to the HTML. Because we are not using fingerprints - 
            // we can set inject to false
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    mode: 'development'
};