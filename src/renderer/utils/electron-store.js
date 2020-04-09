// import { exePath } from '@/utils'
// const Store = require('electron-store')

// export default new Store({
//   cwd: exePath('config')// 设置配置文件程序根目录位置
// })
const Store = {
  get(key) {
    localStorage.getItem(key)
  },
  set(key, value) {
    localStorage.setItem(key, value)
  },
  delete(key) {
    localStorage.removeItem(key)
  }
}
export default Store
