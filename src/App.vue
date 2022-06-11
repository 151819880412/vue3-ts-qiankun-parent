<template>
  <!-- <template>
    <router-view/>
</template> -->

  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <!-- 新增site1路由 -->
    <router-link to="/children">children</router-link> |
    <!-- 新增site2路由 -->
    <router-view />
    <!-- 新增site1渲染节点 -->
    <div id="children" />
  </div>
</template>


<style lang="stylus">
#parent
  height: 100%
  width: 100%
</style>
