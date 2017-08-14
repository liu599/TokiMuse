<template>
  <div class="search-box">
    <i class="anticon icon-search1"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" />
    <i @click="clear" v-show="query" class="anticon icon-closecircleo"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      // 为什么要用这个回调的方式?
//      this.$watch('query', (newQuery) => {
//        this.$emit('query', newQuery)
//      })
      // debounce 节流
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    border-radius: 6px
    .icon-search1
      font-size: 24px
      color: $color-primary
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      color: $color-content
      background: #eee;
      font-size: $font-size-medium
      &::placeholder
        color: $color-font-disabled
    .icon-closecircleo
      font-size: 16px
      color: $color-primary
</style>
