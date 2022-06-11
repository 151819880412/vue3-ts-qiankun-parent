// https://vuex.vuejs.org/en/modules.html

const files = require.context('.', true, /\.ts$/)
const modules: any = {}

files.keys().forEach((key) => {
  if (key === './index.ts') return
  const path = key.replace(/(\.\/|\.ts)/g, '')
  const [namespace, imported] = path.split('/')
  if (!modules[namespace]) {
    modules[namespace] = {
      namespaced: false
    }
  }
  modules[namespace][imported] = files(key)[imported]
})


export default modules
