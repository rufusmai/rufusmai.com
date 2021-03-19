<template>
  <div class="max-w-xs mx-auto md:m-0 sm:flex-none">
    <div class="relative z-30 flex flex-row font-bold">
      <img
        :src="project.logo === '%avatar%' ? require('~/assets/img/avatar.svg') : project.logo"
        alt="Logo"
        class="h-12 w-12 mr-3 bg-white dark:bg-gray-800 rounded-full border border-gray-400 dark:border-gray-500"
      >
      <h2 class="text-3xl w-full leading-10 mb-2">
        <span v-if="project.subtitle" class="relative block mb-3">
          <span class="absolute block text-base font-semibold text-gray-500 dark:text-gray-300 leading-none ml-px">
            {{ $t(project.subtitle) }}
          </span>
        </span>
        <div v-else class="block mb-1" />
        <a class="project-link" :href="project.links.ext">
          {{ project.title }}
          <ExternalLinkIcon v-if="project.links.ext" class="link-icon inline -mt-1 w-6 h-6 opacity-0 transition-opacity duration-300 ease-in-out" />
        </a>
      </h2>
    </div>

    <ProjectThumbnail
      :title="project.title"
      :image="project.img"
      :color="color"
      :links="project.links"
    />

    <div class="relative z-20">
      <div class="mt-1 font-bold">
        <Tag
          v-for="(tag, tagId) in project.tags"
          :key="tagId"
          :name="tag"
        />
      </div>

      <p class="mt-2 font-semibold text-gray-500">
        {{ $i18n.locale === 'de' ? project.de : project.en }}
      </p>
    </div>
  </div>
</template>

<script>
import { ExternalLinkIcon } from '@vue-hero-icons/outline'
import Tag from './Tag'
import ProjectThumbnail from './ProjectThumbnail'

export default {
  name: 'Project',
  components: { ProjectThumbnail, Tag, ExternalLinkIcon },
  props: {
    project: {
      type: Object,
      default: () => ({})
    },
    color: {
      type: String,
      default: 'purple'
    }
  }
}
</script>
