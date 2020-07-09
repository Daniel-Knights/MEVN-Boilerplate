const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../server/public"),
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/sass/app.scss";`
            }
        }
    }
};
