// vite.config.js
module.exports = {
    proxy: {
      // string shorthand
      // with options
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    build:{
      assetsDir:"./"
    }  
  }