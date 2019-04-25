<template lang="pug">
  .vue-vertical-wrapper(ref="vue-vertical-wrapper")
    .vue-vertical
      .refresh-status-bar(v-if="options.pullDownRefresh" :style="{ 'top' : refreshStatusBarY }")
        slot(name="refresh-status-bar") {{pullDownStatus}}
      slot
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'vue-vertical-scroll',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pullDownStatusKeyOpt: {
      type: Object,
      default: () => {
        return {
          '下拉刷新': '下拉刷新...',
          '释放刷新': '释放刷新...',
          '正在载入': '正在载入...'
        }
      }
    },
    refreshStatusBarY: {
      type: String,
      default: '-12px'
    }
  },
  data () {
    return {
      BScroll: null,
      verticalScrollDefaultOpt: {
        click: false,
        scrollY: true,
        bounce: true,
        eventPassthrough: 'horizontal',
        probeType: 3,
        pullUpLoad: 50
      },
      pullDownStatus: this.pullDownStatusKeyOpt['下拉刷新']
    }
  },
  methods: {
    autoPullDownRefresh: function () {
      let threshold = 0
      try {
        threshold = this.options.pullDownRefresh.threshold || 50
      } catch (e) {
        threshold = 50
      }
      this.BScroll.scrollTo(0, threshold, 300)
      setTimeout(() => {
        this.BScroll.autoPullDownRefresh()
      }, 300)
    },
    initBScroll: function () {
      let opt = Object.assign(this.verticalScrollDefaultOpt, this.options)
      this.BScroll = new BScroll(this.$refs['vue-vertical-wrapper'], opt)
      let scrollBoundle = this.BScroll.options.pullDownRefresh.stop
      this.BScroll.on('scroll', () => {
        if (this.BScroll.y === scrollBoundle) {
          this.pullDownStatus = this.pullDownStatusKeyOpt['正在载入']
          this.$emit('pullDownStatusChange', '正在载入')
        }
        if (this.BScroll.y < scrollBoundle) {
          this.pullDownStatus = this.pullDownStatusKeyOpt['下拉刷新']
          this.$emit('pullDownStatusChange', '下拉刷新')
        }
        if (this.BScroll.y > scrollBoundle) {
          this.pullDownStatus = this.pullDownStatusKeyOpt['释放刷新']
          this.$emit('pullDownStatusChange', '释放刷新')
        }
        this.$emit('scroll', this.BScroll.y)
      })
      this.BScroll.on('pullingUp', () => {
        this.$emit('pullingUp', this.BScroll)
      })
      this.BScroll.on('scrollEnd', () => {
        this.$emit('scrollEnd')
      })
      this.BScroll.on('pullingDown', () => {
        this.$emit('pullingDown', this.BScroll)
      })
      this.$nextTick(() => {
        this.$emit('inited')
      })
    }
  },
  mounted () {
    this.initBScroll()
  },
}
</script>

<style lang="less" scoped>
  .vue-vertical-wrapper {
    width: 100vw;
    position: relative;
    height: 100%;
    .vue-vertical {
      min-height: calc(100% + 1px)
    }
    .refresh-status-bar {
      position: absolute;
      width: 100%;
      color: #7e8c8d;
      text-align: center;
      top: -12px;
    }
  }

</style>