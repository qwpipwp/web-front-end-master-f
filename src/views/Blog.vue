<template>
    <h3>我的博客</h3>
    <div>
        <!-- <el-link v-for="item in bloglist" :key="item.index" v-on:click="goToBlogview()">{{ item }}</el-link> -->
        <el-button v-for="item in bloglist" :key="item.index" v-on:click="goToBlogview(item)">{{ item }}</el-button>
    </div>
    <el-button v-on:click="goToBlogEditor()">写一篇新博客！</el-button>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Blog',
    props: {
    },
    computed: {
        ...mapState([
            'username', 'role'
        ])
    },
    data() {
        return {
            bloglist: [],
        }
    },
    methods: {
        goToBlogview(item) {

            item = item + '.md'
            this.$router.push({
                path: "Article",
                query: {
                    thePath: item
                },
            })
        },
        goToBlogEditor() {
            this.$router.push("/editor");
        }
    },
    created() {

            const files = require.context("../../public/md", true, /\.md$/).keys();
            console.log(files)
            var index = 0;
            for (var item in files) {
                var a = files[item].indexOf("/")
                var substr = files[item].substring(a + 1)
                // console.log(substr)
                var a2 = substr.indexOf("/")
                let name = substr.substring(0, a2)
                // console.log(name)
                // console.log(this.usernamet)
                var a3 = substr.indexOf("/")
                var str = substr.substring(a3 + 1)
                // console.log(str)
                if (name == this.username) {
                    var b = str.indexOf("/")
                    this.bloglist[index] = str.substring(b + 1)
                    index = index + 1;
                }
            }
            console.log(this.bloglist)
    },
    mounted() {
        for (var i = 0; i < this.bloglist.length; i++) {
            this.bloglist[i] = this.bloglist[i].substring(0, this.bloglist[i].length - 3)
        }
    }

}
</script>