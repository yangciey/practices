import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
//yarn add unplugin-vue-components unplugin-auto-import vite-plugin-style-import unplugin-icons
//yarn add consola
import AutoImport from "unplugin-auto-import/vite";
import IconsResolve from "unplugin-icons/resolver";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, AndDesignVueResolve, ElementPlusResolve } from "vite-plugin-style-import";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //自动引入组件
    Components({
      dts: "./src/components.d.ts",
      extensions: ["vue"],
      dirs: ["src/components/", "src/views/**/components"],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
        ElementPlusResolver(),
        IconsResolve(),
      ],
    }),
    //自动导入样式
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve(), ElementPlusResolve()],
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      dts: "./src/components.d.ts",
    })
  ],
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`
    }
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
