<template>
  <div class="t-header">
    <router-link to="/user" class="icon" tag="div" ref="usr">
      <i class="anticon icon-user"></i>
    </router-link>
    <div class="search" ref="search">
      <input class="search-input"
             name="search-input"
             ref="query"
             v-model="query"
             :placeholder="placeholder"
             @click="changeView"
             @query="onQueryChange"/>
      <i @click="clear" v-show="query" class="anticon icon-closecircleo"></i>
      <i class="anticon icon-USB" @click="setQueryString(query)"></i>
    </div>
    <div class="playing"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'
  import {searchMixin} from 'common/js/mixin'
  import {mapMutations, mapGetters} from 'vuex';
  export default {
    mixins: [searchMixin],
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    computed: {
      ...mapGetters([
        'queryString'
      ])
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      changeView() {
        this.$refs.usr.$el.style.display = 'none'
        this.$refs.search.style.left = '-30px'
        this.$refs.search.style.width = '80%'
        this.$emit('changeView')
      },
      clear() {
        this.query = ''
        this.setQueryString('')
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      },
      ...mapMutations({
        setQueryString: 'SET_QUERY_STRING'
      })
    },
    created() {
      // debounce 节流
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .t-header
    position: relative
    height: 42px
    font-size: 0
    color: $color-font-head
    background: $color-primary
    display: box
    display: -webkit-box
    display: -moz-box
    -webkit-box-orient: horizontal
    -moz-box-orient: horizontal
    box-orient: horizontal
    .icon
      display: inline-block
      width: 30px
      height: 30px
      margin: 6px 18px;
      font-size: 30px
      line-height: 30px
      text-align: center
      vertical-align: middle
      //background: url('~components/t-header/logo_thumb.jpg')
      box-flex: 1.0
      -webkit-box-flex: 1.0
      -moz-box-flex: 1.0
    .search
      text-align: left
      font-size: ($font-size-medium)px
      height: 42px
      width: 40%
      margin: 0 6px
      line-height: 36px
      box-flex: 1.0
      -webkit-box-flex: 1.0
      -moz-box-flex: 1.0
      .search-input
        font-size: ($font-size-medium)px
        padding: 4px
        text-indent: 8px
        border-radius: 20px
        width: 80%
        -webkit-appearance: none
        vertical-align: middle
      .icon-closecircleo
        margin-left: 4px
        font-size: 18px
        color: $color-font-head
        vertical-align: middle
    .playing
      box-flex: 1.0
      -webkit-box-flex: 1.0
      -moz-box-flex: 1.0
</style>

