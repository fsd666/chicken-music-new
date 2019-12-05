/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 10:44:46
 * @LastEditTime: 2019-08-15 11:30:29
 * @LastEditors: Please set LastEditors
 */
module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
};