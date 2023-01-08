<template>
    <h3>{{ path }}</h3>
    <v-md-editor v-model="text" height="800px" mode="preview"></v-md-editor>
</template>


<script>
import { mapState } from 'vuex'
import axios from 'axios';
export default {
    data() {
        return {
        text: '',
        path: this.$route.query.thePath,
        identity:''
        };
    },
    computed: {
        ...mapState([
            'username', 'jwtToken', 'role'
        ])
    },
    created() {
        console.log(this.text);
        if(this.role == '老师'){
            this.identity = 'teacher'
        }
        else{
            this.identity = 'student'
        }
        axios.get(`/md/${this.identity}/blog/${this.path}`).then(res => {
            console.log(res.data);
            this.text = res.data;
        })
    }
    };
</script>