module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': __dirname
            }
        },
        entry: {
            app: './src/main.js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/src/assets/scss/abstract/mixins.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://litty.ezhost.pl',
                changeOrigin: true
            }
        },
        disableHostCheck: true
    }
};
