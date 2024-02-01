const path = require('path'); // подключаем path к конфигу вебпак,которая превращает относительный путь в абсолютный 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //научите «Вебпак» обрабатывать css-файлы

module.exports = {
// module.exports — это синтаксис экспорта в Node.js 
  entry: { main: './src/scripts/index.js' }, // указали первое место, куда заглянет webpack, — файл index.js в папке src
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
// указали, в какой файл будет собираться весь js, и дали ему имя:
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [{// добавим в него объект правил для бабеля
          test: /\.js$/, // регулярное выражение, которое ищет все js файлы
          use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
          exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
        },
        // добавили правило для обработки файлов:
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource', //это значение позволяет переносить исходные файлы в конечную сборку в том же формате.
        },
        {
         // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { 
              importLoaders: 1 //1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader
            } 
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // удаление папки dist перед сборкой
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов CSS
  ] 
}
