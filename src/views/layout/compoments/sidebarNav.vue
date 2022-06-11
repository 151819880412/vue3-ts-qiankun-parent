<template>
  <div class="sidebar-compon">
      <el-menu mode="vertical" :collapse="false" background-color="#304156" text-color="#eee"
        active-text-color="#4dbcff" :default-active="''" :unique-opened="true" class="el-menu-vertical-demo">
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
      </el-menu>
  </div>
</template>

<script lang="ts">
  import {
    reactive,
    toRaw,
  } from 'vue'
  import DynamicMenu from "@/components/DynamicMenu.vue";

  interface SidebarMenu {}

  export default {
    setup() {
      let sidebarMenu: Array < SidebarMenu > = reactive(toRaw(JSON.parse(localStorage.getItem('getRoutesLists') || '')))
      return {
        sidebarMenu
      }
    },

    computed: {},
    methods: {},
    components: {
      DynamicMenu,
    },
    created() {

    },
    mounted() {},
    watch: {},
  };
</script>
<style lang="stylus">
  .el-menu-vertical-demo {
    width: 100% !important
    height: 100% !important
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .sidebar-compon {
    width: 200px;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar {
    -ms-overflow-style: none;
  }

  .sidebar {
    overflow: -moz-scrollbars-none;
  }
</style>