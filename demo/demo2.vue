<template>
  <div>
    <vue-horizontal-scroll offsetY="10vh" free>
      <div slot="header" style="height: 40vh;background: green"></div>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" @click="alertConf" :key="idx" class="item-block item-block-red"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" @click="alertConf" :key="idx" class="item-block item-block-yellow"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" @click="alertConf" :key="idx" class="item-block item-block-green"></div>
      </vue-vertical-scroll>
    </vue-horizontal-scroll>
  </div>
</template>

<script>
export default {
  name: 'demo2',
  methods: {
    alertConf: function () {
      window.alert('我想滚动停止时才触发弹窗')
    }
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