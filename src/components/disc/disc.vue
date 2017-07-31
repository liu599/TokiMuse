<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        getSongList(this.disc.dissid).then((res) => {
          console.log(res)
          JSON.parse(res)
          /* eslint no-eval: 1 */
          let jsonObj = eval(res)
          /* eslint no-eval: 0 */
          if (res.code === ERR_OK) {
            console.log(jsonObj.cdlist[0].songlist)
          }
        })
      }
    },
    components: {
      MusicList
    }
  }
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped="">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
