<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li @click="selectItem(item)" class="search-item" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteSong(item)">
          <i class="anticon icon-circledowno"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      deleteSong(item) {
        this.$emit('delete', item)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      .text
        flex: 1
        color: $color-text-title
      .icon
        extend-click()
        .anticon
          font-size: $font-size-small
          color: $color-text-title
</style>
