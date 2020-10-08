import Vue from 'vue'

export const state = () => ({
  auth: {
    loggedIn: false,
    user: null
  }
})

export const mutations = {
  SET_USER (state, user) {
    state.auth.loggedIn = true
    state.auth.user = user

    Vue.notify({
      group: 'main',
      title: this.$i18n.t('loggedIn', [user.name]),
      duration: 5000
    })
  }
}

export const actions = {
  fetchUser (context) {
    if (localStorage.getItem('access_token')) {
      this.$axios.get('https://id.onegaming.group/api/v1/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then((response) => {
        context.commit('SET_USER', response.data)
      }).catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('access_token')
          console.log('Logged out')
        } else {
          console.error(error)
        }
      })
    }
  }
}
