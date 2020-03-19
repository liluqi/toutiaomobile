<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 刷新谁,就嵌套谁 -->
    <van-pull-refresh v-model="download" success-text="刷新成功" @refresh="onRefresh">
      <!-- 当van-list距离底部超过一定距离,会自动开启upload为true; 当组件滚动到底部时，会触发load事件并将loading设置成true -->
      <van-list v-model="upload" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell :value="item" :key="item" v-for="item in article">
          <div class="article_item">
            <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
            <!-- 三图 -->
            <div class="img_box">
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <!-- 单图 -->
            <!-- <div class="img_box">
              <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div> -->
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      download: false,
      upload: false,
      finished: false,
      article: [] // 用于存放新闻信息
    }
  },
  methods: {
    onLoad () {
      // 当他没有内容的时候,加载一秒钟,然后设置加载完毕
      //   setTimeout(() => {
      //     this.finished = true
      //   }, 1000)
      // 当他有内容的时候
      setTimeout(() => {
        if (this.article.length > 50) {
          this.finished = true
        } else {
          // 定义一个假的数据,每次执行onLoad函数都添加十条数据到article数组中
          const arr = Array.from(
            Array(10),
            (value, index) => this.article.length + index + 1
          )
          this.article.push(...arr)
          this.upload = false
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        const arr = Array.from(
          Array(3),
          (value, index) => '追加' + (index + 1)
        )
        this.article.unshift(...arr)
        this.download = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
