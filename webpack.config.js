const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js', // 入口文件
	output: {
		path: path.resolve(__dirname, 'dist'), // 输出目录
		filename: 'bundle.js' // 输出文件名
	},
	// 其他配置选项
	//....
};