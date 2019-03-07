<template lang="pug">
.vue-main-scroll-wrapper(ref="wrapper-scroll" :class="{ 'has-header-wrapper' : $slots.header }")
  .vue-main-scroll
    slot(name="header")
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
    },
    offsetY: {
      type: String || Number,
      default: '0'
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
      },
      wrapperScroll: null
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
      // 如果有header的slot 那个下高度为屏幕高度 如果有自定义offsetY 则增加自定义的offsetY
      if (this.$slots.header) {
        // 如果为数字 则直接使用
        if (typeof this.offsetY === 'number') {
          this.defaultHeight = window.screen.height + this.BScroll.wrapperOffset.top + this.offsetY
        } else {
          // 如果为字符串 则使用运算函数
          this.defaultHeight = `calc(100vh + ${this.BScroll.wrapperOffset.top}px + ${this.offsetY})`
        }
        return
      }
      let screenHeight = window.screen.height
      // 如果没有header 则高度为屏幕高度减去上放留空的
      let offsetTop = this.BScroll.wrapperOffset.top
      this.defaultHeight = (screenHeight + offsetTop) + 'px'
    },
    /**
     * @method computedWidth 计算容器宽度
     * 根据子容器有多少个来计算容器有多少个
     */
    computedWidth: function () {
      this.horizontalWidth = this.$refs['vue-horizontal'].children.length + '00vw'
    },
    goToPage: function (idx) {
      this.BScroll.goToPage(idx, 0)
    },
    initWrapperScroll: function () {
      this.wrapperScroll = new BScroll(this.$refs['wrapper-scroll'], {
        click: false,
        scrollY: true,
        bounce: false,
        probeType: 3,
        eventPassthrough: 'horizontal'
      })
      this.$nextTick(() => {
        this.wrapperScroll.disable()
      })
    },
    initBScroll: function () {
      // 当只有一个竖向scroll时才能滚动
      if (this.$slots.default.length > 1) {
        let opt = Object.assign(this.horizontalScrollDefaultOpt, this.options)
        this.BScroll = new BScroll(this.$refs['vue-horizontal-wrapper'], opt)
        this.BScroll.on('scrollEnd', () => {
          this.currentIdx = this.BScroll.getCurrentPage().pageX
          this.$emit('scrollEnd', this.currentIdx)
        })
      }
      this.computedHeight()
      if (this.$slots.header) this.initWrapperScroll()
      this.listenMovingDirectionY()
      this.$nextTick(() => {
        this.BScroll.refresh()
      })
    },
    listenMovingDirectionY: function () {
      if (this.$slots.header) {
        this.$slots.default.map(vm => {
          vm.componentInstance.BScroll.on('scroll', () => {
            if (vm.componentInstance.BScroll.movingDirectionY === 1) {
              this.wrapperScroll.scrollTo(0, this.wrapperScroll.maxScrollY, 300, 'ease')
              this.$emit('directionYChange', 1)
            } else {
              this.wrapperScroll.scrollTo(0, 0, 300, 'ease')
              this.$emit('directionYChange', -1)
            }
          })
        })
      }
    }
  },
  mounted () {
    this.computedWidth()
    this.initBScroll()
  }
}
</script>

<style lang="less" scoped>
  .has-header-wrapper {
    height: 100vh;
    overflow: hidden;
  }
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
