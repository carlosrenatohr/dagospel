var webpack = require('webpack');
var path = require('path');
var extractTextWebPackPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new extractTextWebPackPlugin({
    filename: 'styles.css'
});
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                    //fallback: "style-loader",
                    //use: "css-loader"
                })
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.html$/,
                use: {
                    loader:'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                exclude: path.resolve(__dirname, 'src/index.html')
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader:'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        //publicPath: 'img/'
                    }
                }
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({/* .. */}),
        extractPlugin,
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        /*new htmlWebpackPlugin({
            filename: 'main.html',
            template: 'src/dashboard.html',
            chunks: [] // Param to include bundles on template
                      // So It's necessary to name every entry
        }),*/
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        //-- Webpack 3
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}