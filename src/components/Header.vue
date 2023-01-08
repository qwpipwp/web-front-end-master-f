<template>
    <div class="headerBox">
        <header>
            <div>
                <h1 style="margin-top: 0px; margin-left: 20px; color: #fff;font-size:30px; ">信息管理系统欢迎您</h1>
            </div>
            <div class="opt-wrapper">
                <el-dropdown :hide-on-click="false">
                    <div class="demo-basic--circle">
                        <div class="block">
                            <el-avatar :size="40" :src="avatar" :class="['avatar-info']">
                            </el-avatar>
                        </div>
                    </div>
                    <template v-slot:dropdown>
                        <el-dropdown-menu style="margin-top:0px;margin-right: 60px;">
                            <el-dropdown-item @click="changePassword"><i
                                    class="el-icon-info"></i>修改密码</el-dropdown-item>
                            <el-dropdown-item @click="logout"><i
                                    class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </header>
    </div>
</template>

<script>
import router from '../router';
export default {
    name: "Header",
    data() {
        return {
            avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    },
    methods: {
        logout() {
            this.$store.commit("logout");
            router.push("/login");
        },
        changePassword() {
            router.push("/changePassword");
        }
    },
};
</script>

<style scoped>

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/*设定头像图片样式*/
.avatar-info {
    margin-top: 0px;
    margin-right: 10px;
    cursor: pointer;
}
</style>
