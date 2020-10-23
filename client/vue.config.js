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
                additionalData: `
                    @import "@/sass/_variables.scss"; 
                    @import "@/sass/_mixins.scss"; 
                    @import "@/sass/_keyframes.scss";
                `,
            },
        },
    },
};
