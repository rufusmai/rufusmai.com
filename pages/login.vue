<template>
  <div class="container d-flex align-items-center justify-content-center flex-column">
    Logging in...
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted () {
    const query = this.parseQueryString(window.location.search.substring(1))

    if (query.error) {
      console.error(query.error)
    } else if (query.code) {
      this.login(query.code)
    }
  },
  methods: {
    async login (code) {
      const token = await this.$axios.$post('https://id.onegaming.group/api/v1/oauth2/token', {
        grant_type: 'authorization_code',
        code,
        client_id: '5f68b682e7db6e447df529f0',
        redirect_uri: window.location.origin + '/login',
        code_verifier: localStorage.getItem('pkce_code_verifier')
      })

      localStorage.setItem('access_token', token.access_token)
      await this.$store.dispatch('fetchUser')
      this.$router.push('/')
    },
    parseQueryString (string) {
      if (string === '') {
        return {}
      }

      const segments = string.split('&').map(s => s.split('='))
      const queryString = {}
      segments.forEach(s => (queryString[s[0]] = s[1]))

      return queryString
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 70vh;
}
</style>
