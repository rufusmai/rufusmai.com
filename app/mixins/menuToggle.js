export default {
  props: {
    menuOpened: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:menuOpened'],
  methods: {
    toggleMenu () {
      this.$emit('update:menuOpened', !this.menuOpened)
    }
  }
}
