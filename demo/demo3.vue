<template lang="pug">
  .wrapper
    .header-bar
      .search-bar 写给你爱的人的情书
      .tab-bar(v-if="menus")
        .tab-item(v-for="(value, key, idx) in menus" :class="{'tab-item-active' : idx === currentPageIdx }") {{key}}
    .content-wrapper(v-if="menus")
      .movie-card(v-for="(item, idx) in menus['日剧'].data")
        .movie-cover
          // img(:src="item.images.medium")
          img(src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2162780600.jpg")
        .movie-title {{item.title}}
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
        '日剧': {data: null},
        '泰剧': {data: null},
        '韩剧': {data: null},
        '美剧': {data: null},
        '英剧': {data: null}
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
    // 获取菜单栏
    initMenus: async function () {
      this.menus = await this.mockMenus()
      // 菜单栏获取之后开始调用数据
      this.api('日剧', 1)
    },
    /**
     * @method api 从后端获取接口
     */
    api: async function (key, page) {
      let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:7001' : 'https://dscsdoj.top'
      let result = await axios.get(`${baseUrl}/api/douban?key=${key}&page=${page}&size=18`)
      if (!this.menus[key].data) this.menus[key].data = []
      this.menus[key].data = this.menus[key].data.concat(result.data.data.subjects)
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
    justify-content: space-between;
    flex-wrap: wrap;
    .movie-card {
      width: 33%;
    }
    .movie-cover {
      border-radius: 2px;
      overflow: hidden;
    }
    .movie-title {
      font-size: 12px;
      color: #444;
      margin-bottom: 12px;
    }
  }
}
</style>
