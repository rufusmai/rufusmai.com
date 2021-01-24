<template>
  <div class="background-wrapper fixed w-full h-full bg-gray-900 overflow-hidden">
    <div class="square square-1 w-64 h-64 bg-opacity-25 hidden sm:block" :class="[`bg-${colors[0]}-800`, $route.name === 'contact' ? 'contact' : '']" />
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
  .background-wrapper {
    filter: blur(50px);
  }

  .square {
    position: absolute;
    border-radius: 50%;
  }
  .square-1 {
    top: 0;
    left: 0;
    transform: translate(-25%, -25%);
    transition: transform 2s ease-in-out;
    transition-delay: 2s;
    animation-delay: -3s;
  }
  .square-1.contact {
    transform: translate(calc(9rem), calc(3rem));
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
