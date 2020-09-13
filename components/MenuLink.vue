<template>
  <div :class="['menu', open ? 'open' : '']">
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'MenuLink',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .menu {
    width: 26px;
    height: 18px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
  }

  .menu span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  .menu span:nth-child(1) {
    top: 0;
    transform-origin: left center;
  }

  .menu span:nth-child(2) {
    top: 8px;
    transform-origin: left center;
  }

  .menu span:nth-child(3) {
    top: 16px;
    transform-origin: left center;
  }

  .menu.open span:nth-child(1) {
    transform: rotate(45deg);
    top: -1px;
    left: 4px;
  }

  .menu.open span:nth-child(2) {
    width: 0;
    opacity: 0;
  }

  .menu.open span:nth-child(3) {
    transform: rotate(-45deg);
    top: 17px;
    left: 4px;
  }
</style>
