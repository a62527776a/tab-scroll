<template>
  <div style="height: 100vh;overflow: hidden">
    <div style="height: 10vh;background: green"></div>
    <vue-horizontal-scroll @scrollEnd="scrollEnd">
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" class="item-block item-block-red"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" class="item-block item-block-yellow"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" class="item-block item-block-green"></div>
      </vue-vertical-scroll>
    </vue-horizontal-scroll>
  </div>
</template>

<script>
export default {
  name: 'demo2',
  methods: {
    scrollEnd (pageIdx, BScroll) {
      console.log(pageIdx, BScroll)
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