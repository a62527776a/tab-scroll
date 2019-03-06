<template lang="pug">
  .wrapper
    .mobile-wrapper
      .tab-wrapper
        .tab-item(
          v-for="(value, key, idx) in tabs"
          :class="{'tab-item-active' : currentTab === key}"
          @click="clickTabItem(key, idx)") {{key}}
      vue-horizontal-scroll(
        @scrollEnd="horizontalScroll"
        ref="vue-horizontal-scroll"
        :height="screenHeight"
      )
        vue-vertical-scroll
        vue-vertical-scroll(
          :verticalScrollOpt="{pullDownRefresh: true}"
          @pullingUp="pullingUp(key)"
          @pullingDown="pullingDown(key)"
          @pullDownStatusChange="computedPullDownStatus(value, arguments)"
          :ref="'vertical-scroll-' + key"
          v-for="(value, key, idx) in tabs"
          :key="key")
          div(slot="refresh-status-bar") {{value.pullDownStatus}}
          .content-wrapper
            .load-mask(v-if="!value.data") 加载中 请稍后...
            .content-wrapper-list(v-else)
              img(
                :src="img.urls.thumb"
                :key="idx"
                @load="refreshWrapper(key)"
                v-for="(img, idx) in value.data"
                v-if="idx % 2 === 1")
            .content-wrapper-list(v-if="value.data")
              img(
                :src="img.urls.thumb" 
                :key="idx"
                @load="refreshWrapper(key)"
                v-for="(img, idx) in value.data" 
                v-if="idx % 2 === 0")
          .load-more(v-if="value.data") {{tabs[key].isEnd ? '没有了...' : '加载中...'}}
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      tabs: {
        'Nature': {
          data: null,
          page: 1,
          isEnd: false,
          pullDownStatus: '下拉刷新'
        }, 
        'Beauty': {
          data: null,
          page: 1,
          isEnd: false,
          pullDownStatus: '下拉刷新'
        }, 
        'Sports': {
          data: null,
          page: 1,
          isEnd: false,
          pullDownStatus: '下拉刷新'
        }
      },
      currentTab: 'Nature',
      screenHeight: (667 - 63) + 'px'
    }
  },
  methods: {
    // 横向的滚动 滚动后更改聚焦的tab
    horizontalScroll: function (e) {
      this.currentTab = Object.keys(this.tabs)[e]
      this.findDataBy(Object.keys(this.tabs)[e])
    },
    clickTabItem: function (key, idx) {
      this.currentTab = key
      this.$refs['vue-horizontal-scroll'].goToPage(idx)
    },
    findDataBy: async function (node_name, isRefresh = false) {
      try {
        if (isRefresh) this.tabs[node_name].page = 1
        let result = await axios.get(`https://dscsdoj.top/api/source/unsplash?size=12&type=${node_name}&page=${this.tabs[node_name].page}`)
        this.tabs[node_name].page++
        if (!this.tabs[node_name].data || isRefresh) this.tabs[node_name].data = []
        this.tabs[node_name].data = this.tabs[node_name].data.concat(result.data.data.results)
        this.$nextTick(() => {
          if (isRefresh) {
            this.$refs['vertical-scroll-' + node_name][0].BScroll.finishPullDown()
            this.$refs['vertical-scroll-' + node_name][0].BScroll.refresh()
          } else {
            this.$refs['vertical-scroll-' + node_name][0].BScroll.refresh()
            this.$refs['vertical-scroll-' + node_name][0].BScroll.finishPullUp()
          }
        })
      } catch (e) {
        if (isRefresh) {
          this.$refs['vertical-scroll-' + node_name][0].BScroll.finishPullDown()
          this.$refs['vertical-scroll-' + node_name][0].BScroll.refresh()
        } else {
          this.$refs['vertical-scroll-' + node_name][0].BScroll.refresh()
          this.$refs['vertical-scroll-' + node_name][0].BScroll.finishPullUp()
        }
      }
    },
    pullingDown: async function (key) {
      this.findDataBy(key, true)
    },
    pullingUp: async function (key) {
      this.findDataBy(key)
    },
    refreshWrapper: function (key) {
      this.$refs['vertical-scroll-' + key][0].BScroll.refresh()
    },
    lockBody: function (e) {
      e.preventDefault();
    },
    computedPullDownStatus: function (item, argumens) {
      item.pullDownStatus = argumens[0]
    }
  },
  mounted () {
    this.findDataBy('Nature')
  },
  created () {
    document.body.addEventListener('touchmove', this.lockBody, {passive: false})
  },
  activated () {
    document.body.addEventListener('touchmove', this.lockBody, {passive: false})
  },
  deactivated () {
    document.body.removeEventListener('touchmove', this.lockBody)
  },
  destroyed () {
    document.body.removeEventListener('touchmove', this.lockBody)
  },
}
</script>

<style lang="less">
body {
  margin: 0;
  .tab-wrapper {
    padding: 5px;
    border-bottom: 1px solid #e2e2e2;
    .tab-item {
      display: inline-block;
      font-size: 13px;
      line-height: 16px;
      padding: 5px 6px 5px 6px;
      margin-right: 5px;
      border-radius: 3px;
      color: #555;
    }
    .tab-item-active {
      color: #fff;
      background-color: #334;
    }
  }
  .content-wrapper {
    padding: 5px 11px;
    display: flex;
    justify-content: space-between;
    .load-mask {
      margin-top: 30vh;
      width: 100vw;
      justify-content: center;
      align-items: center;
      display: flex;
      color: #7e8c8d;
    }
    .content-wrapper-list {
      width: 49.5%;
    }
    img {
      width: 100%;
      break-inside: avoid;
      box-sizing: border-box;
      background: #EEE;
      user-select: none;
    }
  }
  .load-more {
    text-align: center;
    padding: 6px 0;
    color: #7e8c8d;
  }
}
</style>