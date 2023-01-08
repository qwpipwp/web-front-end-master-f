<template>
  <v-md-editor v-model="text" height="800px" @save="savemd"></v-md-editor>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'username'
    ])
  },
  data() {
    return {
      text: '',
    };
  },
  methods: {
    savemd() {
      console.log(this.text)
      if (this.text) {
        axios.post('http://localhost:9090/blog/create',
          {
            username: this.username,
            text: this.text
          }).then(() => {
            this.$message({
              message: "发布成功",
              type: "sucess"
            });
            this.$router.push('/Homepage')
          })

      }
      else {
        this.$message({
          message: "博客内容不能为空",
          type: "warnning",
        });
      }

    }
  }
};
</script>