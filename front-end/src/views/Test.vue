<template>
    <div>
      <h1 style="margin-left: 200px;">Memory Test Game</h1>
  
      <div v-if="words.length < 5">
        <p>You need to enter at least five words to begin the test</p>
      </div>
      <div v-else>
        <vocab-test :words="words"></vocab-test>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  import VocabTest from '../components/VocabTest.vue';
  
  export default {
    name: 'test',
    components: {
      'vocab-test': VocabTest
    },
    data() {
      return {
        words: []
      };
    },
    async mounted() {
      this.words = await api.getWords();
    }
  };
  </script>