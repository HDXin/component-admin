var env = process.env
// var url = window.location.origin
// console.log()
//     //|| "production";//env:development,production,testing
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: '/api',
        production: "/api",
        testing: "",
        static: ""
    },
    imageUrl:{
        development: '/api/service/image/',
        production: "/api/service/image/",
        testing: "/service/image/",
    }, 
};