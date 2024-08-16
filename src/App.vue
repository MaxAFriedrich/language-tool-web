<script setup lang="ts">
import {checkTextWithLanguageTool} from './api';
import {computed, ref} from "vue";

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


function getCaretPosition(element: HTMLElement) {
  let caretOffset = 0;
  const doc = element.ownerDocument;
  const win = doc.defaultView;
  const sel = win?.getSelection();
  if (!sel) return 0;
  if (sel.rangeCount > 0) {
    const range = sel?.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }
  return caretOffset;
}


function setCaretPosition(element: HTMLElement, offset: number) {
  const range = document.createRange();
  const sel = window.getSelection();
  let charIndex = 0;
  let nodeStack: Node[] = [element];
  let node: Node | null, foundStart = false;
  while ((node = nodeStack.pop()!)) {
    if (node.nodeType === Node.TEXT_NODE) {
      const nextCharIndex = charIndex + (node as Text).length;
      if (!foundStart && offset >= charIndex && offset <= nextCharIndex) {
        range.setStart(node, offset - charIndex);
        range.collapse(true);
        foundStart = true;
      }
      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }
  sel?.removeAllRanges();
  sel?.addRange(range);
}

function highlightText(index: number) {
  if (!editor.value) return;
  const caretPosition = getCaretPosition(editor.value);
  const suggestion = suggestions.value[index];
  const text = (editor.value as HTMLElement).innerText;
  const tmp = `<span class="highlighted">${text.slice(suggestion.offset, suggestion.offset + suggestion.length)}</span>`;
  (editor.value as HTMLElement).innerHTML = text.slice(0, suggestion.offset) + tmp + text.slice(suggestion.offset + suggestion.length);
  setCaretPosition(editor.value, caretPosition);
}

function unHighlightText() {
  if (!editor.value) return;
  const caretPosition = getCaretPosition(editor.value);
  editor.value.innerHTML = editor.value.innerText;
  setCaretPosition(editor.value, caretPosition);
}

function replace(indexS: number, indexR: number) {
  const suggestion = suggestions.value[indexS];
  const replacement = suggestion.replacements[indexR];
  const text = (editor.value as HTMLElement).innerText;
  (editor.value as HTMLElement).innerText = text.slice(0, suggestion.offset) + replacement.value + text.slice(suggestion.offset + suggestion.length);
  suggestions.value = [];
  checkText();
}

const isCorrect = computed(() => {
  if (suggestions.value.length === 0) {
    return "Look good to me!"
  }
  return ""
});

const debounceCheckText = debounce(checkText, 500);
</script>

<template>
  <div id="wrapper">
    <div contenteditable="true"
         spellcheck="false"
         ref="editor"
         id="editor"
         @input="debounceCheckText"
         @focus="unHighlightText"
    ></div>
    <div id="suggestions-wrapper">
      {{ isCorrect }}
      <div v-for="(suggestion, indexS) in suggestions" :key="suggestion.message"
           @mouseover="highlightText(indexS)"
           @mouseleave="unHighlightText"
           class="suggestion"
      >
        <h3 @click="highlightText(indexS)">{{ suggestion.message }}</h3>
        <div @click="highlightText(indexS)">{{ suggestion.context.text }}</div>
        <div>
          <span v-for="(replacement, indexR) in suggestion.replacements.slice(0,5)" :key="replacement.value">
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
#wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
}

#editor {
  max-width: 60ch;
  width: 100%;
  height: 90%;
  padding: 1rem;
  outline: none;
  border: none;
  background: #222;
  margin: 1rem;
  line-height: 2;
  overflow-y: auto;
}

#suggestions-wrapper {
  width: 100%;
  height: 90%;
}

.suggestion {
  padding: 0.5rem;
  margin: 0.3rem;
  background: #333;
  border-radius: 0.3rem;
}

.suggestion button {
  margin: 0.3rem;
  padding: 0.3rem;
  background: #444;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  color: inherit;
}

</style>

<style>
.highlighted {
  background-color: rgba(255, 0, 0, 0.5);
}
</style>
