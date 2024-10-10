<template>
  <div>
    <canvas id="logo-canvas" ref="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script setup lang="ts">
import { DrawLogo } from '@qx/binary-logo';
import { onMounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const drawLogo = ref<DrawLogo | null>(null);
onMounted(() => {
  if (!canvas.value) {
    return;
  }
  drawLogo.value = new DrawLogo(canvas.value, 'HelloWorld', {
    scale: 3,
  });
});
</script>

<style scoped></style>
