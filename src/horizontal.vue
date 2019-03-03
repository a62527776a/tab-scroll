<template lang="pug">
.vue-horizontal-wrapper(ref="vue-horizontal-wrapper")
  .vue-horizontal(:style="{ 'height' : defaultHeight, 'width': horizontalWidth}" ref="vue-horizontal")
    slot
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'vue-horizontal-scroll',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    height: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      BScroll: null,
      currentIdx: 0,
      defaultHeight: '100vh',
      horizontalWidth: '100vw',
      horizontalScrollDefaultOpt: {
        scrollX: true,
        scrollY: false,
        momentum: false,
        bounce: true,
        eventPassthrough: 'vertical',
        click: false,
        snap: {
          loop: false,
          stepX: 0,
          threshold: 0.2
        }
      }
    }
  },
  methods: {
    /**
     * @method computedHeight 计算高度
     * 用户没有传高度参数时
     * 根据BScroll的offsetTop属性自动判断高度
     * 否则使用用户传的height
     */
    computedHeight: function () {
      if (this.height) return this.defaultHeight = this.height
      let screenHeight = window.screen.height
      let offsetTop = this.BScroll.wrapperOffset.top
      this.defaultHeight = (screenHeight + offsetTop) + 'px'
    },
    /**
     * @method computedWidth 计算容器宽度
     * 根据子容器有多少个来计算容器有多少个
     */
    computedWidth: function () {
      this.horizontalWidth = this.$refs['vue-horizontal'].children.length + '00vw'
      this.$nextTick(() => {
        this.initBScroll()
      })
    },
    goToPage: function (idx) {
      this.BScroll.goToPage(idx, 0)
    },
    initBScroll: function () {
      let opt = Object.assign(this.horizontalScrollDefaultOpt, this.options)
      this.BScroll = new BScroll(this.$refs['vue-horizontal-wrapper'], opt)
      this.BScroll.on('scrollEnd', () => {
        this.currentIdx = this.BScroll.getCurrentPage().pageX
        this.$emit('scrollEnd', this.currentIdx)
      })
      this.computedHeight()
    }
  },
  mounted () {
    this.computedWidth()
  }
}
</script>

<style lang="less" scoped>
  .vue-horizontal-wrapper {
    width: 100%;
    overflow: hidden;
    .vue-horizontal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
