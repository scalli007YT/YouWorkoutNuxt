<template>
  <div class="flex justify-center items-center">
    <div class="relative w-full h-full" style="padding-top: 56.25%">
      <iframe class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" :src="iframeSrc" frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"></iframe>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  videoUrl: { type: String, required: true },
  mute: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: true },
})

const iframeSrc = computed(() => {
  const url = props.videoUrl
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match) return '' // Return empty string if videoUrl is invalid
  return `https://www.youtube.com/embed/${match[1]}?autoplay=${props.autoplay ? 1 : 0}&mute=${props.mute ? 1 : 0}`
})
</script>

<style scoped>
iframe {
  border: none;
}
</style>
