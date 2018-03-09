const path = require("path");

module.exports = {
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname, 'output_file'),
        filename: 'jsTools.js',
        library: 'jsTools'
    }
}