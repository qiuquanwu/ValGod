// vite.config.js
import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  build:{
    base:"./",
    assetsDir:"asset/"
  }  
}
