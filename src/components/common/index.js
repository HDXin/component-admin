import Images from './Image'
import Vue from 'vue'

Images.install = (Vue) =>{
    Vue.component(Images.name,Images);
}

Vue.use(Images);