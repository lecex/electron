var mixin = {
  created() {
    this.eventListener()
  },
  methods: {
    eventListener() {
      // handle `esc` key when the popup is shown
      window.addEventListener('keydown', (event) => {
        if (event.keyCode === 27) {
          this.handleClose()
        }
      })
    }
  }
}
export default mixin
