<script setup lang="ts">
  import AutoType from '~/typing'
  onMounted(()=>{
    const text = [
      { type: 'text', text: 'hello' ,time:100 },
  { type: 'br' },
  { type: 'text', text: 'my name is ' },
  { type: 'text', text: 'Elone hoo !' },
    ]

const autoType = new AutoType('#content', text, {
  speed: 200, // 每次打字的间隔
  end: function(){
    console.log('end')
  }
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
