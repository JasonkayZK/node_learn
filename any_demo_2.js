let startTime = +new Date();
let importUnpkg = import('https://unpkg.com/vue@3.0.11/dist/vue.runtime.esm-browser.js');
let importJsdelivr = import('https://cdn.jsdelivr.net/npm/vue@3.0.11/dist/vue.runtime.esm-browser.js');
Promise.any([importUnpkg, importJsdelivr]).then(vue => {
    console.log('加载完毕，时间是：' + (+new Date() - startTime) + 'ms');
    console.log(vue.version);
});
