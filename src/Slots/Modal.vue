<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  title: string;
  openText: string;
  closeText: string;
}>();

const isOpen = ref(false);
</script>

<template>
  <div class="modal-overlay" v-if="isOpen" @click="isOpen=false"></div>
  <button @click="isOpen = true">{{ openText }}</button>
  <div v-if="isOpen" class="modal-wrapper">
    <div class="modal-title">
      <h2>{{ title }}</h2>
      <button @click="isOpen = false" class="close-button">{{ closeText }}</button>
    </div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.modal-overlay {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-dark);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 75%;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-content {
  margin-top: 1rem;
  overflow: auto;
}

.close-button {
  background: none;
}
</style>
