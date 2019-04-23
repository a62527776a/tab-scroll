<p align="center">
  <img src="https://i.loli.net/2019/03/07/5c810fe69e23c.png">
</p>
<br/>
<p align="center">
	<a href="https://www.npmjs.com/package/tab-scroll">
		<img src="https://img.shields.io/npm/dm/tab-scroll.svg" alt="Monthly downloads">
	</a>
	<a href="https://www.npmjs.com/package/tab-scroll">
		<img src="https://img.shields.io/npm/v/tab-scroll.svg" alt="Version">
	</a>
	<img src="https://img.shields.io/badge/min+gzip-5.6_kB-blue.svg" alt="5.6 kB min+gzip">
</p>


# 关于TabScroll
TabScroll是一个基于Vue(2.X)和Better-Scroll的滚动库，主要满足web端的复杂滚动需求

由于依赖Better-Scroll，所以需要对Better-Scroll具有一定的了解。 如果还没有了解过，建议先看看Better-Scroll官方文档。

# 详细教程 / 介绍 

https://www.jianshu.com/p/75e42677a68d

# Example

gif图1demo
https://dscsdoj.top/public/unsplash/index.html#/demo1  

gif图2demo
https://dscsdoj.top/public/unsplash/index.html#/demo2

gif图3demo
https://dscsdoj.top/public/unsplash/index.html#/demo3

所有的gif展示的实例都能在/demo/下的文件中找到源码

