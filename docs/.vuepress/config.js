module.exports = {
  base: '/',
  title: 'TabScroll',
  head: [
    ['script', {
      src: 'https://unpkg.com/vue@2.6.10/dist/vue.js'
    }],
    ['script', {
      src: 'https://unpkg.com/better-scroll/dist/bscroll.min.js'
    }],
    ['script', {
      src: 'https://unpkg.com/tab-scroll'
    }]
  ],
  dest: 'docs/vuepress/',
  themeConfig: {
    repo: 'a62527776a/tab-scroll',
    repoLabel: 'Github',
    sidebarDepth: 2,
    sidebar: [
      ['/', '介绍']
    ]
  }
}