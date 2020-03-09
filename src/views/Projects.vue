<template>
  <div class="projects">
    <BackButton hide-name/>

    <div v-if="repos.length > 2" class="wrapper">
      <b-card v-for="repo in repos" v-bind:key="repo.id" class="mt-2">
        <a :href="repo.html_url" target="_blank" rel="noopener">
          <b-badge v-if="'url' in repo" variant="secondary">
            <fai :icon="['fab', 'github']" class="badge-icon"/>
            Github
          </b-badge>
          <b-badge v-else variant="primary">
            <fai :icon="['fas', 'link']" class="badge-icon"/>
            Live Projekt
          </b-badge>
          <b-card-title>
            <code>{{ repo.name }}</code>
          </b-card-title>
          <b-card-sub-title>
            {{ 'url' in repo ? repo.description : $t(repo.description) }}
            <span v-if="repo.description == null">
          <i>Keine Beschreibung</i>
        </span>
          </b-card-sub-title>
        </a>
      </b-card>

      <p class="text-muted mt-3">Powered by
        <fai :icon="['fab', 'github']"/>
        API
      </p>
    </div>
    <b-spinner v-else-if="!error" variant="secondary"/>

    <div v-if="error && repos.length <= 2">
      <fai :icon="['fas', 'exclamation-triangle']" size="5x" class="text-secondary mt-2"/>
      <h3 class="mt-4">Du bist offline</h3>
      <p class="text-muted">Bitte gehe online, um alle Projekte anzuzeigen.</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {CardPlugin, AlertPlugin, SpinnerPlugin, BadgePlugin} from 'bootstrap-vue'
  import BackButton from '../components/BackButton.vue'

  Vue.use(CardPlugin)
  Vue.use(AlertPlugin)
  Vue.use(SpinnerPlugin)
  Vue.use(BadgePlugin)

  export default {
    components: {
      BackButton
    },
    data() {
      return {
        repos: [
          {
            id: 'mcone',
            name: 'MCONE.EU',
            description: 'projects.mcone',
            html_url: 'https://www.mcone.eu'
          },
          {
            id: 'designyourflow',
            name: 'DesignYourFlow',
            description: 'projects.designyourflow',
            html_url: 'https://designyourflow.de'
          }
        ],
        error: false
      }
    },
    mounted() {
      navigator.serviceWorker.addEventListener('message', async (event) => {
        /* eslint no-console: "off" */
        console.log('message event catched')

        // Optional: ensure the message came from workbox-broadcast-update
        if (event.data.meta === 'workbox-broadcast-update') {
          console.log('workbox-broadcast-update message event catched')
          const {cacheName, updatedUrl} = event.data.payload;

          // Do something with cacheName and updatedUrl.
          // For example, get the cached content and update
          // the content on the page.
          const cache = await caches.open(cacheName);
          const updatedResponse = await cache.match(updatedUrl);

          console.log('repos before')
          console.log(this.repos)
          this.repos = this.repos.filter(obj => !('url' in obj))
          updatedResponse.json().then((repos) => {
            repos.forEach(repo => {
              this.repos.push(repo)
            });
            console.log('repos after')
            console.log(this.repos)
          });
        }
      });

      this.fetchRepos()
    },
    methods: {
      fetchRepos() {
        this.repos = this.repos.filter(obj => !('url' in obj))

        this.$axios.get('https://api.github.com/users/rufusmaiwald/repos', {}, {
          validateStatus: function (status) {
            return status === 200
          }
        }).then(response => {
          response.data.forEach(repo => {
            this.repos.push(repo)
          });
        }).finally(() => {
          this.error = (this.repos.length <= 2)
        })
      }
    }
  }
</script>

<style scoped>
  .projects {
    height: 465px !important;
  }

  .wrapper {
    height: 400px;
    overflow-y: auto;
  }

  .card-title > code {
    color: black !important;
  }

  .badge-icon {
    color: white;
  }
</style>