![顶部随手势方向状态](https://i.loli.net/2019/03/09/5c83c3df1c52a.gif)![顶部锁定状态](https://i.loli.net/2019/03/11/5c85d04d00c84.gif)
![demo3](https://upload-images.jianshu.io/upload_images/5738345-249e02f573a6760d.gif?imageMogr2/auto-orient/strip)

# 安装 / 使用

##### 安装
TabScroll依赖Better-Scroll，如果您未安装过Better-Scroll，请将Better-Scroll一并安装

```
yarn add better-scroll tab-scroll
```

如果您安装过Better-Scroll，那么请直接安装TabScroll

```
yarn add tab-scroll
```
##### 使用

```
// main.js
import Vue from 'vue'
import App from './App.vue'

import tabScroll from 'tab-scroll'

Vue.use(tabScroll)

new Vue({
  render: h => h(App)
}).$mount('#app')
```
```
// App.vue
<template>
  <div>
    <vue-horizontal-scroll :lock="true" offsetY="15vh">
      <div slot="header" style="height: 20vh;background: green"></div>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" style="border-bottom: 15px solid #EEE;height: 30vh;background: yellow"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" style="border-bottom: 15px solid #EEE;height: 30vh;background: red"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" style="border-bottom: 15px solid #EEE;height: 30vh;background: blur"></div>
      </vue-vertical-scroll>
    </vue-horizontal-scroll>
  </div>
</template>

<script>
export default {
  name: 'demo2'
}
</script>
```

# 文档

## vue-horizontal-scroll

###### Props

| Option |  Type  |  Default  | Params | Description |
| ------ | ------ | --------  | ------ | ----------  |
|options | Object | {}			  | /			 | 默认配置可以通过$refs['vue-horizontal-scroll'].horizontalScrollDefaultOpt查看，默认不开启下拉刷新，传入的options将merge入horizontalScrollDefaultOpt中|
| height | String | (screenHeight - wrapperOffsetTop) + 'px' | / | 默认不传将根据屏幕高度以及BScroll的offsetTop自动计算高度 如果有自定义需求，可以传入px、rem、vh、等单位的字符串 |
|offsetY | String | Number| 0| / | 当传入header后，上下的滚动将分为两层 向下滚动后默认会到下层的顶部 传入offsetY后 向下滚动将展示部分上层界面 实际根据业务具体操作 可以传入rem、px、vh等css单位的字符串 或者是数字，数字将为px为单位
|lock | Boolean| false| / | 决定滚动时上层header的激活状态根据手势方向还是滚动到的Y轴来切换 默认是根据手势方向 true的表现形式为当上拉之后 上下手势不再影响header是否激活 只有滚动到顶部时才会打开header 可以打开右侧demo2来查看区别

###### Methods

|Name | Param | Type | Return | Description|
| ------ | ------ | --------  | ------ | ----------  |
| goToPage| index| Number| / | 传入下标横向滚动至哪一页|
| computedWidth| / | / | / | 计算horizontalScroll宽度，会自动调用，一般情况下无需调用。仅用于tab栏为动态的情况下。比如从后端拉取菜单的情况。请务必包裹进$nextTick。因为它会去读取dom节点 |



##### Event
| Name | Param | Type | Description|
|-----|------|-------|-------------|
|scrollEnd | pageX | Number | 横向滚动停止时会向上触发scrollEnd事件 参数为横向滚动的下标 |
|directionYChange| directionY | Number | -1 表示从上往下滑，1 表示从下往上滑 |

##### Slots

| Name | Description |
| ----| -----|
| header | 传入将会自动变为上下两层的滚动 当向下滚动时默认会滚动到下层的顶部，也就是上层隐藏 需要传入offsetY业务的偏移 |

## vue-vertical-scroll

###### Props

| Option | Type | Default | Description|
| -------| ----| --------| ------------|
| options | Object | {} | 默认配置可以通过$refs['vue-vertical-scroll'].verticalScrollDefaultOpt查看，默认不开启下拉刷新，传入的options将merge入verticalScrollDefaultOpt中|
|pullDownStatusKeyOpt | Object | { '下拉刷新': '下拉刷新...', '释放刷新': '释放刷新...', '正在载入': '正在载入...' } | 开启下拉刷新后将展示这下拉刷新、释放刷新、正在载入三个状态 如果需要修改，务必使用这个结构 比如 { '下拉刷新': '再拉下试试~', '释放刷新': '松开瞧瞧~~', '正在载入': '马上就好！'...' } |


##### Event
| Name | Param | Type | Description|
|-----|------|-------|-------------|
|pullDownStatusChange	 | '正在载入' / '下拉刷新' / '释放刷新' | String | 下拉刷新的时候 会触发pullDownStatusChange事件 上层如果需要自定义下拉刷新的样式，可以根据该事件 传递的参数来判断展示状态 |
| pullingUp | BScroll实例 | / | 上拉加载 同Better-Scroll上拉加载 |
| pullingDown | BScroll实例 | / | 下拉刷新 同Better-Scroll下拉刷新 |
| inited | / | / | BScroll初始化事件，当初始化完成时会触发 |
|scrollEnd|/ | / | BScroll滚动结束时触发 |
| scroll | BScroll.y | Number | BScroll滚动时触发 会返回BScroll的Y轴坐标 |

###### Methods

|Name | Param | Type | Return | Description|
|-----|-----|-----|-----|-----|
| autoPullDownRefresh | / | / | / | 用于自动触发下拉刷新，包含自动滚动到-100PX位置以及一个触发下拉刷新的函数 |

###### Props

| name | Type | Default | Description|
| -------| ----| --------| ------------|
| options	 | Object | {} |  默认配置可以通过$refs['vue-vertical-scroll'].verticalScrollDefaultOpt查看，默认不开启下拉刷新，传入的options将merge入verticalScrollDefaultOpt中 |
|pullDownStatusKeyOpt	| Object | { '下拉刷新': '下拉刷新...', '释放刷新': '释放刷新...', '正在载入': '正在载入...' } | 开启下拉刷新后将展示这下拉刷新、释放刷新、正在载入三个状态 如果需要修改，务必使用这个结构 比如 { '下拉刷新': '再拉下试试~', '释放刷新': '松开瞧瞧~~', '正在载入': '马上就好！'...' }


# 文档地址
https://dscsdoj.top/public/tabscroll/index.html 
