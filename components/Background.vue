<template>
  <div class="fixed w-screen h-screen bg-gray-900 overflow-hidden">
    <div class="square square-1 w-64 h-64 bg-opacity-25 transition-all duration-500 ease-in-out hidden sm:block" :class="`bg-${colors[0]}-800`" />
    <div class="square square-2 w-48 h-48 bg-opacity-25 transition-all duration-500 ease-in-out" :class="`bg-${colors[1]}-800`" />

    <div class="square square-3 w-48 h-32 bg-opacity-25 transition-all duration-500 ease-in-out hidden sm:block" :class="`bg-${colors[1]}-800`" />

    <div class="square square-4 w-32 h-32 bg-opacity-25 transition-all duration-500 ease-in-out hidden sm:block" :class="`bg-${colors[1]}-800`" />
    <div class="square square-5 w-24 h-24 bg-opacity-25 transition-all duration-500 ease-in-out" :class="`bg-${colors[2]}-800`" />

    <div class="square square-6 w-32 h-32 bg-opacity-25 transition-all duration-500 ease-in-out hidden sm:block" :class="`bg-${colors[0]}-800`" />
    <div class="square square-7 w-24 h-24 bg-opacity-25 transition-all duration-500 ease-in-out" :class="`bg-${colors[2]}-800`" />

    <div class="square square-8 w-24 h-24 bg-opacity-25 transition-all duration-500 ease-in-out" :class="`bg-${colors[0]}-800`" />

    <div class="square square-9 w-48 h-48 bg-opacity-25 transition-all duration-500 ease-in-out hidden sm:block" :class="`bg-${colors[2]}-800`" />
    <div class="square square-10 w-24 h-24 bg-opacity-25 transition-all duration-500 ease-in-out" :class="`bg-${colors[1]}-800`" />
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: {
    colors: {
      type: Array,
      default: () => (['teal', 'blue', 'indigo'])
    }
  }
}
</script>

<style lang="scss" scoped>
  .square {
    position: absolute;
    border-radius: 1rem;
    animation: bgMove 60s linear infinite;
  }
  .square-1 {
    top: 50%;
    right: 0;
    animation-delay: -3s;
  }
  .square-2 {
    top: 70%;
    right: 0;
  }

  .square-3 {
    top: 20%;
    right: 0;
    animation-delay: -14s;
  }

  .square-4 {
    top: 10%;
    right: 0;
    animation-delay: -32s;
  }
  .square-5 {
    top: 20%;
    right: 0;
    animation-delay: -30s;
  }

  .square-6 {
    top: 55%;
    right: 0;
    animation-delay: -26s;
  }
  .square-7 {
    top: 87.5%;
    right: 0;
    animation-delay: -40s;
  }

  .square-8 {
    top: 5%;
    right: 0;
    animation-delay: -50s;
  }

  .square-9 {
    top: 35%;
    right: 0;
    animation-delay: -46s;
  }
  .square-10 {
    top: 50%;
    right: 0;
    animation-delay: -42s;
  }

  @keyframes bgMove {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100vw);
    }
  }
</style>
