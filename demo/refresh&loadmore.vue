<template>
  <div>
    <div style="height: 10vh;background: green"></div>
    <vue-horizontal-scroll height="90vh" @scrollEnd="scrollEnd">
      <vue-vertical-scroll 
        :options="verticalOpt" 
        v-for="(value, key, idx) in rows" 
        ref="vertical-scroll" 
        :key="idx" 
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
        :class="value.class">
        <div v-if="!value.loaded" style="background: white;text-align: center;height: 40vh;line-height: 20vh">
          loaded
        </div>
        <div v-else v-for="(i, idx) in value.data" :key="idx" class="item-block"></div>
      </vue-vertical-scroll>
    </vue-horizontal-scroll>
  </div>
</template>

<script>
export default {
  name: 'demo2',
  data () {
    return {
      verticalOpt: {
        pullDownRefresh: true,
        pullUpLoad: true
      },
      currentIdx: 0,
      rows: {
        0: {
          loaded: false,
          class: 'item-block-red',
          data: [],
          page: 1
        },
        1: {
          loaded: false,
          class: 'item-block-yellow',
          data: [],
          page: 1
        },
        2: {
          loaded: false,
          class: 'item-block-green',
          data: [],
          page: 1
        }
      }
    }
  },
  methods: {
    async pullingUp () {
      this.fetchData('PullUp')
    },
    async pullingDown () {
      this.fetchData('pullingDown')
    },
    handlePullUp () {
      this.rows[this.currentIdx].data = this.rows[this.currentIdx].data.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      this.rows[this.currentIdx].page++
      this.$nextTick(() => {
        // 等待dom渲染完毕后将该列的BScroll重新计算
        this.$refs['vertical-scroll'][this.currentIdx].BScroll.finishPullUp()
        this.$refs['vertical-scroll'][this.currentIdx].BScroll.refresh()
      })
    },
    handlePullDown () {
      this.rows[this.currentIdx].data = this.rows[this.currentIdx].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.rows[this.currentIdx].page = 1
      this.$nextTick(() => {
        // 等待dom渲染完毕后将该列的BScroll重新计算
        this.$refs['vertical-scroll'][this.currentIdx].BScroll.finishPullDown()
        this.$refs['vertical-scroll'][this.currentIdx].BScroll.refresh()
      })
    },
    async fetchData (type) {
      try {
        // 是首次加载就请求数据
        await this.request()
        this.rows[this.currentIdx].loaded = true
        if (type === 'PullUp') {
          this.handlePullUp()
        } else {
          this.handlePullDown()
        }
      } catch (e) {
        this.rows[this.currentIdx].loaded = true
      }
    },
    async scrollEnd (pageIdx) {
      this.currentIdx = pageIdx
      // 首先判断是否是首次加载
      if (!this.rows[pageIdx].loaded) {
        this.fetchData('PullUp')
      }
    },
    request () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    }
  },
  mounted () {
    this.scrollEnd(0)
  }
}
</script>

<style>
.item-block {
  border-bottom: 15px solid #EEE;
  height: 30vh;
}
.item-block-green {
  background: green
}
.item-block-red {
  background: red
}
.item-block-yellow {
  background: yellow
}
</style>