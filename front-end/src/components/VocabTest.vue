<template>
  <div class="game-container">
    <div class="score-board">
      <h2>Score: {{ score }} / {{ words.length }}</h2>
    </div>

    <form class="vocab-form" @submit.prevent="onSubmit">
      <div class="input-group">
        <div class="label">
          <i class="germany flag"></i> German
        </div>
        <input
          type="text"
          readonly
          :disabled="testOver"
          :value="currWord.german"
          class="input-field"
        />
      </div>

      <div class="input-group">
        <div class="label">
          <i class="united kingdom flag"></i> English
        </div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="english"
          :disabled="testOver"
          autocomplete="off"
          class="input-field"
        />
      </div>

      <div class="input-group">
        <div class="label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="vietnam"
          :disabled="testOver"
          autocomplete="off"
          class="input-field"
        />
      </div>

      <button
        class="submit-btn"
        :disabled="testOver || !english || !vietnam"
      >
        Submit
      </button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      vietnam: '',
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord: function() {
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    onSubmit: function() {
      if (this.english === this.currWord.english && this.vietnam === this.currWord.vietnam) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord.german);
      }

      this.english = '';
      this.vietnam = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    },
    flash: function(message, type, options) {
      this.result = message;
      this.resultClass = type;
      setTimeout(() => {
        this.result = '';
        this.resultClass = '';
      }, options.timeout);
    }
  }
};
</script>

<style scoped>
/* Game Container */
.game-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f7f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Scoreboard */
.score-board {
  text-align: center;
  margin-bottom: 20px;
}

.score-board h2 {
  font-size: 24px;
  color: #333;
}

/* Form Styles */
.vocab-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Input Group */
.input-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.input-field {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #6c6ce5;
  outline: none;
}

.submit-btn {
  padding: 12px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}

.submit-btn:disabled {
  background-color: #c8e6c9;
  cursor: not-allowed;
}

/* Results Styling */
.results {
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

.error {
  background-color: #f2dede;
  color: #a94442;
  border: 1px solid #ebccd1;
}

</style>
