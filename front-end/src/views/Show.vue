<template>
  <div class="ui centered card" style="max-width: 1000px; margin-top: 20px;">
    <div class="content">
      <h1 class="ui header center aligned">Show Word</h1>

      <!-- German Field -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :value="word.german"/>
      </div>

      <!-- English Field -->
      <div class="ui labeled input fluid" style="max-width: 600px; margin-top: 10px;">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly :value="word.english"/>
      </div>

      <!-- Vietnamese Field -->
      <div class="ui labeled input fluid" style="max-width: 600px; margin-top: 10px;">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input 
          type="text" 
          placeholder="Enter word..." 
          v-model="word.vietnam" 
          aria-label="Vietnamese word input" 
          readonly
        />
      </div>
    </div>

    <!-- Edit Button -->
    <div class="extra content">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        <button class="ui primary button fluid">
          Edit Word
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.ui.card {
  margin-top: 30px;
}

.ui.header {
  color: #4f4f4f;
}

.ui.labeled.input {
  margin-bottom: 20px;
}

.extra.content {
  text-align: center;
}

.ui.primary.button {
  font-size: 16px;
  padding: 12px 20px;
}

.ui.primary.button:hover {
  background-color: #1b1c1d;
  color: white;
}
</style>

  <script>
  import { api} from '../helpers/helpers';

  export default {
    name: 'show',
    data(){
      return{
        word:''
      };
    },
    async mounted() {
    try {
      this.word = await api.getWord(this.$route.params.id);
      console.log(this.word);  // Log the word data to the console
    } catch (err) {
      this.error = 'Failed to load the word. Please try again later.';
      console.error(err);  // Log error for debugging
    } finally {
      this.loading = false;
    }
  }
  };
  </script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }
  </style>