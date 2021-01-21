// vite.config.js
import vue from '@vitejs/plugin-vue'
//按需加载
import styleImport from 'vite-plugin-style-import';
/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue(), styleImport({
    libs: [{
      libraryName: 'ant-design-vue',
      esModule: true,
      resolveStyle: (name) => {
        return `ant-design-vue/es/${name}/style/css`;
      },
    }]
  })],
  build: {
    base: "./",
    assetsDir: "asset/"
  }
}