const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': { target: 'http://localhost:3000/' },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/sass/app.scss";`,
            },
        },
    },
};
