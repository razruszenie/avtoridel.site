<template>
  <div class="body-container">
    <v-layout wrap>
      <v-flex xs12 lg3 id="filter">
        <PartFilter :part="{}"></PartFilter>
      </v-flex>
      <v-flex xs12 lg9 class="parts-cmpt">
        <v-carousel
                class="bampart-carousel"
                v-if="slides.length !== 0"
                cycle
                height="300"
                hide-delimiter-background
        >
          <v-carousel-item
                  v-for="(slide,i) in slides"
                  :key="i"
                  :src="slide.file"
          ></v-carousel-item>
        </v-carousel>
        <Parts class="bampart-parts" :partComponent="{}"></Parts>
      </v-flex>
    </v-layout>
    <client-only>
      <gallery :images="selectedImages" :index="index" @close="index = null"></gallery>
    </client-only>
  </div>
</template>

<script>
  import PartFilter from '~/components/PartFilter'
  import Parts from '~/components/Parts'

  export default {

    head() {
      return {
        title: this.titleParts ? this.titleParts + ' купить' :
                process.env.site_name + ' - автозапчасти б/у, авторазборка в Минске',
        meta: [
          { name: 'description', content: this.titleParts ? 'На сайте ' + process.env.site_name + ' ' +
                    'вы можете купить ' + this.titleParts :
                    process.env.site_name + ' - запчасти б/у для авто' +
                    ' в Беларуси. Большой каталог автозапчастей c ценами, фото, описанием и характеристиками.'},
          { hid: "og:title", name: 'og:title', property: 'og:title', content: this.titleParts ? this.titleParts :
                    process.env.site_name + ' - автозапчасти б/у, авторазборка в Минске'
          },
          { hid: 'keywords', name: 'keywords', content: this.titleParts ? this.titleParts + ' купить' :
                    process.env.site_name + ', б/у запчасти, авторазборка, авто' }
        ]
      }
    },

    components: {
      PartFilter: PartFilter,
      Parts: Parts
    },

    computed: {
      selectedImages() {
        return this.$store.getters['galery/selectedImages']
      },
      titleParts() {
        return this.$store.getters['parts/titleParts']
      },
      index: {
        get () {
          return this.$store.state.galery.index
        },
        set (value) {
          this.$store.commit('galery/setIndex', value)
        }
      }
    },

    async fetch({store, query}) {

      await store.dispatch('parts/fetch', query)
    },

    async asyncData({$axios}) {

      try {

        const res = await $axios.$get('api/news');
        return { slides: res }

      } catch (e) {
        return { slides: [] }
      }
    },

    data () {
      return {
        slides: [
          {
            src: 'Nj7fADL.jpeg'
          }
        ],
      }
    },

    mounted() {
      if(Object.keys(this.$route.query).length !== 0 && !this.$route.query.standalone){
        document.getElementById("scroll-index").scrollIntoView(true);
        window.scroll(0, window.scrollY - 80);
      }
      else{
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
      }
    }
  }
</script>

<style lang="scss">

  @media screen and (min-width: 1264px) {
    .parts-cmpt {
      padding-left: 12px;

      .bampart-carousel{
        margin-bottom: 20px;
      }
    }
  }

  @media screen and (max-width: 1263px)
  {
    #filter{
      order: 1;
    }
    .parts-cmpt{
      order: 2;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .bampart-parts{
        order: 1;
      }

      .bampart-carousel{
        order: 2;
        margin-top: 16px;
      }
    }

  }
</style>