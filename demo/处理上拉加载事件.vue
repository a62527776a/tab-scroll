<template lang="pug">
  .wrapper
    vue-horizontal-scroll(ref="vue-horizontal-scroll" @scrollEnd="handleHorizontalScrollEnd")
      .header-bar(slot="header")
        .search-bar 写给你爱的人的情书
        .tab-bar(v-if="menus")
          .tab-item(v-for="(value, key, idx) in menus" :class="{'tab-item-active' : idx === currentPageIdx }") {{key}}
      template(v-if="menus")
        vue-vertical-scroll(
          v-for="(value, key, idx) in menus" 
          @pullingUp="pullingUp(key, arguments)"
          :key="idx")
          .content-wrapper(v-if="value.data")
            .movie-card(v-for="(item, idx) in value.data")
              .movie-cover
                // img(:src="item.images.medium")
                // 豆瓣的图片做了防盗链，暂时用一张假的图片
                img(src="https://i.loli.net/2019/03/12/5c87b97a0b2ce.jpg")
              .movie-title {{item.title}}
      template(v-else)
        div loading
</template>

<script>
import axios from 'axios'

export default {
  name: 'douban-demo',
  data () {
    return {
      menus: null,
      // 给mock数据准备一些结构
      mockMenusData: {
        '日剧': {data: null, page: 1},
        '泰剧': {data: null, page: 1},
        '韩剧': {data: null, page: 1},
        '美剧': {data: null, page: 1},
        '英剧': {data: null, page: 1}
      },
      // 作为滚动的下标
      currentPageIdx: 0
    }
  },
  methods: {
    /**
     * @method mockMenus mock菜单数据 为模拟真实环境中从后端获取菜单栏 取800ms延迟
     * @return { Promise }
     */
    mockMenus: function () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.mockMenusData)
        }, 800)
      })
    },
    /**
     * @method handleHorizontalScrollEnd 处理横向的滚动事件
     * @param { Number } pageIdx 横向滚动的页数
     */
    handleHorizontalScrollEnd: function (pageIdx) {
      this.currentPageIdx = pageIdx
      let keyCode = Object.keys(this.menus)[pageIdx]
      // 如果this.menus[keyCode].data存在则说明这一栏已经被加载过了
      if (this.menus[keyCode].data) return
      this.api(keyCode)
    },
    /**
     * @method pullingUp
     * @param { String } key 当前上拉加载数据的类型 为业务层传过来的参数
     * @param { Arguments } _arguments 由当前上拉的vue-vertical-scroll组件传上来的参数 由只包含一个BScroll实例的数组组成
     * 通过_arguments[0] 即可处理上拉加载的操作 下拉刷新同理
     */
    pullingUp: function (key, _arguments) {
      this.api(key, _arguments[0])
    },
    // 获取菜单栏
    initMenus: async function () {
      this.menus = await this.mockMenus()
      this.$nextTick(() => {
        this.$refs['vue-horizontal-scroll'].initBScroll()
      })
      // 菜单栏获取之后开始调用数据
      this.api('日剧')
    },
    /**
     * @method api 从后端获取接口
     * @param { BScroll } BScroll 当前操作的vue-vertical-scroll组件中的BScroll实例
     */
    api: async function (key, BScroll = null) {
      let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:7001' : 'https://dscsdoj.top'
      let result = await axios.get(`${baseUrl}/api/douban?key=${key}&page=${this.menus[key].page}&size=10`)
      // 当请求完毕后，需要手动调用finishPullUp方法 否则BScroll将无法继续上拉加载
      this.menus[key].page++ // 请求成功则增加一页
      if (!this.menus[key].data) this.menus[key].data = []
      this.menus[key].data = this.menus[key].data.concat(result.data.data.subjects)
      if (BScroll) {
        this.$nextTick(() => {
          BScroll.refresh()
          BScroll.finishPullUp()
        })
      }
    }
  },
  created () {
    this.initMenus()
  }
}
</script>

<style lang="less">
.wrapper {
  .header-bar {
    padding: 8px 12px 0 12px;
    .search-bar {
      background: #EEE;
      border-radius: 50px;
      font-size: 12px;
      color: #666;
      padding: 6px 12px;
    }
    .tab-bar {
      display: flex;
      justify-content: space-between;
      margin: 0 -12px;
      border-bottom: 1px solid #EFEFEF;
      .tab-item {
        color: #AAA;
        padding: 6px 0;
        margin: 0 12px;
        font-size: 14px;
        margin-bottom: -1px;
      }
      .tab-item-active {
        color: #666;
        font-weight: bold;
        border-bottom: 2px solid #666;
      }
    }
  }
  .content-wrapper {
    padding: 12px;
    display: flex;
    width: calc(100% - 24px);
    justify-content: space-between;
    flex-wrap: wrap;
    .movie-card {
      width: 49%;
    }
    .movie-cover {
      img {
        border-radius: 5px;
      }
    }
    .movie-title {
      font-size: 14px;
      color: #444;
      margin-bottom: 12px;
      height: 2.4em;
      color: #212121;
    }
  }
}
</style>
