<script setup lang="ts">
import Checker from '@/Components/Checker.vue';
import Modal from "@/Slots/Modal.vue";
import Settings from "@/Components/Settings.vue";
import {load} from "@/config";

load()
</script>

<template>
    <Checker/>
    <div class="tools">
      <Modal title="Settings" close-text="X" open-text="Settings">
        <Settings/>
      </Modal>
    </div>
</template>

<style scoped>
.tools {
  margin: 1rem auto;
  padding: 0.5rem;
  width: fit-content;
  display: flex;
  justify-content: center;
}
</style>
