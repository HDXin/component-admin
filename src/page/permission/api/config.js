var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: '/api/',
        production: "/api/",
        testing: "",
        static: ""
    },
    imageUrl:{
        development: '/oss/aliyun/upload/',
        production: "/oss/aliyun/upload/",
        testing: "/oss/aliyun/upload/",
    },
    printUrl: 'http://print.jumax.dev.sudaotech.com/#/'
};