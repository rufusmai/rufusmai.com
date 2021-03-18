export default {
  props: {
    menuOpened: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleMenu () {
      this.$emit('update:menuOpened', !this.menuOpened)
    }
  }
}
