<template>
  <div>
    <div style="height: 10vh;background: green"></div>
    <vue-horizontal-scroll height="90vh" @scrollEnd="scrollEnd">
      <vue-vertical-scroll v-for="(value, key, idx) in rows" ref="vertical-scroll" :key="idx" :class="value.class">
        <div v-if="!value.loaded" style="background: white;text-align: center;height: 40vh;line-height: 20vh">
          loaded
        </div>
        <div v-else v-for="(i, idx) in 20" :key="idx" class="item-block"></div>
      </vue-vertical-scroll>
    </vue-horizontal-scroll>
  </div>
</template>

<script>
export default {
  name: 'demo2',
  data () {
    return {
      rows: {
        0: {
          loaded: false,
          class: 'item-block-red'
        },
        1: {
          loaded: false,
          class: 'item-block-yellow'
        },
        2: {
          loaded: false,
          class: 'item-block-green'
        }
      }
    }
  },
  methods: {
    async scrollEnd (pageIdx) {
      // 首先判断是否是首次加载
      if (!this.rows[pageIdx].loaded) {
        try {
          // 是首次加载就请求数据
          await this.fetchData()
          // do someting...
          // 将请求状态修改过来
          this.rows[pageIdx].loaded = true
          this.$nextTick(() => {
            // 等待dom渲染完毕后将该列的BScroll重新计算
            console.log(this.$refs['vertical-scroll'][pageIdx].BScroll)
            this.$refs['vertical-scroll'][pageIdx].BScroll.refresh()
          })
        } catch (e) {
          this.rows[pageIdx].loaded = true
        }
      }
    },
    fetchData () {
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