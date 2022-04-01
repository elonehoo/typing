<script setup lang="ts">
  import AutoType  from 'ts-typing/src/index'
  onMounted(()=>{
    const text = [
      { type: 'text', text: 'hello???' },
      { type:'delete',num:3},
      { type: 'text', text: ' !' },
      { type: 'br' },
      { type: 'text', text: 'my name is ' },
      { type: 'text', text: 'Elone hoo !' },
    ]

const autoType = new AutoType('#content', text, {
  speed: 200, // 每次打字的间隔
})

autoType.run()
  })
</script>

<template>
  <div id="content">
    
  </div>
</template>

<style>

</style>
