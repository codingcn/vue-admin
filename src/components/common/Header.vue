<template>
  <div class="header">
    <div class="logo">Dash board</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" v-bind:src=admin.avatar>
                 {{admin.username}}
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      let self = this;
      self.$nextTick(() => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        self.admin = admin
      })
    },
    data() {
      return {
        avatar: '',
        admin: {
          username: '',
          avatar: ''
        }
      }
    },
    methods: {
      handleCommand(command) {
        if (command == 'loginout') {
          this.$auth.destoryToken()
          localStorage.removeItem('admin')
          this.$notify({
            title: '成功',
            message: '注销成功',
            type: 'success'
          });
          this.$router.push('/login');
        }
      }
    }
  }
</script>
<style scoped>
  .header {
    font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    font-size: 1.2rem;
    line-height: 3rem;
    color: #fff;
  }

  .header .logo {
    float: left;
    width: 8.5rem;
    text-align: center;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    position: absolute;
    top: 0.5rem;
    left: 0;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 50%;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
