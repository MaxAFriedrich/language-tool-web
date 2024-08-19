<script setup lang="ts">
import {CONFIG, FontName, Language, LanguageNames, Level} from '@/config';
</script>

<template>
  <div>
    <form>
      <h3>General</h3>
      <div>
        <label for="basePath">Base Path:</label>
        <input id="basePath" v-model="CONFIG.basePath.value" type="text"/>
      </div>
      <div>
        <label for="language">Language:</label>
        <select id="language" v-model="CONFIG.language.value">
          <option v-for="language in Object.values(Language)" :key="language" :value="language">
            {{ LanguageNames[language] }}
          </option>
        </select>
      </div>
      <div>
        <label for="level">Level:</label>
        <select id="level" v-model="CONFIG.level.value">
          <option v-for="level in Object.values(Level)" :key="level" :value="level">
            {{ level }}
          </option>
        </select>
      </div>
      <h3>Theme</h3>
      <div>
        <label for="backgroundColor">Background Color:</label>
        <input id="backgroundColor" v-model="CONFIG.backgroundColor.value" type="color"/>
      </div>
      <div>
        <label for="color">Text Color:</label>
        <input id="color" v-model="CONFIG.color.value" type="color"/>
      </div>
      <div>
        <label for="fontSize">Font Size:</label>
        <input id="fontSize" v-model="CONFIG.fontSize.value" type="number"/>
      </div>
      <div>
        <label for="level">Font:</label>
        <select id="level" v-model="CONFIG.fontFamily.value">
          <option v-for="font in Object.values(FontName)" :key="font" :value="font">
            {{ font }}
          </option>
        </select>

      </div>

      <div>
        <label for="lineHeight">Line Height:</label>
        <input id="lineHeight" v-model="CONFIG.lineHeight.value" type="number"/>
      </div>
      <div>
        <label for="letterSpacing">Letter Spacing:</label>
        <input id="letterSpacing" v-model="CONFIG.letterSpacing.value" type="number"/>
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
