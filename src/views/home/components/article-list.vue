<template>
  <div class="scroll-wrapper">
      <!-- 当van-list距离底部超过一定距离,会自动开启upload为true; 当组件滚动到底部时，会触发load事件并将loading设置成true -->
      <van-list v-model="upload" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell title="标题" value="内容" :key="item" v-for="item in 20"></van-cell>
      </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upload: false,
      finished: false
    }
  },
  methods: {
    onLoad () {}
  }
}
</script>

<style>
</style>
