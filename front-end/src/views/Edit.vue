<template>
    <div class="ui centered card" style="max-width: 600px; margin-top: 20px;">
      <div class="content">
        <h1 class="ui header center aligned">Edit Word</h1>
  
        <!-- Word Form Component -->
        <word-form @createOrUpdate="createOrUpdate" :word="word"></word-form>
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
  
  .extra.content {
    text-align: center;
  }
</style>

<script>
    import WordForm from '../components/WordForm.vue';
    import { api } from '../helpers/helpers';

    export default {
        name: 'edit',
        components: {
            'word-form': WordForm
        },

        data() {
            return {
                word: {}
            };
        },
        async mounted(){
        this.word = await api.getWord(this.$route.params.id);
        },

        methods: {
            createOrUpdate: async function (word) {
                await api.updateWord(word)
                this.flash('Word updated', 'Success')
                this.$router.push(`/words/${word._id}`)
            }
        }
    };
</script>
