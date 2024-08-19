<script setup lang="ts">
import {ref, watch} from 'vue';
import {CONFIG, Level, setUrlArgs} from '@/config';

const config = ref({...CONFIG});

watch(config, () => {
  CONFIG.basePath = config.value.basePath;
  CONFIG.language = config.value.language;
  CONFIG.level = config.value.level;
  setUrlArgs()
}, {deep: true})
</script>

<template>
  <div>
    <form>
      <div>
        <label for="basePath">Base Path:</label>
        <input id="basePath" v-model="config.basePath" type="text"/>
      </div>
      <div>
        <label for="language">Language:</label>
        <input id="language" v-model="config.language" type="text"/>
      </div>
      <div>
        <label for="level">Level:</label>
        <select id="level" v-model="config.level">
          <option v-for="level in Object.values(Level)" :key="level" :value="level">
            {{ level }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 75%;
}

form div {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}

input, select {
  width: 75%;
}
</style>
