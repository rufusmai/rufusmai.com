<template>
  <div class="projects">
    <BackButton hide-name />

    <div v-if="repos.length > 2" class="wrapper">
      <b-card v-for="repo in repos" v-bind:key="repo.id" class="mt-2">
        <a :href="repo.html_url" target="_blank" rel="noopener">
          <b-badge v-if="'url' in repo" variant="secondary"><fai :icon="['fab', 'github']" class="badge-icon"/> Github</b-badge>
          <b-badge v-else variant="primary"><fai :icon="['fas', 'link']" class="badge-icon"/> Live Projekt</b-badge>
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

      <p class="text-muted mt-3">Powered by <fai :icon="['fab', 'github']"/> API</p>
    </div>
    <b-spinner v-else-if="!error" variant="secondary" />

    <b-alert v-if="error" show variant="danger">
      <p>
        Ein Fehler ist aufgetreten!
      </p>
      <hr>
      <p class="mb-0">
        Die Github API ist nicht erreichbar{{ typeof error.response !== 'undefined'? ': "'+error.response.statusText+'"' : '' }}
      </p>
    </b-alert>
  </div>
</template>

<script>
  import BackButton from '../components/BackButton.vue'

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
      mounted: function () {
          this.$axios.get('https://api.github.com/users/rufusmaiwald/repos', {}, {
              validateStatus: function (status) {
                  return status === 200;
              }
          }).then(response => {
              response.data.forEach(repo => {
                  this.repos.push(repo);
              });
          }).finally(() => {
              this.error = this.repos.length < 1
          })
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
