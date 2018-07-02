import {qrCodeStreamApi} from '@/api'
(function() {// 生成随机的图片预加载的背景图
    const img = {};
    img.install = (Vue, options = {}) => {
        Vue.directive('img', {
            inserted(el, binding) {
            
                el.style.height = 80+'px'
                el.style.backgroundColor = '#' +color
                el.style.backgroundRepeat = 'none'
                var  imgs = new Image();
                imgs.src = binding.value
                imgs.onload = function () {
                    var data = /api/service/image/download
                    qrCodeStreamApi().then(res=>{
                        data = data +res
                        el.style.backgroundImage = 'url('+binding.value+')'
                    })
                    

                }
            }
        })
    };
    if (typeof exports == 'object') {
        module.exports = img
    } else if (typeof define == 'function' && define.amd) {
        define([], () => img)
    } else if (window.Vue) {
        window.img = img;
        Vue.use(img)
    }
}());

