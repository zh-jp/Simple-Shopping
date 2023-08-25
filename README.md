# Simple-Shopping
基于Vue2的移动端商城前端页面

## 后端数据接口
该项目仅作为`Vue2`实战练习，后端数据由黑马教程提供：
- 接口URL：http://cba.itlike.com/public/index.php?s=/api/
- 接口文档链接：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/doc-2221080
 
开发实测发现部分接口实际返回相应与接口文档不同，[详见此处](./error_in_document.md)。

可根据教程视频修改调整，[视频链接](https://www.bilibili.com/video/BV1HV4y1a7n4)。

## 实现功能
首页、搜索、商品列表、商品详情、注册登录

订单结算、购物车添加管理、提交支付、订单查询、订单收货、订单评价

## 学习点
- 熟悉电商购物的业务流程
- 使用适用于移动端的vant组件库
- 移动端vw适配
- `request` `storage` `api`相关方法的封装
- 请求响应拦截器
- 嵌套路由配置、路由导航、路由跳转传参
- vuex分模块管理数据
- 项目打包、优化

## 项目创建
```bash
Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Less
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
```