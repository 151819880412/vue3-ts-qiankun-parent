<template>
  <div class="topAside">11111111111</div>
</template>

<script>
import { reactive,toRefs,onBeforeMount,onMounted, getCurrentInstance} from 'vue'
export default {
   name: '',
   props: [],
   setup() {
     const ctx = getCurrentInstance()
     console.log(ctx)
     const data = reactive({})
     onBeforeMount(() => {
     })
     onMounted(() => {
     })
     const refData = toRefs(data);
     return {
        ...refData,
      }
   }
}
</script>
<style scoped>
.topAside{
  height: 50px;
}
</style>