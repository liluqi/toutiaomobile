<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search placeholder="请输入搜索关键词" shape="round" v-model.trim="q" @search="onSearch" />
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search" v-for="(item,index) in suggestionList" :key="index" @click="toResult(item)">{{item}}</van-cell>
    </van-cell-group>
    <div class="history-box" v-else>
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <van-icon @click="clearHistory" name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in historyList" :key="index" @click="toResult(item)">
          <a class="word_btn">{{item}}</a>
          <van-icon
            @click.stop="delHistory(index)"
            class="close_btn"
            slot="right-icon"
            name="cross"
          />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/history/suggestion'
const history = 'hm-toutiaomobile-heistory'

export default {
  name: 'search',
  data () {
    return {
      q: '',
      historyList: JSON.parse(localStorage.getItem(history) || '[]'),
      suggestionList: [],
      timer: null
    }
  },
  methods: {
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(history, JSON.stringify(this.historyList))
    },
    // 点击去到搜索结果页面,和点击联想数据跳到结果页函数合并为一个
    // toSearchResult (text) {
    //   this.$router.push('/search/result?q=' + text)
    // },
    async clearHistory () {
      try {
        await this.$dialog.confirm({
          message: '确认清空所有历史记录吗?'
        })
        // 点击确认,清空所有
        this.historyList = []
        localStorage.setItem(history, '[]')
      } catch (error) {

      }
    },
    onSearch () {
      if (!this.q) return
      this.historyList.unshift(this.q)
      this.historyList = Array.from(new Set(this.historyList))
      localStorage.setItem(history, JSON.stringify(this.historyList))
      this.$router.push('/search/result?q=' + this.q)
    },
    toResult (text) {
      this.historyList.unshift(text)
      this.historyList = Array.from(new Set(this.historyList))
      localStorage.setItem(history, JSON.stringify(this.historyList))
      this.$router.push('/search/result?q=' + text)
    }
  },
  created () {
  },
  watch: {
    q () {
      // 当输入框内容也就是q发生改变时,触发该函数
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.q) {
            this.suggestionList = []
            return
          }
          const data = await getSuggestion({ q: this.q })
          this.suggestionList = data.options
        }, 300)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head {
    line-height: 36px;
    color: #999;
    .van-icon {
      font-size: 16px;
      float: right;
      margin-top: 10px;
    }
  }
  .van-cell {
    padding: 10px 0;
  }
  .word_btn {
    color: #3296fa;
  }
  .close_btn {
    margin-top: 5px;
    color: #999;
  }
}
.suggest-box {
  /deep/ .van-cell {
    padding: 10px 20px;
    color: #999;
    p {
      span {
        color: red;
      }
    }
  }
}
</style>
