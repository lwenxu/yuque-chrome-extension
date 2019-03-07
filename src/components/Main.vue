<template>
  <div class="main_container">
    <Collapse @on-change="handleSeeDetail">
      <Panel v-for="(repo,index) in repos" :key="index" :name="repo.id+''">
        <a :href="`https://www.yuque.com/${repo.namespace}`">{{repo.name}}</a>
        <div slot="content">
          <CellGroup>
            <Cell v-for="(item,key) in repo.detail" :key="key" :title="item.title" target="_blank">
              <a :href="`https://www.yuque.com/${repo.namespace}/${item.slug}`">{{item.title}}</a>
            </Cell>
          </CellGroup>
        </div>
      </Panel>
      <Button type="error" ghost long class="btn" @click="handleResetToken">重新设置token</Button>
    </Collapse>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Main',
    data() {
      return {
        tab: 1,
        repos: []
      }
    },
    methods: {
      handleResetToken() {
        localStorage.removeItem('token');
        this.$router.push('/main');
      }
    },
    mounted() {
      axios({
        url: 'https://www.yuque.com/api/v2/user',
        method: 'GET',
        headers: {
          "x-auth-token": localStorage.getItem('token'),
        }
      }).then((user) => {
        axios({
          url: `https://www.yuque.com/api/v2/users/${user.data.data.id}/repos`,
          method: 'GET',
          headers: {
            "x-auth-token": localStorage.getItem('token'),
          }
        }).then((res) => {
          if (res.data) {
            res.data.data.forEach((item, index) => {
              axios({
                url: `https://www.yuque.com/api/v2/repos/${item.id}/docs`,
                method: 'GET',
                headers: {
                  "x-auth-token": "jgBRsu4z64g0esosUIKwgAfhaCyktf8FpRLYqvqB",
                }
              }).then((res) => {
                if (res.data) {
                  this.repos.splice(index, 1, {...item, detail: res.data.data});
                }
              }).catch(e => console.error(e));
            });
            this.repos = res.data.data;
          }
        }).catch(e => console.error(e));
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn{
    margin: 30px auto;
  }
</style>
