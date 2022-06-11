<template>
  <div class="main-container">
    <TopAside />
    <TableCard />
    <Content />
  </div> 
</template>

<script lang="ts">
  import TopAside from './topAside.vue'
  import Content from './content.vue'
  import TableCard from './tableCard.vue'

  export default {
    props: {},
    data() {
      return {
        timer: "",
        socket: "",
        stompClient: "",
        timmer:null,
        dialogWidth:document.body.clientWidth
      };
    },
    mounted() {
    },
    computed: {

    },
    methods: {

    },
    components: {
      TopAside,
      Content,
      TableCard
    },
  };

</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .main-container 
    margin-left 200px ;
    min-height 100% ;
    transition 0.25s ;
    background #F0F2F5 ;
    box-sizing border-box;

</style>
