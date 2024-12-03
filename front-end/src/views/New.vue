<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate ='createOrUpdate'></word-form>
    </div>
</template>

<script>
    import WordForm from '../components/WordForm.vue';
    import { api } from '../helpers/helpers';
    export default{
        name: 'new-word',
        components:{
            'word-form': WordForm
        },
        methods: {
            createOrUpdate: async function(word) {
                //console.log("1232123");
                const rest = await api.createWord(word);
                this.flash('Word Create', 'success');
                this.$router.push(`/words/${res._id}`);
            }
        }
    };
</script>