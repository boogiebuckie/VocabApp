<template>
    <div>
        <h1>Words</h1>
        <table id="words" class="ui celled compact table">
            <thread>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th colspan="3"></th>
                </tr>
            </thread>
            <tr v-for ="(word, i) in words" :key ="i">
                <td>{{word.english}}</td>
                <td>{{word.german}}</td>
                <td width = "75" class="center aligned">
                    <router-link :to="{name: 'show',params:{id: word._id}}">Show</router-link>
                </td>
                <td width = "75" class="center aligned">
                    <router-link :to="{name: 'edit',params:{id: word._id}}">Edit</router-link>
                </td>
                <td width = "75" class="center aligned">Delete</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import router from '@/router';
import{api} from'../helpers/helpers';
    export default{
        name:'words',
        data(){
            return{
                words:[]
            };
        },
        async mounted(){
            this.words = await api.getWords();
        }
    };
</script> 