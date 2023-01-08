<template>
  <div class="signup-container">

    <div class="resetPassword" v-if="!identify">
      <div class="container">
        <div class="title-container">
          <h3 class="title">找回密码</h3>
        </div>
        <el-form-item>
          <el-input ref="username" v-model="mailAddress" placeholder="输入您的邮箱" name="username" type="text" tabindex="1"
            autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-input ref="vericode" v-model="vericode" placeholder="请输入验证码" name="vericode" type="text" tabindex="2" />
        </el-form-item>
        <el-button @click="findback">找回密码</el-button>
        <el-button @click="sendemail">{{ content }}</el-button>
      </div>
    </div>

    <div class="resetPassword" v-if="identify">
      <div class="container">
        <el-tooltip>
          <el-form-item>
            <span class="svg-container">
              <i class="el-icon-key"></i>
            </span>
            <el-input v-model="password" type="password" placeholder="新密码" name="password" tabindex="2" maxlength="16"
              minlength="6" clearable @input="passwordcomplex(password)" />
            <span class="show-pwd">
              <svg-icon icon-class="password" />
            </span>
          </el-form-item>
        </el-tooltip>


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

        <el-button @click="changepassword">修改密码</el-button>

      </div>
    </div>

  </div>
</template>

<script>
// import axios from "axios";
import axios from "axios";
import $ from "jquery";


export default {
  name: "Findback",
  data() {
    return {
      mailAddress: "",
      vericode: "",
      tvericode: "",
      totalTime: 20,
      canClick: true,
      content: '获取验证码',
      identify: false,
      password: "",
      password2: "",
      score: "",
    };

  },

  methods: {
    sendemail() {
      //防空
      if (!this.mailAddress) {
        this.$message({
          message: "你还没有输入邮箱！",
          type: "warnning",
        });
        return;
      }
      //防格式不正确
      // const data = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.mailAddress)) {
        this.$message({
          message: "邮箱格式错误",
          type: "warnning",
        });
        return
      }
      //防止恶意请求，给发送验证码增加时间限制
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 10
          this.canClick = true  //这里重新开启
        }
      }, 1000)


      var toEmailAddress = this.mailAddress;
      $.ajax({
        type: "post",
        url: "http://localhost:9090/home/sendEmailSystem/",
        data: {
          toEmailAddress: toEmailAddress
        },
        dataType: "json"
      });
    },
    findback() {
      //后端验证码送给前端，不够安全，更换为在后端比对
      //获取真验证码与输入验证码作比对
      // axios.post('http://localhost:9090/home/getVCode')
      //   .then((res) => {
      //     this.tvericode = res.data;
      //     if (this.tvericode == this.vericode) {
      //       this.identify = true;      // 动态渲染页面
      //     }
      //   })
      axios.post('http://localhost:9090/home/verify',
      {
        codeofuser: this.vericode
      })
        .then((res) => {
          if(res.data =="验证成功"){
            this.identify = true;
          }

          console.log(res.data);
        })
    },
    changepassword() {
      if (this.score < 25) {
        this.$message({
          message: "密码太简单啦",
          type: "warnning",
        });
        return;
      }
      axios.post('http://localhost:9090/api/auth/findBackPassword',
        {
          username: this.username,
          password: this.password,
          email: this.mailAddress
        }).then((res) => {
          console.log(res.data);
        })
      this.$router.push("/");
    },
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
  background: url(../../assets/img/喂食.webp);
  overflow: hidden;

  .signup-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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

  .resetPassword {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 10% auto;
    width: 40%;
    padding: 25px 30px;
    background: rgb(38, 37, 37);
    border: 1px solid rgb(37, 37, 37);
    box-shadow: 0 0 25px rgb(41, 41, 41);
    opacity: 0.7;
  }

  .common_div {
    margin-top: 5%;
  }

  .user-container {
    width: 80%;
    background: #fff;

  }

  .action_button {
    width: 20%;
    margin-top: 3%;
    text-align: center;
  }

  .disabled {
    background-color: #ddd;
    border-color: #ddd;
    color: #57a3f3;
    cursor: not-allowed; // 鼠标变化
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
    width: 50px;
  }

  .tip-text {
    color: $light_gray;
    margin-top: -1px;
    font-size: 10px;
    margin-right: 140px;
  }
}
</style>
