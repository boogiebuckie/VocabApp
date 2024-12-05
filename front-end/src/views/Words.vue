<template>
    <div class="ui container" style="padding: 20px;">
        <h1 class="ui header">Words</h1>
        <div class="ui four stackable cards">
            <div v-for="(word, i) in words" :key="i" class="card">
                <div class="content">
                    <div class="header">{{ word.english }}</div>
                    <div class="description">
                        <p><strong>German:</strong> {{ word.german }}</p>
                        <p><strong>Vietnamese:</strong> {{ word.vietnam }}</p>
                    </div>
                </div>
                <div class="extra content">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <!-- Left section for Show and Edit icons -->
                        <div class="icon-group">
                            <router-link :to="{ name: 'show', params: { id: word._id } }">
                                <i class="eye icon tooltip" title="Show"></i>
                            </router-link>
                            <router-link :to="{ name: 'edit', params: { id: word._id } }">
                                <i class="edit icon tooltip" title="Edit"></i>
                            </router-link>
                        </div>
                        <!-- Right section for Delete icon -->
                        <div class="icon-group" style="margin-left: auto;">
                            <i class="trash alternate outline icon tooltip" title="Delete" @click.prevent="onDestroy(word._id)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.tooltip {
    position: relative;
}

.tooltip:after {
    content: attr(title);
    position: absolute;
    bottom: 125%;  /* Position above the icon */
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 17px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s;
    z-index: 10;
}

.tooltip:hover:after {
    opacity: 1;
    visibility: visible;
}
</style>
<script>
    //import router from '@/router';
    import{api} from'../helpers/helpers';
    export default{
        name:'words',
        data(){
            return{
                words:[]
            };
        },

        methods:{
            async onDestroy(id){
                const sure = window.confirm('Are you sure ?');
                if(!sure) return;
                await api.deleteWord(id);
                this.flash('Word delete sucessfully!', 'success');
                const newWords = this.words.filter(word => word._id !== id);
                this.words = newWords;
            }
        },

        async mounted(){
            this.words = await api.getWords();
        },    
    };
</script> 