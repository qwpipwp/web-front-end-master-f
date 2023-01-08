<template>

  <div class="signup-container">
    <el-form class="signup-form" label-position="left">
      <div class="title-container">
        <h3 class="title">欢迎注册账号</h3>
      </div>

      <el-form-item>
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input ref="username" v-model="username" placeholder="账号(字符限制在3-20位哦)" name="username" type="text"
          tabindex="1" maxlength="14" minlength="1" clearable />
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input ref="email" v-model="email" placeholder="邮箱（一个邮箱只能注册一个账号哦）" name="email" type="text" tabindex="2" />
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input ref="num" v-model="num" placeholder="你的学工号" name="num" type="text" tabindex="2" />
      </el-form-item>


      <el-tooltip>
        <el-form-item>
          <span class="svg-container">
            <i class="el-icon-key"></i>
          </span>
          <el-input v-model="password" type="password" placeholder="请输入6-16位密码(要由数字，字母和符号组成)" name="password"
            tabindex="3" maxlength="16" minlength="6" clearable @input="passwordcomplex(password)" />
          <span class="show-pwd">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
      </el-tooltip>

      <div class="passwordstrength">
        <h class="tip-text">密码复杂度</h>
        <div class="level"
          :style="{ 'background-color': (score >= 10 && score < 25) ? '#FC5F76' : ((score >= 25 && score < 35) ? '#FF9900' : (score >= 35 ? '#33CC00' : '#BBBBBB')) }">
        </div>
        <div class="level"
          :style="{ 'background-color': ((score >= 25 && score < 35) ? '#FF9900' : (score >= 35 ? '#33CC00' : '#BBBBBB')) }">
        </div>
        <div class="level" :style="{ 'background-color': score >= 35 ? '#33CC00' : '#BBBBBB' }"></div>
      </div>


      <el-tooltip>
        <el-form-item>
          <span class="svg-container">
            <i class="el-icon-key"></i>
          </span>
          <el-input v-model="password2" type="password" placeholder="确认密码" name="password" tabindex="3" maxlength="16"
            minlength="6" />
          <span class="show-pwd">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
      </el-tooltip>


      <el-select v-model="role" class="role-select" placeholder="选择您的身份" size="large">
        <el-option v-for="item in options" :key="item.id" :value="item.select" />
      </el-select>

      <el-button type="primary" style="width: 100%; margin-bottom: 10px" @click="signup">注册</el-button>

    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      email: "",
      role: "",
      options: [{ select: "学生" }, { select: "老师" }],
      score: "",
      num: '',
    };

  },

  methods: {
    signup() {
      if (this.username) {
        if (this.email) {
          //判断邮箱格式
          const data = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
          if (!data.test(this.email)) {
            this.$message({
              message: "邮箱格式错误",
              type: "warnning",
            });
            return
          }
          if (this.num) {
            if (this.password) {
              if (this.role) {
                if (this.checkPwd(this.password)) {
                  if (this.score >= 25) {
                    if (this.password === this.password2) {

                      axios.post('http://localhost:9090/api/auth/signup',
                        {

                          username: this.username,
                          password: this.password,
                          role: [this.role],
                          email: this.email,
                          num: this.num
                          


                        }).then((res) => {
                          this.$message({
                            message: res.data,
                            type: "sucess",
                          });
                          if (res.data == "成功注册")
                            this.$router.push('/')
                        })
                      // .catch((res) => {
                      //   console.log(res.message)
                      //   this.$message({
                      //     message: res.message,
                      //     type: "warnning",
                      //   });
                      // })
                    }
                    else {
                      this.$message({
                        message: "两次密码不一致！",
                        type: "warnning",
                      });
                    }
                  }
                  else {
                    this.$message({
                      message: "密码太过简单啦",
                      type: "warnning",
                    });
                  }
                }
              }
              else {
                this.$message({
                  message: "你还没有选择身份",
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
            message: "你还没有输入学工号",
            type: "warnning",
          });
          }
        }
        else {
          this.$message({
            message: "你还没有输入邮箱",
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
    //判断密码位数和是否包含空白字符
    checkPwd(str) {
      //限制密码的位数在6-20位之间
      if (str.length < 6 || str.length > 20) {
        this.$message({
          message: "位数不合规范",
          type: "warnning",
        });
        return false;
      }
      //不能有空格、换行、tab缩进等所有的空白
      var pattern4 = /\s+/g;
      if (pattern4.exec(str)) {
        this.$message({
          message: "密码不能有空白字符哦",
          type: "warnning",
        });
        return false;
      }
      return true;
    },
    //判断密码复杂程度，给密码评分
    passwordcomplex() {
      let passwordscore = 0
      let pwdArr = this.password.split('');
      console.log(pwdArr);
      // pwdLen长度
      if (pwdArr.length > 4 && pwdArr.length <= 7) {  //长度在4-7之间，加五分
        passwordscore += 5
      } else if (pwdArr.length > 7) {  //长度在7以上，加10分
        passwordscore += 10
      }
      // letter字母
      if (pwdArr.some(item => { return /^[a-z]$/.test(item) })) {  //是否存在小写字母
        if (pwdArr.some(item => { return /^[A-Z]$/.test(item) })) {  //是否存在大写字母
          passwordscore += 10   //大小写都有，加10，否则加5
        } else {
          passwordscore += 5
        }
      } else if (pwdArr.some(item => { return /^[A-Z]$/.test(item) })) {
        passwordscore += 5
      }
      //num数字
      if (pwdArr.some(item => { return /^[0-9]$/.test(item) })) { //判断是否存在数字
        let count = 0
        pwdArr.forEach(item => {   //判断数字出现的次数
          if (/^[0-9]$/.test(item)) {
            count++
          }
        })
        if (count >= 3) {  //出现大于等于3次，加10，否则加5
          passwordscore += 10;
        } else {
          passwordscore += 5;
        }
      }
      //special特殊字符
      if (pwdArr.some(item => { return /^[\^%&'*.,;=+\-?@#!$\x22]$/.test(item) })) { //判断是否存在特殊字符
        let count = 0
        pwdArr.forEach(item => {  //特殊字符出现次数
          if (/^[\^%&'*.,;=+\-?@#!$\x22]$/.test(item)) {
            count++
          }
        })
        // console.log('count', count);
        if (count >= 2) {
          passwordscore += 15;  //出现两次以上加15，否则加5
        } else {
          passwordscore += 5;
        }
      }
      //是否连续
      let isContinued = false;
      let countinuedCount = 0;
      for (let i = 0; i < pwdArr.length; i++) {
        if (pwdArr[i + 1]) {
          if ((pwdArr[i].charCodeAt(0) + 1 == pwdArr[i + 1].charCodeAt(0)) || (pwdArr[i].charCodeAt(0) - 1 == pwdArr[i + 1].charCodeAt(0))) {  //如果相邻两个字符连续
            isContinued = true;  //开始记录连续
            countinuedCount++    //记录连续次数
          } else {
            if (isContinued) {
              isContinued = false;
              passwordscore -= countinuedCount   //结束当前连续时，分数扣掉连续次数
              countinuedCount = 0
            }
          }
        }
      }
      console.log(isContinued, countinuedCount);
      if (countinuedCount == pwdArr.length - 1) {
        passwordscore = 0   //如果整个密码连续，分数为0
      } else {
        passwordscore -= countinuedCount
      }
      for (let i = 0; i < pwdArr.length; i++) {  //如果整个密码由单一字符构成，分数为0
        if (i == pwdArr.length - 1) {
          passwordscore = 0
        } else if (pwdArr[i] != pwdArr[i + 1]) {
          break
        }
      }
      this.score = passwordscore;
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
  .signup-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.signup-container {
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
      color: grey;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 90%) inset !important;
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
}

.role-select {
  font-weight: 400;
  background-color: #283443;
}
</style>



<style lang="scss" scoped>
$bg: #2d474b;
$dark_gray: #889aa4;
$light_gray: #eee;

.signup-container {
  min-height: 100% !important;
  width: 100%;
  background: url(../assets/img/喂食.webp);
  overflow: auto;

  .signup-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 25px 35px 0px;
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

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  .passwordstrength {
    display: flex;
    flex-wrap: wrap;
  }

  .level {
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 3px;
    height: 5px;
    width: 100px;
  }

  .tip-text {
    color: $light_gray;
    margin-top: -1px;
    font-size: 10px;
    margin-right: 140px;
  }
}
</style>
