<template>
    <div>
        <h1>Edit Word</h1>
        <word-form @createOrUpdate="createOrUpdate" :word="word"></word-form>
    </div>
</template>

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

        methods: {
            async createOrUpdate(word) {
                try {
                    await api.updateWord(word);
                    this.flash('Word update succesfully!','success');
                    this.$router.push(`/words/${word._id}`);
                    //alert('Word updated successfully!');
                    //this.$router.push(`/words/${word._id}`);
                } catch (error) {
                    console.error("Error updating word:", error);
                    alert('Failed to update word. Please try again.');
                }
            }
        }
    };
</script>
