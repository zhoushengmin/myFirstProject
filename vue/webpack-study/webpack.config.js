const path = require('path')
//启用热更新的第二步
const webpack = require('webpack')
//导入在内存中生成HTML页面的插件 html-webpack-plugin
//只要是插件都一定要放到plugins节点中去
//这个插件的两个作用:
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  mode: 'production',
  entry:path.join(__dirname,'./src/main.js'),//入口
  output:{
    path:path.join(__dirname,'./dist'),//指定打包好的文件输出到哪个目录中
    filename:'bundle.js'//输出文件的名称
  },
  devServer:{//配置dev-server命令参数的第二种形式，相对麻烦
    // --open --port 3000 --contentBase src --hot
    open:true,//自动打开浏览器
    port:3000,//设置启动时候的运行端口
    contentBase:'src',//指定托管的根目录
    hot:true//启用热更新的第一步
  },
  plugins:[//配置插件的节点
    new webpack.HotModuleReplacementPlugin(),//启用热更新的第三步，new一个热更新的模块对象
    new htmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
      template:path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定的页面路径去生成内存中的页面
      filename:'index.html'//指定生成页面的名称
    })
  ],
  module:{//这个节点,用于配置所有第三方模块加载器
    rules:[//所有第三方模块的匹配规则
      {test:/\.css$/,use:['style-loader','css-loader']},//配置匹配所有以css结尾的文件,第三方loader规则
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//配置处理.less文件的第三方loader规则
      // {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}//配置处理.scss文件的第三方loader规则
    ]
  }
}