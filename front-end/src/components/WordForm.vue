<template>
  <form action="#" @submit.prevent="onSubmit">
     <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
 
     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="germany flag"></i> German
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.german" required/>
     </div>
 
     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="united kingdom flag "></i> English
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.english" required/>
     </div>
    
     <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
      <input 
        type="text" 
        placeholder="Enter word..." 
        v-model="word.vietnam" 
        aria-label="Vietnamese word input" 
        required
      />
    </div>

     <button class="positive ui button">Submit</button>
   </form>
 </template>
 
 <script>
 export default {
    name: 'word-form',
    props: {
      word: {
        type: Object,
        required: false,
        default:() =>{
          return {
            english: '',
            german:'',
            vietnam:'',
          };
        }
      }
    },
    data() {
      return {
        errorsPresent: false
      };
    },
    methods: {
      onSubmit() {
      // Check if any of the fields are empty
        if (!this.word.english.trim() || !this.word.german.trim() || !this.word.vietnam.trim()) {
          this.errorsPresent = true; // Show error if any field is empty
        } else {
          this.errorsPresent = false; // No error if all fields are filled
          // Emit the createOrUpdate event with the word object
          this.$emit('createOrUpdate', this.word);
        }
      }
    }
  };
 </script>
 
 <style scoped>
 .error {
   color: red;
 }
 </style>