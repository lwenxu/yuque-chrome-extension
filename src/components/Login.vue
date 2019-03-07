<template>
  <div class="main_container">
    <Input v-model="value" placeholder="输入您的token" class="input"/>
    <Button type="success" long ghost @click="handleLogin" class="btn">确定</Button>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        value: ''
      }
    },
    mounted() {
      const token = localStorage.getItem('token');
      if (token && token !== '') {
        this.$router.push('/main');
      }
    },
    methods:{
      handleLogin() {
        localStorage.setItem('token', this.value);
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .main_container {
    height: 100%;
    width: 100%;
  }

  .input {
    margin: 30px auto;
  }

  .btn{
    margin: 0 auto 30px auto;
  }
</style>
