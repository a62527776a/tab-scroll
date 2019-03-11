<template>
  <div>
    <vue-horizontal-scroll :lock="true">
      <div slot="header" style="height: 20vh;background: green"></div>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" style="border-bottom: 15px solid #EEE;height: 30vh;background: yellow"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" style="border-bottom: 15px solid #EEE;height: 30vh;background: red"></div>
      </vue-vertical-scroll>
      <vue-vertical-scroll>
        <div v-for="(i, idx) in 20" :key="idx" style="border-bottom: 15px solid #EEE;height: 30vh;background: blur"></div>
      </vue-vertical-scroll>
    </vue-horizontal-scroll>
  </div>
</template>

<script>
export default {
  name: 'demo2'
}
</script>