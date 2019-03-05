<template lang="pug">
  .vue-vertical-wrapper(ref="vue-vertical-wrapper")
    .vue-vertical
      .refresh-status-bar(v-if="verticalScrollOpt.pullDownRefresh")
        slot(name="refresh-status-bar") {{pullDownStatus}}
      slot
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'vue-vertical-scroll',
  props: {
    verticalScrollOpt: {
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
    }
  },
  data () {
    return {
      BScroll: null,
      verticalScrollDefaultOpt: {
        click: true,
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
    initBScroll: function () {
      let opt = Object.assign(this.verticalScrollDefaultOpt, this.verticalScrollOpt)
      this.BScroll = new BScroll(this.$refs['vue-vertical-wrapper'], opt)
      this.BScroll.on('scroll', () => {
        if (this.BScroll.y === 40) {
          this.pullDownStatus = this.pullDownStatusKeyOpt['正在载入']
          this.$emit('pullDownStatusChange', '正在载入')
        }
        if (this.BScroll.y < 40) {
          this.pullDownStatus = this.pullDownStatusKeyOpt['下拉刷新']
          this.$emit('pullDownStatusChange', '下拉刷新')
        }
        if (this.BScroll.y > 40) {
          this.pullDownStatus = this.pullDownStatusKeyOpt['释放刷新']
          this.$emit('pullDownStatusChange', '释放刷新')
        }
      })
      this.BScroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
      this.BScroll.on('pullingDown', () => {
        this.$emit('pullingDown')
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
    height: 100%
  }
    .vue-vertical {
      min-height: calc(100% + 1px)
    }
    .refresh-status-bar {
      position: absolute;
      width: 100%;
      color: #7e8c8d;
      text-align: center;
      top: -30px;
    }
</style>