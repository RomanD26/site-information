const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');
const { extendDefaultPlugins } = require("svgo");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ]
  }
  return config
}

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // hmr: isDev, // Hot Module Replacement
        // reloadAll: true,
        publicPath: (resourcePath, context) => {
          return path.relative(path.dirname(resourcePath), context) + '/';
        }
      },
    },
    'css-loader',
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html', // название выходного файла      
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img')
        }
      ]
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      files: './styles/components/**/*.s?(a|c)ss',
      formatter: require('stylelint').formatters.verbose,
      lintDirtyModulesOnly: true,
      quiet: true,
      syntax: 'scss'
    }),
  ];  
  return base;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `./js/${filename('js')}`,
    assetModuleFilename: 'img/[name][ext]',
    publicPath: '',
    clean: true
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: isDev, // hot module replacement.
    port: 8080
  },
  optimization: optimization(),
  // historyApiFallback: true,
  resolve: {
    extensions: ['.js', '.json', '.png'], // расширения, которые используются
    alias: {
      '@js': path.resolve(__dirname, './js'), // список псевдонимов имен модулей
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(?:png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },     
    ]
  }
}
