# vue3 + Typescript

## 项目结构
  + ### shims-vue.d.vue
    + TS不能识别vue文件。需要靠shims-vue.d.vue的支持
  + ### tsconfig.json
    + TS的配置文件

## 和Vue2相比的差异
  1. vue2对对象的响应式：通过Object.definePropety进行监视
  2. vue2数组重写方法进行监视
  3. vue2不能监视对象新增或删除的属性
  4. vue2通过修改数组下标和数组长度是不能监视的
  5. vue2通过$set手动把数据变为响应式
  6. vue3通过Proxy代理对象来实现数据响应式

## 与2.×版本生命周期相对应的组合式APl
  ```
    beforeCreate    ->  使用setup()
    created         ->  使用setup()
    beforeMount     ->  onBeforeMount 
    mounted         ->  onMounted
    beforeUpdate    ->  onBeforeUpdate
    updated         ->  onUpdated
    beforeDestroy   ->  onBeforeUnmount
    destroyted      ->  onUnmounted
    activated       ->  onActivated
    deactivated     ->  onDeactivated
    errorCaptured   ->  onErrorCaptured
  ```
## Vue3的新语法
  + ### watch
    ```
      watch(obj,(newValue,oldValue)=>{})
      watch([obj,()=>obj2.number],(newValue,oldValue)=>{})
      // immediate 默认会执行一次  deep 深度监视
      watch(obj.({a,b,c})=>{},{immediate:true,deep:true})   
      watchEffect(()=>{})   // 默认执行一次
    ```
  + ### 自定义hook函数
    ```
      import { ref,onMounted,onUnmounted }from 'vue'
        function useMousePosition(){
        const x = ref(0)
        const y = ref(0)
        const updateMouse = (e: MouseEvent) =>{
          x.value = e.pagex
          y.value = e. pageY
        }
        onMounted(()=>{
          document.addEventListener( 'click', updateMouse)
        })
        onUnmounted(()=>{
          document.removeEventListener( 'click' , updateMouse)
        })
        return {x, y}
      }
      export default useMousePosition
      // 其他模块使用
      import useMousePosition from 
      const {x,y}  = useMousePosition()
      return{
        x,
        y,
      }
    ```