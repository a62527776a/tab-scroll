<template lang="pug">
  .wrapper
    .header-bar
      .search-bar 写给你爱的人的情书
      .tab-bar(v-if="menus !== 0")
        .tab-item(v-for="item in menus") {{item}}
</template>

<script>
import axios from 'axios'

export default {
  name: 'douban-demo',
  data () {
    return {
      menus: [],
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
          resolve(['日剧', '泰剧', '韩剧', '美剧', '英剧'])
        }, 800)
      })
    },
    // 获取菜单栏
    initMenus: async function () {
      console.log(this)
      this.menus = await this.mockMenus()
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
        padding: 6px 12px;
        font-size: 14px;
      }
    }
  }
}
</style>
