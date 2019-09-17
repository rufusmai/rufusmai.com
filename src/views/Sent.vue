<template>
  <div class="contact">
    <BackButton hide-name />
    <fai :icon="['far', success ? 'check-circle' : 'times-circle']" size="5x" :class="success ? 'text-success' : 'text-danger'"/>
    <h4 class="mt-4">{{ success ? 'Nachricht gesendet!' : 'Ein Fehler ist aufgetreten.' }}</h4>
    <p>{{ success ? 'Danke für deine Mitteilung' : (typeof response !== 'undefined' && typeof response.response !== 'undefined' ? '"'+response.response.statusText+'"' : 'Unbekannter Fehler') }}</p>
  </div>
</template>

<script>
    import BackButton from '../components/BackButton.vue'

    export default {
        components: {
            BackButton
        },
        props: {
            success: Boolean,
            response: Object
        },
        beforeMount: function () {
            if (typeof this.response !== 'undefined') {
                setTimeout(() => {
                    this.$router.push('/')
                }, 5000)
            } else {
                this.$router.push('/')
            }
        }
    }
</script>
