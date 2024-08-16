<script setup lang="ts">
import {checkTextWithLanguageTool} from './api';
import {ref} from "vue";

interface Suggestion {
  message: string;
  shortMessage: string;
  replacements: { value: string }[];
  offset: number;
  length: number;
  context: { text: string; offset: number; length: number; };
  rule: { id: string; description: string; issueType: string; };
}

const editor = ref<HTMLElement | null>(null);
const suggestions = ref<Suggestion[]>([]);

function debounce(func: Function, timeout = 300) {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

function checkText() {
  if (!editor.value) {
    return;
  }
  const text = (editor.value as HTMLElement).innerText;

  checkTextWithLanguageTool(text)
      .then(response => {
        suggestions.value = response.matches;
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function highlightText(index: number) {
  const suggestion = suggestions.value[index];
  const text = (editor.value as HTMLElement).innerText;
  const tmp = `<span class="highlighted">${text.slice(suggestion.offset, suggestion.offset + suggestion.length)}</span>`;
  (editor.value as HTMLElement).innerHTML = text.slice(0, suggestion.offset) + tmp + text.slice(suggestion.offset + suggestion.length);
}

function unHighlightText() {
  (editor.value as HTMLElement).innerText = (editor.value as HTMLElement).innerText;
}

function replace(indexS: number, indexR: number) {
  const suggestion = suggestions.value[indexS];
  const replacement = suggestion.replacements[indexR];
  const text = (editor.value as HTMLElement).innerText;
  (editor.value as HTMLElement).innerText = text.slice(0, suggestion.offset) + replacement.value + text.slice(suggestion.offset + suggestion.length);
  suggestions.value = [];
  checkText();
}

const debounceCheckText = debounce(checkText, 500);
</script>

<template>
  <div id="wrapper">
    <div contenteditable="true"
         spellcheck="false"
         ref="editor"
         id="editor"
         @input="debounceCheckText"
    ></div>
    <div id="suggestions-wrapper">
      <div v-for="(suggestion, indexS) in suggestions" :key="suggestion.message"
           @mouseover="highlightText(indexS)"
           @mouseleave="unHighlightText"
      >
        <div>{{ suggestion.message }}</div>
        <div>{{ suggestion.context.text }}</div>
        <div>
          <span v-for="(replacement, indexR) in suggestion.replacements" :key="replacement.value">
            <button @click="replace(indexS, indexR)">
              {{ replacement.value }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#editor {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

</style>

<style>
.highlighted {
  background-color: rgba(255, 0, 0, 0.5);
}
</style>
