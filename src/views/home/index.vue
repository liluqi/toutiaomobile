<template>
  <div class="container">
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <article-list :channel_id="item.id"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" @click="show=true">
      <!-- 放入图标 vant图标 -->
      <van-icon name="wap-nav"></van-icon>
    </span>
    <van-action-sheet v-model="show" title="编辑频道" :round="false">
      <channel-edit @selectIndex="selectIndex" :active="active" :channels="channels"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { Channels } from '@/api/channels'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'home',
  components: {
    'article-list': ArticleList,
    'channel-edit': ChannelEdit
  },
  data () {
    return {
      show: false,
      channels: [],
      active: 0
    }
  },
  methods: {
    async getChannels () {
      const result = await Channels()
      console.log(result)
      this.channels = result.channels
    },
    selectIndex (index) {
      this.active = index
      this.show = false
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
