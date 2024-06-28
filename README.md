# React项目开发模板工程


## 技术栈

[Vite^5.2.0](https://cn.vitejs.dev/)

[react^18.2.0](https://react.dev/)

[react-router^6.24.0](https://react.dev/)

[tailwindcss^3.4.4](https://tailwindcss.com/docs)


> 使用[volta](https://docs.volta.sh/guide/getting-started)管理Node.js版本
> 统一node.js版本为: 18.20.3


### 使用pnpm安装依赖

```bash
// 安装pnpm
volta install pnpm

// 安装依赖
pnpm i

// 启动本地服务
pnpm dev

// 打包
pnpm build
```

### 目录介绍
```bash
src
  components // 项目公共组件
  pages // 所有的页面
  hooks // hooks 类工具方法
  utils.js // 普通工具方法
  api.js // 公告请求
  router.js // 路由配置
```