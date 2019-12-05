/*
 * @Description: In User Settings Edit
 * @Author: Tracy Fan
 * @Date: 2019-08-13 15:48:24
 * @LastEditTime: 2019-08-15 16:12:05
 * @LastEditors: Please set LastEditors
 */
module.exports = {
    devServer: {
        proxy: {
            '/myapi': {
                target: 'http://49.234.97.85:3000',
                pathRewrite: { '^/myapi': '' }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/style/main.scss";`
            },
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        unitToConvert: 'px',
                        viewportWidth: 750,
                        viewportHeight: 1334,
                        unitPrecision: 3,
                        propList: [
                            '*'
                        ],
                        viewportUnit: 'vw',
                        fontViewportUnit: 'vw',
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/
                    }),
                    require('postcss-import')({}),
                    require('postcss-url')({}),
                    require('postcss-cssnext')({}),
                    require('postcss-viewport-units')({}),
                    require('cssnano')({
                        preset: ['advanced', {
                            autoprefixer: false,
                            zindex: false,
                            reduceIdents: false
                        }]
                    })
                ]
            }
        }
    }
};
