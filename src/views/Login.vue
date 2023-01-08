

<template>
  <div class="login-container">
    <el-form class="login-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">Welcome</h3>
      </div>

      <el-form-item>
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input ref="username" v-model="username" placeholder="输入您的账号" name="username" type="text" tabindex="1"
          autocomplete="off" />
      </el-form-item>

      <el-tooltip>
        <el-form-item>
          <span class="svg-container">
            <i class="el-icon-key"></i>
          </span>
          <el-input v-model="password" type="password" placeholder="输入您的密码" name="password" tabindex="2"
            autocomplete="on" />
          <span class="show-pwd">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item>
        <el-input ref="vericode" v-model="vericode" placeholder="请输入验证码" name="vericode" type="text" tabindex="3" />
      </el-form-item>
      <div>
        <el-select v-model="role" class="role-select" placeholder="选择您的身份" size="large">
          <el-option v-for="item in options" :key="item.id" :value="item.select" />
        </el-select>
      </div>
      <div>
        <el-button type="primary" class="set-button" style="width: 50%; margin-bottom: 40px "
          @click="handleSubmit" tabindex="4">登录</el-button>
        <img class="verifyCodeImg" :src="imgUrl" @click="resetImg">
      </div>
      <!-- <el-button type="primary" class="set-button" style="width: 25%; margin-bottom: 10px" @click="signUp">注册账号</el-button> -->
      <a href="http://localhost:8080/#/SignUp" class="SignUp" style="color: aliceblue;">注册账号</a>
      <a href="http://localhost:8080/#/Findback" class="findback" style="float:right;color: aliceblue;">找回密码</a>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "Login",
  data() {
    return {
      imgUrl: "http://localhost:9090/home/verifyCode?time=" + new Date(),
      username: "",
      password: "",
      vericode: "",
      tvericode: "",
      role: "",
      trole: "",
      options: [{ select: "管理员" }, { select: "学生" }, { select: "老师" }]
    };
  },
  beforeMount() {
    this.$store.commit("logout");
  },
  methods: {
    //点击重新加载验证码
    resetImg() {
      this.imgUrl = "http://localhost:9090/home/verifyCode?time=" + new Date();
    },
    //登录操作的实现
    handleSubmit() {
      const { username, password, vericode, role } = this;

      if (username) {
        if (password) {
          if (vericode) {
            //获取验证码值与输入值做比对
            axios.get("http://localhost:9090/home/getTCode").then((response) => {
              this.tvericode = response.data
              console.log(this.tvericode)
              console.log(vericode)
              if (this.tvericode === vericode.toLowerCase()) {
                if (role) {
                  //认证角色身份
                  axios.post('http://localhost:9090/api/auth/identifyRole',
                    {
                      username: this.username
                    }).then((res) => {
                      this.trole = res.data
                      //当身份一致时才进行登录操作
                      if (this.trole === this.role) {
                        this.$store
                          .dispatch("login", {
                            username: username,
                            password: password,
                            role: role,
                            // vericode: vericode,
                          })
                          .catch(() => {
                            this.$message({
                              message: " 用户名或密码错误",
                              type: "warnning",
                            });
                          });
                      }
                      else {
                        this.$message({
                          message: "与账号身份不一致！",
                          type: "warnning",
                        });
                      }
                    })
                }
                else {
                  this.$message({
                    message: "请选择角色",
                    type: "warnning",
                  });
                }
              }
              else {
                this.$message({
                  message: "验证码错误捏",
                  type: "warnning",
                });
              }
            })
          }
          else {
            this.$message({
              message: "请输入验证码",
              type: "warnning",
            });
          }
        }
        else {
          this.$message({
            message: "你还没有输入密码",
            type: "warnning",
          });
        }

      }
      else {
        this.$message({
          message: "你还没有输入账号",
          type: "warnning",
        });
      }
    },
    signUp() {
      this.$router.push('/SignUp')
    },
    findBack() {
      this.$router.push('/Findback')
    }
  },
};
</script>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $cursor;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 50%) inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .set-button {
    color: rgb(255, 255, 255);
    background-color: #1688e5;
    border: 0px;
  }



}
</style>

<style lang="scss" scoped>
$bg: #2d474b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100% !important;
  width: 100%;
  background: url(../assets/img/喂食.webp);
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 25px 35px 50px;
    margin: 0 auto;
    margin-top: 170px;
    overflow: hidden;
    background: rgb(38, 37, 37);
    border-radius: 15px;
    background-clip: padding-box;
    border: 1px solid rgb(37, 37, 37);
    box-shadow: 0 0 25px rgb(41, 41, 41);
    opacity: 0.7;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }



  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .verifyCodeImg {
    cursor: pointer;
    // margin-left: 160px;
    height: 45px;
    width: auto;
    padding-left: 110px;
    padding-top: 10px;
    // margin-top: 5px;

  }

  .role-select {
    margin-top: -5px;
    display: block;
  }


  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
