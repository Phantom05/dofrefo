var i18n = require('i18n');

i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'ko','zh','ja'],
    fallbacks: { nl: 'en' }, 

    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/locales',

    defaultLocale: 'en',

    // sets a custom cookie name to parse locale settings from  - defaults to NULL
    cookie: 'lang',

    autoReload: true,
    updateFiles: false, // 잘못된 JSON property 를 사용할 경우, 자동으로 파일을 업데이트 하는데, 개인적으론 불편해서 false 로 설정하여 사용한다.
    queryParameter: 'lang', // query string 으로 lang 이 오면, 해당 값의 언어를 불러온다.
    objectNotation: true, // 중첩된 property 의 값을 가져오기 위해 true 로 설정한다.
    register: global,

    // whether to write new locale information to disk - defaults to true
//    updateFiles: false

});


module.exports = function(req, res, next) {
    i18n.init(req, res);
    // res.local('__',res.__);
    // var current_locale = i18n.getLocale()
    return next();
};