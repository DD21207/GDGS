<template>
  <div id="newsList_div" style="height:1000px;">
   
  </div>
</template>
<script>
export default {
  name: 'newsList_div',
  data() {
    return {

    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.$store.commit('isShow', ' ');
    this.$store.commit('changeTitle', 'News')
  },
  watch: {

  },
  methods: {

  }
}

</script>
