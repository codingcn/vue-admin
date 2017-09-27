export default {
  install(Vue, options) {
    Vue.prototype.$difines = {
      root_url: 'http://localhost/blog/public',
      sex: 'woman'
    }
  }
}
