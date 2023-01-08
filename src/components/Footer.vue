<template>
    <div>
      <div class="footerBox">
        &copy; 2022 611<br />
        山东大学 | 软件工程 <br />
        网站创立 {{ day }}天 {{ h }}小时 {{ min }}分钟 {{ sec }}秒<br />
      </div>
    </div>
  </template>
  
  
  
  
  <script>
  export default {
    name: "Footer",
    mounted() {
      /* eslint-disable */
      this.getNowFormatDate();
      let myTimeDisplay = setInterval(() => { 
        this.getNowFormatDate(); //每秒更新一次时间
      }, 1000);
    },
    data() {
      return {
        day: "",
        h: "",
        min: "",
        sec: "",
      };
    },
    methods: {
      getNowFormatDate() {
        var t1 = new Date("2022/10/15 18:00:00");
        var data = new Date(); //获取当前时间
        var times = t1.getTime() - data.getTime(); //时间差的毫秒数
        var days = parseInt(times / (24 * 1000 * 3600)); //计算相差的天数
        var leave = times % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var h = parseInt(leave / (3600 * 1000)); //计算小时数
        //计算分钟数
        var h_leave = leave % (3600 * 1000);
        var min = parseInt(h_leave / (60 * 1000));
        //计算秒数
        var min_leave = h_leave % (60 * 1000);
        var sec = parseInt(min_leave / 1000);
        this.day = days;
        this.h = h;
        this.min = min;
        this.sec = sec;
      },
    },
  };
  </script>
  
  <style>
  .footerBox {
    position: relative;
    width: 100%;
    /* height: 100px; */
    padding-top: 7px;
    /* background: rgb(23,38,50); */
    background-color: rgb(0, 17, 35);
    bottom: 0;
    color: #fff;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-clip: padding-box;
    box-shadow: 0 0 25px rgb(27, 27, 27);
    opacity: 0.9;
  }
  </style>