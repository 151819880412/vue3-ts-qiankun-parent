<!-- src\layout\AppLayout.vue -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main
            >Main
            <router-view />
            <Loading></Loading>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import loginServiceImpl from '../../api/login/index'
import Loading from "./components/Loading/Loading.vue";
export default {
  name: "Applayout",
  props: [],
  setup() {
    loginServiceImpl.queryRoleMenuList()
    return {
    };
  },
  components: {
    Loading,
  },
};
</script>

<style scoped lang="stylus">
.el-container
  height: 100vh
.el-header
  background-color: #B3C0D1
.el-aside
  width: auto
  background-color: #304156
.el-main
  background-color: #E9EEF3
</style>
